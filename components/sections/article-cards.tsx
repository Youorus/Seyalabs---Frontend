import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredArticles, type Article } from "@/data/articles";

export function ArticleCards({ items = featuredArticles }: { items?: Article[] }) {
  return <div className="article-grid">{items.map((article, i) => <article key={article.slug} className="article-card"><Link href={`/insights/${article.slug}`} className="article-card-link">
    <div className={`article-art article-art-${i % 3}`} aria-hidden="true"><span className="mono">SEYA LABS / GUIDES & NOTES</span><div className="article-art-diagram">{i % 3 === 0 ? <><i /><i /><i /><b>→</b><i /></> : i % 3 === 1 ? <><i /><em /><i /><em /><i /></> : <><b>?</b><i /><i /><i /></>}</div><span className="mono">NOTE / {String(i + 1).padStart(3, "0")}</span></div>
    <div className="article-meta mono"><span>{article.category}</span><span>{article.readingTime} DE LECTURE</span></div>
    <h3>{article.title}<ArrowUpRight size={22} aria-hidden="true" /></h3><p>{article.description}</p>
  </Link></article>)}</div>;
}
