
export type Project = {
    name: string,
    description: string,
    tags: string[],
    link: string,
    year: string,
}

export const projectList: Project[] = [
    {
      name: "Lyra Design System",
      description: "A comprehensive component library used across 4 internal products, reducing UI build time by 60%. Built with React, TypeScript, and Storybook.",
      tags: ["React", "TypeScript", "Storybook", "CSS"],
      link: "#",
      year: "2024",
    },
    {
      name: "Marea Analytics",
      description: "Real-time data pipeline dashboard handling 2M events/day. Features WebSocket live updates, D3 charts, and role-based access control.",
      tags: ["Next.js", "Python", "PostgreSQL", "WebSocket"],
      link: "#",
      year: "2024",
    },
    {
      name: "Canopy — Field Notes App",
      description: "A mobile-first journaling app for botanists and nature researchers. Offline-first architecture with sync, rich media attachments, and geolocation.",
      tags: ["React Native", "Expo", "SQLite", "Node.js"],
      link: "#",
      year: "2023",
    },
    {
      name: "Torrent — OSS Caching Layer",
      description: "A distributed caching middleware for Express/Fastify applications. Published on npm with 1.4k weekly downloads and 220+ GitHub stars.",
      tags: ["Node.js", "Redis", "OSS"],
      link: "#",
      year: "2023",
    },
  ];