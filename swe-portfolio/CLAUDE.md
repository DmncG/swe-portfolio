# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server with HMR
npm run build     # type-check (tsc -b) then Vite production build
npm run lint      # ESLint across all TS/TSX files
npm run preview   # serve the production build locally
```

There are no tests configured.

## Architecture

Single-page React 19 portfolio with a full-page scroll layout. `App.tsx` is the shell: it holds four `useRef`s (one per section), an `IntersectionObserver` that sets `active` as sections enter the viewport, and a `scrollTo` helper passed down to navigation components.

**Section order** (index maps to nav index):
0. `HeroSection` — Home
1. `ProjectsSection` — Experience
2. `SkillsSection` — About (skills grid)
3. `AboutSection` — About (bio)

**Data is co-located with sections:**
- `src/sections/ProjectsSection/projectList.tsx` — `Project[]` type and array
- `src/sections/ProjectsSection/experienceList.tsx` — work history array
- `src/sections/SkillsSection/skillList.tsx` — `Skill[]` type and array

To add/edit projects, experience, or skills, edit these data files directly — the rendering components read from them.

**Shared UI components** live in `src/components/`:
- `TopNav` — horizontal nav bar receiving `sections`, `active`, `onNav`
- `NavDots` — fixed right-side dot nav, desktop only (`hidden md:flex`)
- `CVButton` — fixed floating button (no props)
- `ProjectCard` — card rendered from a `Project` object; `Menu` is present but unused

**Styling stack:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin) with a warm parchment design token system. All tokens are CSS custom properties defined in `src/theme.css` and surfaced to Tailwind via `@theme inline`. `src/index.css` imports Tailwind, `theme.css`, and Google Fonts (Jost, Nunito, DM Mono). Fonts used in JSX are set via inline `style={{ fontFamily: ... }}` — Lora (headings/serif accents), Nunito (body), DM Mono (labels/tags).

**React Compiler** is enabled via `babel-plugin-react-compiler` + `@rolldown/plugin-babel` in `vite.config.ts`. This means manual `useMemo`/`useCallback` are generally unnecessary.

The `backend/` directory exists but is empty scaffolding.
