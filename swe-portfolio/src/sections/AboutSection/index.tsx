import profilePhoto from "/profile.jpg";

export const About = () => {
    return (
      <section className="relative min-h-screen py-28 px-6 overflow-hidden">
        {/* <PaintBlob color="#e8956d" className="absolute -top-10 -left-10 w-80 h-80 pointer-events-none" opacity={0.45} />
        <BrushStroke color="#78b4c8" className="absolute bottom-16 -right-8 w-96 pointer-events-none" opacity={0.4} />
        <BrushStrokeShort color="#f4c14f" className="absolute top-1/2 left-1/2 w-64 h-64 pointer-events-none -translate-x-1/2 -translate-y-1/2" opacity={0.3} />
        <Flecks color="#f4c14f" className="absolute top-24 right-12 w-72 pointer-events-none" opacity={0.32} /> */}
  
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>The person behind the work</p>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground" style={{ fontFamily: "'Lora', serif" }}>
              About <em>Me</em>
            </h2>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
            {/* Photo placeholder */}
            <div className="md:col-span-2 flex flex-col items-center md:items-start gap-4">
              <div className="relative w-56 h-56 md:w-full md:h-72">
                {/* Watercolor ring behind photo */}
                <div className="absolute -inset-4 rounded-[40%_60%_55%_45%/50%_40%_60%_50%] opacity-40"
                  style={{ background: "radial-gradient(ellipse, #f4c14f 0%, transparent 70%)", filter: "blur(16px)" }} />
                <img
                  src={profilePhoto}
                  alt="Dominic Garcia, Software Engineer"
                  className="relative z-10 w-full h-full object-cover rounded-[30%_70%_60%_40%/40%_50%_60%_50%]"
                  style={{ filter: "saturate(0.9)" }}
                />
              </div>
  
              <div className="space-y-2 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
                <div className="flex items-center gap-2 text-muted-foreground">
                  {/* <MapPin size={14} className="text-primary shrink-0" /> */}
                  <span>Melbourne, Australia</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  {/* <Mail size={14} className="text-primary shrink-0" /> */}
                  <a href="mailto:alex@example.com" className="hover:text-foreground transition-colors">micksdev@gmail.com</a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  {/* <Github size={14} className="text-primary shrink-0" /> */}
                  <a href="#" className="hover:text-foreground transition-colors">github.com/dominic-garcia</a>
                </div>
              </div>
            </div>
  
            {/* Bio text */}
            <div className="md:col-span-3 space-y-5">
              <p className="text-xl text-foreground leading-relaxed"
                style={{ fontFamily: "'Lora', serif" }}>
                I am a full-stack engineer with 5+ years of experience building products that people actually enjoy using.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                My path into software started through digital art and interaction design, which means I care as much about how something looks and feels as how it functions underneath. I have shipped apps used by tens of thousands of people, led front-end teams, and contributed to open-source tooling.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                When I am not coding, I spend time in the darkroom printing analogue photographs, hiking the Müggelsee trails, and reading about the history of typography. I believe that constraints breed creativity, and that the best software is built when engineers understand the humans using it.
              </p>
  
              {/* Highlight chips */}
              <div className="flex flex-wrap gap-3 pt-2">
                {["Open source contributor", "Speaker @ JSConf Berlin 2023", "Photography", "Analogue film"].map(tag => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full border"
                    style={{ borderColor: "rgba(120,80,40,0.2)", color: "#7a6248", fontFamily: "'Nunito', sans-serif" }}>
                    {tag}
                  </span>
                ))}
              </div>
  
              {/* CTA row */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="mailto:alex@example.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-primary-foreground transition-all duration-200 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #c96d3a, #e8956d)", fontFamily: "'Nunito', sans-serif" }}>
                  {/* <Mail size={14} /> Say Hello */}
                </a>
                <a href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:bg-muted"
                  style={{ borderColor: "rgba(120,80,40,0.25)", color: "#3b2b1a", fontFamily: "'Nunito', sans-serif" }}>
                  {/* <Github size={14} /> GitHub */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }