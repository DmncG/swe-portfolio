import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier.js';
import { randomRange } from '../../utils/r3fUtils';

// Custom Shader Material to handle the exploding text effect
const TessellationShaderMaterial = {
  uniforms: {
    amplitude: { value: 0.0 },
  },
  vertexShader: `
    uniform float amplitude;
    attribute vec3 customColor;
    attribute vec3 displacement;
    varying vec3 vNormal;
    varying vec3 vColor;

    void main() {
      vNormal = normal;
      vColor = customColor;

      // Displace faces outward based on the modifier's displacement attribute
      vec3 newPosition = position + normal * amplitude * displacement;
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vColor;

    void main() {
      // Basic lighting math from the original example
      const vec3 light = vec3(0.5, 0.2, 1.0);
      float dProd = max(0.0, dot(vNormal, normalize(light)));
      
      gl_FragColor = vec4(dProd * vColor, 1.0);
    }
  `,
};

function ExplodingText() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const font = useLoader(FontLoader, 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');

  // 1. Generate and process the tessellated geometry
  const tessellatedGeometry = useMemo(() => {
    // Generate base text geometry using standard Three.js loaders
    if (!font) return null;

    let geometry = new TextGeometry('COMING SOON', {
      font: font,
      size: 40,
      depth: 5,
      curveSegments: 3,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1,
      bevelSegments: 3,
    });

    geometry.center();

    // Apply Tessellate Modifier to break faces into smaller triangles
    const tessellateModifier = new TessellateModifier(8, 6);
    geometry = tessellateModifier.modify(geometry);

    // Build custom attributes needed by our vertex shader
    const numFaces = geometry.attributes.position.count / 3;
    const colors = new Float32Array(numFaces * 3 * 3);
    const displacements = new Float32Array(numFaces * 3 * 3);

    const color = new THREE.Color();

    for (let i = 0; i < numFaces; i++) {
      // Randomize color per face
      color.setHSL(0.5 + 0.5 * randomRange(0, 1), 0.7, 0.5);

      // Randomize outward push direction vector per face
      const dx = randomRange(-0.5, 0.5);
      const dy = randomRange(-0.5, 0.5);
      const dz = randomRange(-0.5, 0.5);

      for (let j = 0; j < 3; j++) {
        const index = (i * 3 + j) * 3;

        colors[index] = color.r;
        colors[index + 1] = color.g;
        colors[index + 2] = color.b;

        displacements[index] = dx;
        displacements[index + 1] = dy;
        displacements[index + 2] = dz;
      }
    }

    geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('displacement', new THREE.BufferAttribute(displacements, 3));

    return geometry;
  }, [font]);

  // 2. Drive the continuous animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Cycle the expansion amplitude using a sine wave
    if (materialRef.current) {
      materialRef.current.uniforms.amplitude.value = Math.sin(time * 2) * 0.5 + 0.5;
    }

    // Slowly rotate the text object
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
    }
  });

  if (!tessellatedGeometry) return null;

  return (
    <mesh ref={meshRef} geometry={tessellatedGeometry}>
      <shaderMaterial
        ref={materialRef}
        uniforms={TessellationShaderMaterial.uniforms}
        vertexShader={TessellationShaderMaterial.vertexShader}
        fragmentShader={TessellationShaderMaterial.fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 3. Main Scene Wrapper
export function ComingSoon() {
  return (
    <div className="w-screen h-screen bg-background">
      <Canvas camera={{ position: [0, 0, 300], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <Center>
          <ExplodingText />
        </Center>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}