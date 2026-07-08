import { useRef, useMemo, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Leva, useControls, folder } from "leva";
import * as THREE from 'three'
import type { ScrollOptionsProps } from '../../App';
import { CameraRig } from '../components/CameraRig';

import { randomRange } from '../../utils/r3fUtils';
import { usePointerRef } from '../r3fUtils';

import type { ThemeToggleProps } from '../../components/ThemeToggle';

type repulsionCurveProps = {
    particleCount: number,
    loopCount: number,
    pRatio: number,
    qRatio: number,
    radiusValue: number,
    pointerRef: RefObject<{x: number, y:number}>,
    isDark: boolean
}

type ParticleCurveProps = ScrollOptionsProps & ThemeToggleProps;

const ComplexFlowingRepulsionCurve = ({ particleCount: pCount, loopCount, pRatio, qRatio, radiusValue, pointerRef, isDark }: repulsionCurveProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // 1. Programmatically generate a complex 3D Torus Knot path layout
  const curve = useMemo(() => {
    const knotPoints = []
    const loops = loopCount // Resolution of the baseline path
    
    // Mathematical variables for knot frequency layout (P & Q ratios define the weave complexity)
    const p = pRatio
    const q = qRatio
    const radius = radiusValue
    
    for (let i = 0; i <= loops; i++) {
      const theta = (i / loops) * Math.PI * 2
      
      // Parametric Torus Knot equations
      const r = radius * (0.5 * (2.0 + Math.sin(q * theta)))
      const x = r * Math.cos(p * theta)
      const y = r * Math.sin(p * theta)
      const z = r * Math.cos(q * theta)
      
      knotPoints.push(new THREE.Vector3(x, y, z))
    }
    
    // Create a closed loop path configuration
    return new THREE.CatmullRomCurve3(knotPoints, true, 'centripetal')
  }, [loopCount, pRatio, qRatio, radiusValue])

  // 2. Sample points across the newly woven path layout
  const particleCount = pCount // Bumped up count to fill out the complex path cleanly
  const [positions, randomOffsets, progressValues] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const offsets = new Float32Array(particleCount * 3)
    const progress = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      const p = i / particleCount
      progress[i] = p
      
      const point = curve.getPointAt(p)
      pos[i * 3] = point.x
      pos[i * 3 + 1] = point.y
      pos[i * 3 + 2] = point.z

      // Create a tighter, neat radial cylinder dispersion around the line track
      const angle = randomRange(0, 1) * Math.PI * 2
      const radiusOffset = randomRange(0, 1) * 0.25
      offsets[i * 3] = Math.cos(angle) * radiusOffset
      offsets[i * 3 + 1] = Math.sin(angle) * radiusOffset
      offsets[i * 3 + 2] = (randomRange(0, 1) - 0.5) * 0.2
    }
    return [pos, offsets, progress]
  }, [curve, particleCount])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()

      // Track relative canvas tracking pointer coordinates
      // const targetX = state.pointer.x * 5.0
      // const targetY = state.pointer.y * 5.0

      const targetX = pointerRef.current.x * 5.0
      const targetY = pointerRef.current.y * 5.0

      materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.x,
        targetX,
        0.1
      )
      materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.y,
        targetY,
        0.1
      )
    }
  })


  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aOffset" args={[randomOffsets, 3]} />
        <bufferAttribute attach="attributes-aProgress" args={[progressValues, 1]} />
      </bufferGeometry>
      
      <shaderMaterial
        ref={materialRef}
        transparent={true}
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          // Dark: neon violet glow. Light: deep indigo reads against the cream backdrop without additive blending washing it out.
          uColor: { value: new THREE.Color(isDark ? '#7b00ff' : '#bababa') },
          uHotColor: { value: new THREE.Color(isDark ? '#ff0099' : '#d15b06') },
          uBrightnessBase: { value: isDark ? 2.0 : 1.0 },
          uBrightnessRepel: { value: isDark ? 5.0 : 0.8 },
          uOutline: { value: isDark ? 0.0 : 1.0 }
        }}
        vertexShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          attribute vec3 aOffset;
          attribute float aProgress;
          varying float vRepel;
          
          void main() {
            vec3 pos = position + aOffset;
            
            // 1. Progress looping circuit travel mechanics
            float speed = 0.08; // Slower speed feels more majestic on intricate curves
            float currentProgress = mod(aProgress + uTime * speed, 1.0);
            
            // Adding complex organic ripple layers along the path tracking progress indices
            pos.x += sin(currentProgress * 40.0 + uTime * 3.0) * 0.08;
            pos.y += cos(currentProgress * 40.0 + uTime * 2.5) * 0.08;
            
            // 2. 3D cursor deflection physics
            // We measure spatial 3D distance by matching coordinate spaces
            vec3 mouse3D = vec3(uMouse.x, uMouse.y, pos.z);
            float dist = distance(pos, mouse3D);
            float radius = 2.5; 
            
            float repelInfluence = smoothstep(radius, 0.0, dist);
            vec3 repelDir = normalize(pos - mouse3D);
            
            // Shove points away radially along all 3 dimensions
            pos += repelDir * repelInfluence * 0.5;
            
            vRepel = repelInfluence;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = (60.0 / -mvPosition.z) * (1.0 + repelInfluence * 0.4);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform vec3 uHotColor;
          uniform float uBrightnessBase;
          uniform float uBrightnessRepel;
          uniform float uOutline;
          varying float vRepel;

          void main() {
            float circ = distance(gl_PointCoord, vec2(0.5));
            if (circ > 0.5) discard;

            float filledAlpha = smoothstep(0.5, 0.0, circ);

            // Ring mask: a thin band near the edge instead of a filled disc
            float ringRadius = 0.36;
            float ringWidth = 0.07;
            float ringAlpha = smoothstep(ringWidth, 0.0, abs(circ - ringRadius));

            float alpha = mix(filledAlpha, ringAlpha, uOutline);

            // Deflected particles shift toward the hot accent color
            vec3 hotColor = mix(uColor, uHotColor, vRepel);

            gl_FragColor = vec4(hotColor * (uBrightnessBase + vRepel * uBrightnessRepel), alpha);
          }
        `}
      />
    </points>
  )
}

export const TestParticleCurve = ({ scrollYProgress, theme }: ParticleCurveProps) => {
  const pointerRef = usePointerRef();
  const isDark = theme === "dark";

  const {
    particle_count,
    loop_count,
    p_ratio,
    q_ratio,
    radius_value,
    intensity_value,
    luminance_threshold,
    luminance_smoothing
  } = useControls({
    Curve: folder({
        loop_count: { label: "count", value: 120},
        p_ratio: { label: "p_ratio", value: 9, min: 0, max: 50 },
        q_ratio: { label: "q_ratio", value: 13.5, min: 0, max: 50 },
        radius_value: { label: "radius", value: 3, min: 0, max: 50 }
    }),
    Particles: folder({
        particle_count: { label: "count", value: 20000, min: 0, max: 100000 }
    }),
    Bloom: folder({
        intensity_value: { label: "intensity", value: 0.3, min: 0, max: 10},
        luminance_threshold:{label: "luminance_threshold", value: 0.02, min: 0.00, max: 1},
        luminance_smoothing: {label: "luminance_smoothing", value: 0.8, min: 0.0, max: 1} 
    })
  })

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none"
    >
      <Canvas gl={{ toneMapping: THREE.ACESFilmicToneMapping }} camera={{ position: [0, 0, 0], fov: 75 }}>
        <CameraRig scrollYProgress={scrollYProgress} />
        <color attach="background" args={isDark ? ["#020104"] : ['#fdf6ec']} />

        <Center>
          <ComplexFlowingRepulsionCurve
            particleCount={particle_count}
            loopCount={loop_count}
            pRatio={p_ratio}
            qRatio={q_ratio}
            radiusValue={radius_value}
            pointerRef={pointerRef}
            isDark={isDark}
          />
        </Center>

        {isDark && (
          <EffectComposer>
            <Bloom
              intensity={intensity_value}
              luminanceThreshold={luminance_threshold}
              luminanceSmoothing={luminance_smoothing}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
      <Leva flat oneLineLabels collapsed={false} hidden={true} />
    </div>
  )
}