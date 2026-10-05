export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  context: string;
  problem: string;
  solution: string;
  result: string;
  technologies: string[];
  image?: { src: string; alt: string; width: number; height: number };
  testimonial?: { quote: string; name: string; role: string };
  publishedAt: string;
  approvedForPublication: boolean;
};

// Only real projects with explicit publication approval belong here.
// No demonstration project is exposed as a client reference.
export const projects: Project[] = [];
export const publishedProjects = projects.filter((project) => project.approvedForPublication);
