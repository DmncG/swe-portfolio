import { useState } from "react";
import { Menu } from "../Menu";

import domLogo from "/dom_logo_2_black.png";

type TopNavProps = {
    sections: string[],
    active: number,
    onNav:  (i: number) => void,
}

export const TopNav = ({ sections, active, onNav }: TopNavProps) => {
    const [open, setOpen] = useState(false);
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4"
        style={{ background: "rgba(253,246,236,0.82)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(120,80,40,0.1)" }}>
        <span className="font-serif text-xl font-semibold text-foreground tracking-wide" style={{ fontFamily: "'Lora', serif" }}>
          <img className="w-18" src={domLogo} />
        </span>
        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {sections.map((s, i) => (
            <button key={s} onClick={() => onNav(i)}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${active === i ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              {s}
            </button>
          ))}
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
          </div>
        )}
      </nav>
    );
  }