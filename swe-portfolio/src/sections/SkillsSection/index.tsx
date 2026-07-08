import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { skillList } from "./skillList";

type skillsProps = {
  isBottom: boolean
};

export const Skills = ({isBottom}: skillsProps) => {

    const skillGroupRef = useRef(null);
    const proficiencyRef = useRef(null);
    const skillGroupInView = useInView(skillGroupRef, {margin: "-50%", once: true });
    const proficiencyInView = useInView(proficiencyRef, {margin: "-50%", once: true });
    
    return (
      <section className="relative min-h-screen py-28 px-6 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="mb-16">
            <motion.p 
              className="text-xs tracking-[0.3em] uppercase text-primary mb-3" 
              style={{ fontFamily: "'DM Mono', monospace" }}
              animate={ skillGroupInView || isBottom ? {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1
                }
              } : {
                opacity: 0,
                x: -300
              }}
            >
              What I work with
            </motion.p>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-foreground"
              style={{ fontFamily: "'Lora', serif" }}
              animate={ skillGroupInView || isBottom ? {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1
                }
              } : {
                opacity: 0,
                x: 300
              }}
            >
              Skills & Toolkit
            </motion.h2>
          </div>
  
          <div ref={skillGroupRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillList.map((group, i) => (
              <motion.div 
                key={group.category} 
                className="bg-glass backdrop-blur-md border border-white/25 shadow-xl rounded-xl p-7 relative overflow-hidden transition-all duration-300 hover:shadow-lg"
                animate={skillGroupInView || isBottom ? { 
                  opacity: 1, 
                  transition: {
                  delay: i * 0.5,
                  duration: 1,
                  },
                   originX: 0,
                } : { 
                  opacity: 0,
                  originX: 0,
                }
              }
              >
                {/* Accent stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: group.color }} />
                <h3 className="text-xs tracking-[0.25em] uppercase font-semibold mb-5 ml-2"
                  style={{ color: group.color, fontFamily: "'DM Mono', monospace" }}>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2 ml-2">
                  {group.skills.map(skill => (
                    <span key={skill}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default"
                      style={{ background: group.bg, color: group.color, fontFamily: "'Nunito', sans-serif" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
  
          {/* Proficiency meter strip */}
          <div className="mt-14 bg-glass backdrop-blur-md border border-white/25 shadow-xl rounded-xl p-7"
          >
            <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-6 text-primary"
              style={{ fontFamily: "'DM Mono', monospace" }}>Proficiency highlights</p>
            <div ref={proficiencyRef} className="space-y-4">
              {[
                { name: "ReactJS", pct: 95, color: "#c96d3a" },
                { name: "TypeScript", pct: 90, color: "#78b4c8" },
                { name: "DynamoDB", pct: 85, color: "#c6a23a" },
                { name: "Claude", pct: 67, color: "#8d7cc9" },
              ].map(({ name, pct, color }) => (
                <div key={name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-primary" style={{ fontFamily: "'Nunito', sans-serif" }}>{name}</span>
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(120,80,40,0.1)" }}>
                    <motion.div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }}
                      animate={
                        proficiencyInView || isBottom ? {
                          opacity: 1,
                          scaleX: 1,
                          transition: {
                            duration: 0.75
                          }
                        } : {
                          opacity: 0,
                          scaleX: 0,
                          originX: 0,
                        }
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
