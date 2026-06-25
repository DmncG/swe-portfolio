import { projectList } from "./projectList";
import { experienceList } from "./experienceList";
import { ProjectCard } from "../../components/ProjectCard";

export const Projects = () => {
   return (
      <section className="relative min-h-screen py-28 px-6 overflow-hidden">
        {/* <BrushStroke color="#f4c14f" className="absolute -top-4 -right-8 w-96 pointer-events-none" opacity={0.5} />
        <PaintBlob color="#e8956d" className="absolute bottom-16 -left-16 w-72 h-72 pointer-events-none" opacity={0.45} />
        <Flecks color="#78b4c8" className="absolute top-1/2 right-8 w-64 pointer-events-none" opacity={0.28} /> */}
  
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>Selected work</p>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground" style={{ fontFamily: "'Lora', serif" }}>
              Projects &<br /><em>Experience</em>
            </h2>
          </div>
  
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {projectList.map(p => <ProjectCard key={p.name} project={p} />)}
          </div>
  
          {/* Experience timeline */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-8" style={{ fontFamily: "'DM Mono', monospace" }}>Work history</p>
            <div className="space-y-0">
              {experienceList.map((e, i) => (
                <div key={e.company} className="flex gap-6 group">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full mt-1.5 shrink-0 transition-colors duration-200 group-hover:bg-primary"
                      style={{ background: "#c96d3a", opacity: 0.7 }} />
                    {i < experienceList.length - 1 && <div className="w-px flex-1 my-2" style={{ background: "rgba(120,80,40,0.2)" }} />}
                  </div>
                  <div className={`pb-10 ${i === experienceList.length - 1 ? "pb-0" : ""}`}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h4 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Lora', serif" }}>{e.role}</h4>
                      <span className="text-sm text-primary font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>{e.company}</span>
                      <span className="text-xs text-muted-foreground ml-auto" style={{ fontFamily: "'DM Mono', monospace" }}>{e.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
}