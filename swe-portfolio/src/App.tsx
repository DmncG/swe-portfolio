import { 
  useState, 
  useRef, 
  useEffect 
} from 'react'

import { useScroll } from "motion/react";
import type { MotionValue } from "motion/react";

import { Hero } from "./sections/HeroSection";
import { About } from "./sections/AboutSection";
import { Projects } from "./sections/ProjectsSection";
import { Skills } from "./sections/SkillsSection";

import { NavDots } from "./components/NavDots";
import { TopNav } from "./components/TopNav";
import { CVButton } from "./components/CVButton";
import { ThemeContext } from './components/context/ThemeContext.tsx';

import { useTheme } from "./utils/customHooks/useTheme.tsx";
import { usePageBottom } from "./utils/customHooks/usePageBottom.tsx";

import { TestParticleCurve } from './r3f/TestParticleCurve'

import './App.css'

export type ScrollOptionsProps = {
  scrollX: MotionValue<number>
  scrollY: MotionValue<number>
  scrollXProgress: MotionValue<number>
  scrollYProgress: MotionValue<number>
}

function App() {
  const [active, setActive] = useState(0);
  const isBottom = usePageBottom();
  const scrollOptions: ScrollOptionsProps = useScroll();
  const themeConfig = useTheme();

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const observers = sectionRefs.map((ref, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.4 }
      );
      if (ref.current) obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (i: number) => {
    sectionRefs[i].current?.scrollIntoView({ behavior: "smooth" });
  };

  const SECTIONS: string[] = ["Home", "Projects & Experience", "Skills", "About"]
  return (
    <>
      <ThemeContext value={themeConfig.theme}>
      <TestParticleCurve {...scrollOptions} {...themeConfig} />
      <div className="bg-transparent min-h-screen relative">
      <TopNav sections={SECTIONS} active={active} onNav={scrollTo} themeConfig={themeConfig} />
      <NavDots active={active} sections={SECTIONS} onNav={scrollTo} />
      <CVButton />

      <div ref={sectionRefs[0]}><Hero /></div>
      <div ref={sectionRefs[1]}><Projects isBottom={isBottom}/></div>
      <div ref={sectionRefs[2]}><Skills isBottom={isBottom}/></div>
      <div ref={sectionRefs[3]}><About /></div>

      {/* Footer */}
      <footer className="py-8 text-center border-t" style={{ borderColor: "rgba(120,80,40,0.1)" }}>
        <p className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
          © 2026 Dominic Garcia — Designed & Built with care
        </p>
      </footer>
    </div>
    </ThemeContext>
    </>
  )
}

export default App
