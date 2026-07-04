import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function InteractiveShaderCurve() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Base geometry for the curve
  const points = [
    new THREE.Vector3(-5, 0, 0),
    new THREE.Vector3(-2.5, 2, 1),
    new THREE.Vector3(0, -1, -2),
    new THREE.Vector3(2.5, 3, 2),
    new THREE.Vector3(5, 0, 0),
  ]
  const curve = new THREE.CatmullRomCurve3(points, true)

  useFrame((state) => {
    if (materialRef.current) {
      // 1. Update the continuous time clock
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()

      // 2. Smoothly interpolate (lerp) toward the current mouse position
      // state.pointer ranges from -1 to +1 across the screen width/height
      const targetX = state.pointer.x * 3.5 
      const targetY = state.pointer.y * 3.5

      materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.x,
        targetX,
        0.1 // Smooth factor (lower = heavier/lazier tracking)
      )
      materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.y,
        targetY,
        0.1
      )
    }
  })

  return (
    <mesh>
      <tubeGeometry args={[curve, 250, 0.2, 32, true]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uColor: { value: new THREE.Color('#00ffaa') } // Electric mint green
        }}
        vertexShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vec3 pos = position;
            
            // Base background wave motion
            pos.y += sin(pos.x * 1.2 + uTime * 2.0) * 0.4;
            pos.z += cos(pos.y * 1.5 + uTime * 1.8) * 0.3;
            
            // Mouse Interaction: Calculate the distance from the vertex to the mouse point
            // We use pos.xy since the screen coordinates naturally translate directly to X and Y
            float dist = distance(pos.xy, uMouse);
            
            // Create an interactive pull effect that is strongest nearby the cursor
            float influence = smoothstep(4.0, 0.0, dist); // Affects vertices within 4 units
            
            // Pull the curve toward the mouse position based on influence
            pos.x += (uMouse.x - pos.x) * influence * 0.3;
            pos.y += (uMouse.y - pos.y) * influence * 0.3;
            
            // Add a high-frequency ripple effect right at the interaction point
            pos.z += sin(uTime * 10.0) * influence * 0.15;
            
            vNormal = normal;
            vPosition = pos;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying vec3 vNormal;
          
          void main() {
            vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
            float diff = max(dot(vNormal, lightDir), 0.0);
            
            vec3 viewDir = vec3(0.0, 0.0, 1.0);
            float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);
            rim = pow(rim, 3.0);
            
            // Mix background lighting with powerful edge bloom
            vec3 finalColor = uColor * (diff * 0.5 + 0.5) + (uColor * rim * 2.5);
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  )
}

export function TestCurve() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#020202' }}>
      <Canvas gl={{ toneMapping: THREE.ACESFilmicToneMapping }} camera={{ position: [0, 0, 300], fov: 50 }}>
        <color attach="background" args={['#020202']} />
        
        <Center>
          <InteractiveShaderCurve />
        </Center>
        
        <EffectComposer>
          <Bloom 
            intensity={2.0} 
            luminanceThreshold={0.15} 
            luminanceSmoothing={0.8} 
            mipmapBlur 
          />
        </EffectComposer>
        
        {/* Disable orbit pan/rotate if it conflicts too heavily with the cursor trail */}
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  )
}