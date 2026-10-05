export type Training = {
  slug: string;
  number: string;
  name: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  audience: string;
  prerequisites: string;
  objectives: string[];
  modules: { title: string; description: string }[];
  workshop: { title: string; description: string; outputs: string[] };
  tools: string[];
  relatedExpertise: string;
  relatedSolution?: string;
};
