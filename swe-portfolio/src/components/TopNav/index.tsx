import { useState } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { DomDot } from "../DomDot";

import domLogoBlack from "/dom_logo_2_black.png";
import domLogoWhite from "/dom_logo_2_white.png";

import type { ThemeToggleProps } from "../ThemeToggle";

type TopNavProps = {
    sections: string[],
    active: number,
    onNav:  (i: number) => void,
    themeConfig: ThemeToggleProps
}

export const TopNav = ({ sections, active, onNav, themeConfig }: TopNavProps) => {
    const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = themeConfig;
    return (
      <nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-background opacity-100"
        style={{ 
          // background: "rgba(253,246,236,0.82)", 
          backdropFilter: "blur(16px)", 
          borderBottom: "1px solid rgba(120,80,40,0.1)" 
          }}
      >
          <a 
            href="/#"
          >
            <span 
              className="font-serif font-semibold tracking-wide"
            >
              <DomDot />
              <img className="w-12" src={theme === "light" ? domLogoBlack : domLogoWhite} />
            </span>
          </a>
        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {sections.map((s, i) => (
            <button key={s} onClick={() => onNav(i)}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${active === i ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              {s}
            </button>
          ))}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {/* {open ? <X size={22} /> : <Menu size={22} />} */}
        </button>
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border flex flex-col py-4 px-8 gap-4">
            {sections.map((s, i) => (
              <button key={s} onClick={() => { onNav(i); setOpen(false); }}
                className={`text-left text-sm font-medium ${active === i ? "text-primary" : "text-muted-foreground"}`}
                style={{ fontFamily: "'Nunito', sans-serif" }}>
                {s}
              </button>
            ))}
            {/* <ThemeToggle /> */}
          </div>
        )}
      </nav>
    );
  }