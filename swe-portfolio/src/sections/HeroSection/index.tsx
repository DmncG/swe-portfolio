import { motion } from "motion/react"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useContext } from "react";
import { ThemeContext } from "../../components/context/ThemeContext";

export const Hero = () => {
  const theme = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 z-10">

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.p
          className="text-sm font-medium tracking-[0.3em] uppercase text-primary mb-4"
          style={{ fontFamily: "'DM Mono', monospace" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Software Engineer · UX Designer
        </motion.p>

        <h1
          className="text-6xl md:text-8xl font-bold text-foreground leading-none mb-6 font-serif"
          style={{ letterSpacing: "-0.02em"}}
        >
          <motion.span
            className={`block ${isDark ? "text-foreground" : ""}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            Dominic
          </motion.span>
          <motion.span
            className="block italic text-primary"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.55 }}
          >
            Garcia
          </motion.span>
        </h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10 font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.85 }}
        >
          Crafting experiences where user-centered code meets elegant design. Grounded in collaboration, communication, and simplicity.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>Scroll</span>
        <MdKeyboardArrowDown />
      </motion.div>
    </section>
  )
}
