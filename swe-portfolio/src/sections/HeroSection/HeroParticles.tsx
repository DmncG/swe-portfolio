import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const COUNT = 80

const initY = new Float32Array(COUNT)
const phases = new Float32Array(COUNT)
const positions = (() => {
  const arr = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    arr[i * 3]     = (Math.random() - 0.5) * 24
    arr[i * 3 + 1] = (Math.random() - 0.5) * 14
    arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    initY[i] = arr[i * 3 + 1]
    phases[i] = Math.random() * Math.PI * 2
  }
  return arr
})()

function ParticleField() {
  "use no memo"
  const ref = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position.array as Float32Array

    ref.current.rotation.y += (pointer.x * 0.25 - ref.current.rotation.y) * 0.04
    ref.current.rotation.x += (-pointer.y * 0.15 - ref.current.rotation.x) * 0.04

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] = initY[i] + Math.sin(t * 0.4 + phases[i]) * 0.3
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.32} color="#c96d3a" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

export function HeroParticles() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 2]}
    >
      <ParticleField />
    </Canvas>
  )
}
