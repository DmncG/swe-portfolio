import { skillList } from "./skillList";

export const Skills = () => {
    return (
      <section className="relative min-h-screen py-28 px-6 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>What I work with</p>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground" style={{ fontFamily: "'Lora', serif" }}>
              Skills &<br /><em>Toolkit</em>
            </h2>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillList.map(group => (
              <div key={group.category} className="rounded-2xl p-7 border relative overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ background: "rgba(254,249,243,0.9)", borderColor: "rgba(120,80,40,0.1)" }}>
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
              </div>
            ))}
          </div>
  
          {/* Proficiency meter strip */}
          <div className="mt-14 rounded-2xl p-7 border"
            style={{ background: "rgba(254,249,243,0.9)", borderColor: "rgba(120,80,40,0.1)" }}>
            <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-6 text-primary"
              style={{ fontFamily: "'DM Mono', monospace" }}>Proficiency highlights</p>
            <div className="space-y-4">
              {[
                { name: "React / Next.js", pct: 95, color: "#c96d3a" },
                { name: "TypeScript", pct: 90, color: "#78b4c8" },
                { name: "Node.js / APIs", pct: 88, color: "#c6a23a" },
                { name: "Python", pct: 75, color: "#8d7cc9" },
              ].map(({ name, pct, color }) => (
                <div key={name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-foreground" style={{ fontFamily: "'Nunito', sans-serif" }}>{name}</span>
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(120,80,40,0.1)" }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
