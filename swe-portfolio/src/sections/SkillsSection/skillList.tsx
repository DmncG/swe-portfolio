export type Skill = {
    category: string,
    color: string,
    bg: string,
    skills: string[],
}

export const skillList = [
    {
      category: "Languages",
      color: "#78b4c8",
      bg: "rgba(120,180,200,0.12)",
      skills: ["TypeScript", "JavaScript", "Python", "Rust", "SQL", "HTML/CSS"],
    },
    {
      category: "Frameworks & Libraries",
      color: "#c96d3a",
      bg: "rgba(201,109,58,0.1)",
      skills: ["React", "Next.js", "React Native", "Node.js", "Express", "Fastify", "Tailwind CSS"],
    },
    {
      category: "Tools & Platforms",
      color: "#c6a23a",
      bg: "rgba(198,162,58,0.12)",
      skills: ["PostgreSQL", "Redis", "Docker", "AWS", "Vercel", "GitHub Actions", "Figma"],
    },
    {
      category: "Practices",
      color: "#8d7cc9",
      bg: "rgba(141,124,201,0.12)",
      skills: ["Design Systems", "REST & GraphQL", "TDD", "CI/CD", "Agile", "Accessibility"],
    },
  ];