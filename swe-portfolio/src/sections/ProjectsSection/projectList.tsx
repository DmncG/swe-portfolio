
export type Project = {
    name: string,
    description: string,
    tags: string[],
    link: string,
    year: string,
}

export const projectList: Project[] = [
    {
      name: "Dewey 3.0 Migration",
      description: "Migrated React components to a new component library across hundreds of files, using Claude subagents, worktrees, and skills to accelerate the rollout.",
      tags: ["React", "TypeScript", "Claude", "Vitest"],
      link: "#",
      year: "2026",
    },
    {
      name: "Multi-product Purchases",
      description: "Led the purchasing flow's multi-product feature, aligning stakeholders on scope and clearing significant tech debt along the way.",
      tags: ["Typescript", "Golang", "DynamoDB", "Jest", "React", "Redux"],
      link: "#",
      year: "2025",
    },
    {
      name: "ISTE Certifications",
      description: "Designed the database schema for certification data across all applications, then built the supporting UI — new modals, cards, and tables.",
      tags: ["Typescript", "Golang", "DynamoDB", "React", "Jest"],
      link: "#",
      year: "2025",
    },
    {
      name: "Information Architecture Redesign",
      description: "Restructured the information architecture for book sections and redesigned the corresponding navigation components.",
      tags: ["Figma", "ReactJS", "Material UI", "GraphQL"],
      link: "https://linky.design/strand-taxonomy",
      year: "2021",
    },
  ];