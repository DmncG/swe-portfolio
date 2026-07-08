export const CVButton = () => {
    return (
        <a
          href="/CV_Dominic_Garcia-22-6-26.pdf"
          download
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          style={{
            background: "linear-gradient(135deg, #c96d3a 0%, #e8956d 100%)",
            color: "#fdf6ec",
            fontFamily: "'Nunito', sans-serif",
            boxShadow: "0 4px 20px rgba(201,109,58,0.35)",
          }}
          aria-label="Download CV"
        >
          {/* <Download size={16} strokeWidth={2.5} /> */}
          Download CV
        </a>
      );
}