import { useRef, useEffect } from "react";

export const usePointerRef = () => {
    const pointerCoordinates = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            pointerCoordinates.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            }
        }

        window.addEventListener("mousemove", handleMouseMove, { passive: true })

        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return pointerCoordinates;
}