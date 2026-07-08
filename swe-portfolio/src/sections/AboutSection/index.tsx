import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MdMyLocation, MdMail } from "react-icons/md";
import profilePhoto from "/profile.jpg";
import githubLogo from "/GitHub-Mark-64px.png"
import linkedInLogo from "/linkedin-logo.png";
import { useContext } from "react";
import { ThemeContext } from "../../components/context/ThemeContext";
import { isDarkTheme } from "../../utils/cssUtils";

export const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });
  const theme = useContext(ThemeContext);
  const isDark = isDarkTheme(theme);

    return (
      <section ref={sectionRef} className="relative min-h-screen py-28 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <motion.p 
              className="text-xs tracking-[0.3em] uppercase text-primary mb-3" 
              style={{ fontFamily: "'DM Mono', monospace" }}
              animate={ isInView ? { 
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1
                }
              } : {
                opacity: 0,
                x: -300,
                transition: {
                  duration: 1
                }
              }}
              >
                The human behind the screen
            </motion.p>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-foreground font-serif" 
              animate={ isInView ? { 
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1
                }
              } : {
                opacity: 0,
                x: 300,
                transition: {
                  duration: 1
                }
              }}
            >
              About <em>Me</em>
            </motion.h2>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start bg-glass backdrop-blur-md border border-white/25 shadow-xl rounded-xl py-8 px-16">
            {/* Photo placeholder */}
            <div className="md:col-span-2 flex flex-col items-center md:items-start gap-4">
              <motion.div 
                className="relative w-56 h-56 md:w-full md:h-72"
                animate={ isInView ? {
                  scale: 1,
                  opacity: 1,
                  origin: "center",
                  transition: {
                    duration: 0.5
                  }
                } : {
                  scale: 0,
                  opacity: 0,
                }}
                initial={{scale: 0, opacity: 0}}
              >
                <img
                  src={profilePhoto}
                  alt="Dominic Garcia, Software Engineer"
                  className="relative z-10 w-full h-full object-cover rounded-[30%_70%_60%_40%/40%_50%_60%_50%]"
                  style={{ filter: "saturate(0.9)" }}
                />
              </motion.div>
  
              <motion.div 
                className="space-y-2 text-sm font-sans" 
                animate={ isInView ? {
                  opacity: 1,
                  transition: {
                    delay: 0.5
                  },
                } : {
                  opacity: 0
                }}
                initial={{ opacity: 0}}
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MdMyLocation size={14} className={`text-black shrink-0 ${isDark ? "invert" : ""}`} />
                  <span>Melbourne, Australia</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MdMail size={14} className={`text-black shrink-0 ${isDark ? "invert" : ""}`} />
                  <a href="mailto:micksdev@gmail.com" className="hover:text-foreground transition-colors">micksdev@gmail.com</a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <a 
                    href="https://github.com/DmncG" 
                    target="_blank" 
                    className="hover:text-foreground transition-colors flex row items-center gap-2"
                  >
                    <img 
                      src={githubLogo}
                      className={`w-[0.75rem] h-[0.75rem] ${isDark ? "invert" : ""}`}
                    />
                    github.com/dominic-garcia
                  </a>
                </div>
              </motion.div>
            </div>
  
            {/* Bio text */}
            <motion.div 
               className="md:col-span-3 space-y-5"
               animate={ isInView ? {
                opacity: 1,
                transition: {
                  delay: 0.75,
                  duration: 1
                }
               } : {
                opacity: 0
               }}
               initial={{opacity: 0}}
            >
              <p className="text-xl text-foreground leading-relaxed font-serif">
                I am a full-stack engineer with 7+ years of experience building user-centered experiences.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed font-sans">
                I wanted to work in spaces that blended logic and creativity. Moreover, I want to provide value from the stuff that I built. Software engineering seemed like the perfect fit. I have worked on features and products used by thousands of people and led end-to-end projects while putting people at the forefront.
              </p>
              <br/>
              <p className="text-base text-muted-foreground leading-relaxed font-sans">
                When I am not coding, I like to spend my time writing, honing my photography skills, playing Badminton, building Magic the Gathering commander decks, and going to KBBQ restaurants.
              </p>
  
              {/* Highlight chips */}
              <div className="flex flex-wrap gap-3 pt-4">
                {["Photography", "Badminton", "MTG", "Writing"].map(tag => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full border font-sans"
                    style={{ borderColor: "rgba(120,80,40,0.2)", color: "#7a6248" }}>
                    {tag}
                  </span>
                ))}
              </div>
  
              {/* CTA row */}
              <div className="flex flex-wrap gap-4 pt-4 justify-center">
                <motion.a 
                  href="https://github.com/DmncG"
                  target="_blank"
                  className="inline-flex items-center gap-4"
                  whileHover={{
                    scale: 1.5
                  }}
                >
                  <img className={`w-[1.5rem] h-[1.5rem] ${isDark ? "invert" : ""}`} src={githubLogo} />
                </motion.a>
                <motion.a 
                  target="_blank"
                  href="https://www.linkedin.com/in/dominic-rb-garcia/"
                  className="inline-flex items-center gap-4"
                  whileHover={{
                    scale: 1.5
                  }}
                >
                  <img className={`w-[1.5rem] h-[1.5rem] ${isDark ? "invert" : ""}` } src={linkedInLogo} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }