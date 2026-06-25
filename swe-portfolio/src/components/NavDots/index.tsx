
type NavDotsProps = {
    active: number,
    sections: string[],
    onNav: (i: number) => void
}

export const NavDots = ({ active, sections, onNav }: NavDotsProps) => {{
        return (
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 hidden md:flex">
            {sections.map((s, i) => (
              <button
                key={s}
                onClick={() => onNav(i)}
                aria-label={`Go to ${s}`}
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                  active === i
                    ? "bg-primary border-primary scale-125"
                    : "bg-transparent border-muted-foreground hover:border-primary"
                }`}
              />
            ))}
          </div>
        )}
}