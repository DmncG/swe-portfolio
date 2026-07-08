
import { type Project } from "../../sections/ProjectsSection/projectList";

export const ProjectCard = ({ project }: { project: Project }) => {
    return (
      <div 
        className="group relative rounded-2xl p-6 bg-glass backdrop-blur-md border border-white/25 shadow-xl rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{project.year}</span>
          <a href={project.link} className="text-muted-foreground hover:text-primary transition-colors">
          </a>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2 font-serif">{project.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-sans">{project.description}</p>
        <div className="flex flex-wrap gap-2 pt-4">
          {project.tags.map(t => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: "rgba(201,109,58,0.1)", color: "#c96d3a", fontFamily: "'DM Mono', monospace" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }