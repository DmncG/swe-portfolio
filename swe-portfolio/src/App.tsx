import { useState, useRef, useEffect } from 'react'

import { Hero } from "./pages/HeroSection";
import { About } from "./pages/AboutSection";
import { Projects } from "./pages/ProjectsSection";
import { Skills } from "./pages/SkillsSection";

import { NavDots } from './components/NavDots';
import { TopNav } from './components/TopNav';
import { CVButton } from './components/CVButton';

import { cssClassNames } from './utils/cssUtils';
import './App.css'

function App() {
  const [active, setActive] = useState(0);

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

  const SECTIONS: string[] = ["Home", "Experience", "Projects", "About"]
  return (
    <>
      <TopNav sections={SECTIONS} active={active} onNav={scrollTo} />
      <div className="bg-background min-h-screen relative">
      {/* Subtle paper grain overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />

      <TopNav sections={SECTIONS} active={active} onNav={scrollTo} />
      <NavDots active={active} sections={SECTIONS} onNav={scrollTo} />
      <CVButton />

      <div ref={sectionRefs[0]}><Hero /></div>
      <div ref={sectionRefs[1]}><Projects /></div>
      <div ref={sectionRefs[2]}><Skills /></div>
      <div ref={sectionRefs[3]}><About /></div>

      {/* Footer */}
      <footer className="py-8 text-center border-t" style={{ borderColor: "rgba(120,80,40,0.1)" }}>
        <p className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
          © 2026 Alex Mercer — Designed & Built with care
        </p>
      </footer>
    </div>
    </>
  )
}

export default App
