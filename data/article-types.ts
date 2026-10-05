export type ArticleLink = { label: string; href: string };
export type ArticleSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
  links?: ArticleLink[];
};
export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: "AI" | "Automation" | "Software" | "Engineering" | "Business";
  date: string;
  updatedAt?: string;
  readingTime: string;
  relatedService: string;
  relatedArticles?: string[];
  intro: string;
  takeaways?: string[];
  download?: { href: string; label: string; description: string };
  sections: ArticleSection[];
};
