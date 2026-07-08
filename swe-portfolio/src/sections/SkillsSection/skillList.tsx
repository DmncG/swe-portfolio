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
      skills: ["TypeScript", "JavaScript", "Golang", "HTML/CSS"],
    },
    {
      category: "Frameworks & Libraries",
      color: "#c96d3a",
      bg: "rgba(201,109,58,0.1)",
      skills: ["ReactJS", "Node.js", "Express", "Redux", "Tailwind CSS", "Storybook", "Jest", "Vitest", "Cypress", "React Testing Library", "ThreeJS", "R3F"],
    },
    {
      category: "Cloud & Databases",
      color: "#c6a23a",
      bg: "rgba(198,162,58,0.12)",
      skills: ["S3", "DynamoDB", "AWS Step Functions", "MongoDB", "GraphQL"],
    },
    {
      category: "DevOps & Observability",
      color: "#8d7cc9",
      bg: "rgba(141,124,201,0.12)",
      skills: ["Datadog", "Grafana", "Pingdom", "Git", "CircleCI", "AWS Cloudwatch"],
    },
    {
      category: "AI-Assisted Development",
      color: "#78b4c8",
      bg: "rgba(120,180,200,0.12)",
      skills: ["Claude", "Cursor", "Github Copilot"],
    },
    {
      category: "UX/UI",
      color: "#c96d3a",
      bg: "rgba(201,109,58,0.1)",
      skills: ["Figma", "Adobe Photoshop", "Otter.ai", "GIMP"],
    },
    {
      category: "Project Management",
      color: "#c96d3a",
      bg: "rgba(201,109,58,0.1)",
      skills: ["Jira", "Linear"],
    },
  ];