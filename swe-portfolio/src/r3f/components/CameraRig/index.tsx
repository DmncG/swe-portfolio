import { useThree } from '@react-three/fiber'
import { useMotionValueEvent } from 'motion/react'
import type { MotionValue } from 'motion/react'
import * as THREE from 'three'

type CameraRigProps = {
  scrollYProgress: MotionValue<number>
}

type Waypoint = {
  progress: number
  position: [number, number, number]
  lookAt: [number, number, number]
}

const WAYPOINTS: Waypoint[] = [
  { progress: 0.0, position: [0, 0, 2], lookAt: [0, 0, 0] },        // Hero - close
  { progress: 0.25, position: [3, 3, 1], lookAt: [0, 0, 0] },      // Projects - orbited right, close
  { progress: 0.60, position: [2, 4, 1], lookAt: [0, 0, 0] },     // About/Skills - orbited left, close
  { progress: 1.0, position: [0, 0, 1], lookAt: [0, 0, 0] }         // End - back to close
]

export function CameraRig({ scrollYProgress }: CameraRigProps) {
  const { camera } = useThree()

  useMotionValueEvent(scrollYProgress, 'change', (value: number) => {
    const progress = value
    let prevWaypoint = WAYPOINTS[0]
    let nextWaypoint = WAYPOINTS[WAYPOINTS.length - 1]

    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      if (progress >= WAYPOINTS[i].progress && progress <= WAYPOINTS[i + 1].progress) {
        prevWaypoint = WAYPOINTS[i]
        nextWaypoint = WAYPOINTS[i + 1]
        break
      }
    }

    const waypointRange = nextWaypoint.progress - prevWaypoint.progress
    const blend = waypointRange === 0 ? 0 : (progress - prevWaypoint.progress) / waypointRange

    const targetX = THREE.MathUtils.lerp(prevWaypoint.position[0], nextWaypoint.position[0], blend)
    const targetY = THREE.MathUtils.lerp(prevWaypoint.position[1], nextWaypoint.position[1], blend)
    const targetZ = THREE.MathUtils.lerp(prevWaypoint.position[2], nextWaypoint.position[2], blend)

    camera.position.set(targetX, targetY, targetZ)
    camera.lookAt(prevWaypoint.lookAt[0], prevWaypoint.lookAt[1], prevWaypoint.lookAt[2])
  })

  return null
}
