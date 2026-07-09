import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { MdMenu, MdClose } from "react-icons/md";
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
      <>
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
              className={`text-sm font-medium font-sans tracking-wide transition-colors duration-200 cursor-pointer ${active === i ? "text-dom-dot" : "text-muted-foreground hover:text-foreground"}`}
            >
              {s}
            </button>
          ))}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden text-foreground cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? (
            <motion.div
              whileHover={{
                scale: 1.5
              }}
            >
              <MdClose />
            </motion.div>
            ) : (
            <motion.div
              whileHover={{
                scale: 1.5
              }}
            >
              <MdMenu />
            </motion.div>
          )}
        </button>
        <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 z-40 bg-background flex flex-col py-4 px-8 gap-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, originX: "right", originY: "top" }}
            exit={{ opacity: 0, scale: 0 }}
            key="box"
          >
            {sections.map((section, i) => (
              <motion.button
                key={section}
                onClick={() => { onNav(i); setOpen(false); }}
                className={`text-left text-sm font-medium cursor-pointer hover:text-dom-dot ${active === i ? "text-primary" : "text-muted-foreground"}`}
              >
                {section}
              </motion.button>
            ))}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
        )}
        </AnimatePresence>
      </nav>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
    );
  }