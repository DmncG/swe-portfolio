import { useRef, useCallback, useMemo } from "react";

export const useScrollTo = () => {
    const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const scrollTo = useCallback((i: number) => {
    sectionRefs[i].current?.scrollIntoView({ behavior: "smooth" });
  }, [sectionRefs]);

  return {
    sectionRefs,
    scrollTo
  }
}