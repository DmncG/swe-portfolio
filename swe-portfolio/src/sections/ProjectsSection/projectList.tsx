
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
      description: "Migrated various React components to the new component library across hundreds of files. Utilized Claude subagents, worktrees, and skills to streamline the migration development workflow.",
      tags: ["React", "TypeScript", "Claude", "Vitest"],
      link: "#",
      year: "2026",
    },
    {
      name: "Multi-product Purchases",
      description: "Tech Lead that implemented multiproduct feature in the purchasing flow. Established project agreements across stakeholders and cleaned substantial tech debt.",
      tags: ["Typescript", "Golang", "DynamoDB", "Jest", "React", "Redux"],
      link: "#",
      year: "2025",
    },
    {
      name: "ISTE Certifications",
      description: "Created the DB table to store certification data for every application, updated modal components and created new cards and tables",
      tags: ["Typescript", "Golang", "DynamoDB", "React", "Jest"],
      link: "#",
      year: "2025",
    },
    {
      name: "Information Architecture Redesign",
      description: "Updated the information architecture for book sections and redesigned the navigation components",
      tags: ["Figma", "ReactJS", "Material UI", "GraphQL"],
      link: "https://linky.design/strand-taxonomy",
      year: "2021",
    },
  ];