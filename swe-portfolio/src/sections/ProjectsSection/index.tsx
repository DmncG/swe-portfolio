import { useRef } from "react";
import { motion, useInView } from "motion/react";

import { projectList } from "./projectList";
import { experienceList } from "./experienceList";
import { ProjectCard } from "../../components/ProjectCard";

type projectsProps = {
  isBottom: boolean
}

export const Projects = ({ isBottom }: projectsProps) => {
   const projectsRef = useRef(null);
   const experienceRef = useRef(null);
   const projectsInView = useInView(projectsRef, {margin: "-50%", once: true })
   const expInView = useInView(experienceRef, {margin: "-30%", once: true })

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1, 
    transition: {
      delay: 0,
      staggerChildren: 0.02,
    },
  },
}

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

   return (
      <section className="relative min-h-screen pt-28 px-6 overflow-hidden">
        <div ref={projectsRef} className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-16">
            <motion.p
              className="text-xs tracking-[0.3em] uppercase text-primary mb-3" 
              style={{ fontFamily: "'DM Mono', monospace" }}
              animate={ projectsInView || isBottom ? { 
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
              Selected work
            </motion.p>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-foreground" 
              style={{ fontFamily: "'Lora', serif" }}
              animate={ projectsInView|| isBottom ? {
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
              Projects & Experience
            </motion.h2>
          </div>
  
          {/* Projects grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
            animate={ projectsInView || isBottom ? {
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.7
              }
            } : {
              scale: 0.8,
              opacity: 0
            }}
            initial={{ scale: 0.8, opacity: 0}}
            whileInView={{
              scale: 1, 
              opacity: 1,
              transition: {
                duration: 0.7,
              }
            }}
            viewport={{ once: true, amount: 0.7 }}
          >
            {projectList.map(p => <ProjectCard key={p.name} project={p} />)}
          </motion.div>
  
          {/* Experience timeline */}
          <div>
            <motion.p 
              className="text-xs tracking-[0.3em] uppercase text-primary" 
              style={{ fontFamily: "'DM Mono', monospace" }}
              ref={experienceRef}
              animate={expInView || isBottom ? 
                { opacity: 1, y: 0, transition: { duration: 1 } } 
                : { opacity: 0, y: -150 }}
            >
              Work history
            </motion.p>
            <div className="space-y-0 mt-16 p-4 bg-glass backdrop-blur-md border border-white/25 shadow-xl rounded-xl">
              {experienceList.map((e, i) => (
                <div ref={experienceRef} key={e.company} className="flex gap-6 group">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="w-3 h-3 rounded-full mt-1.5 shrink-0 transition-colors duration-200 group-hover:bg-primary"
                      style={{ background: "#c96d3a", opacity: 0.7 }}
                      animate={expInView || isBottom ? { opacity: 1, transition: { delay: i + 0.25} } : { opacity: 0 }}
                    />
                    {i < experienceList.length - 1 && (
                      <motion.div 
                        className="w-px flex-1 my-2"
                        style={{ background: "rgba(120,80,40,0.2)" }}
                        animate={expInView || isBottom ? { scaleY: 1, originY: "top", transition: { duration: 1, delay: i + 0.25 }, opacity: 1 } : { scaleY: 0, originY: "top", opacity: 0 }}
                      />
                    )}
                  </div>
                  <div className={`pb-10 ${i === experienceList.length - 1 ? "pb-0" : ""}`}>
                    <motion.div animate={ expInView ? { opacity: 1, transition: { delay: i + 0.5 }} : { opacity: 0 }} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h4 
                        className="text-lg font-semibold text-foreground"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                      {e.role}
                      </h4>
                      <span className="text-sm text-primary font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>{e.company}</span>
                      <span className="text-xs text-muted-foreground ml-auto" style={{ fontFamily: "'DM Mono', monospace" }}>{e.period}</span>
                    </motion.div>
                    <motion.p 
                      className="text-sm text-left text-muted-foreground leading-relaxed" 
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                      variants={sentence}
                      animate={expInView || isBottom ? "visible" : "hidden"}
                    >
                      {e.desc.split('').map((l, i) => <motion.span key={`${l}-${i}`} variants={letter}>{l}</motion.span>)}
                    </motion.p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
}