
export const Hero = () => {

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* // Paint blobs, strokes & flecks
      <PaintBlob color="#f4c14f" className="absolute -top-16 -left-16 w-80 h-80 pointer-events-none" opacity={0.6} />
      <BrushStroke color="#78b4c8" className="absolute top-24 -right-10 w-80 pointer-events-none" opacity={0.45} />
      <PaintBlob color="#e8956d" className="absolute bottom-8 left-1/4 w-64 h-64 pointer-events-none" opacity={0.5} />
      <BrushStrokeShort color="#f4c14f" className="absolute -bottom-8 right-12 w-52 h-52 pointer-events-none" opacity={0.55} />
      <Flecks color="#c96d3a" className="absolute top-1/3 left-1/4 w-72 pointer-events-none" opacity={0.3} /> */}

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <p className="text-sm font-medium tracking-[0.3em] uppercase text-primary mb-4"
          style={{ fontFamily: "'DM Mono', monospace" }}>
          Software Engineer · UX Designer
        </p>
        <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-none mb-6"
          style={{ fontFamily: "'Lora', serif", letterSpacing: "-0.02em" }}>
          Dominic<br />
          <span className="italic" style={{ color: "#c96d3a" }}>Garcia</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          Crafting experiences where user-centered code meets elegant design. Grounded in collaboration, communication, and simplicity.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button className="px-6 py-3 rounded-full text-sm font-semibold text-primary-foreground transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #c96d3a, #e8956d)", fontFamily: "'Nunito', sans-serif" }}>
            View My Work
          </button>
          <button className="px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-200 hover:bg-muted cursor-pointer"
            style={{ borderColor: "rgba(120,80,40,0.25)", fontFamily: "'Nunito', sans-serif", color: "#3b2b1a" }}>
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>Scroll</span>
        {/* <ChevronDown size={18} /> */}
      </div>
    </section>
    )
}