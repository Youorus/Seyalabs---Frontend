import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { articles } from "@/data/articles";
import { services } from "@/data/services";
import { PageHero } from "@/components/page-hero";
import { Container, Button, JsonLd } from "@/components/ui/primitives";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata, breadcrumbs } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = articles.find((item) => item.slug === slug); if (!article) notFound();
  const metadata = pageMetadata(article.seoTitle, article.description, `/insights/${slug}`);
  return { ...metadata, authors: [{ name: site.name, url: `${site.url}/a-propos` }],
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: article.date, modifiedTime: article.updatedAt || article.date, authors: [site.name], section: article.category } };
}
export default async function Insight({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = articles.find((item) => item.slug === slug); if (!article) notFound();
  const service = services.find((item) => item.slug === article.relatedService);
  const related = (article.relatedArticles || []).map((relatedSlug) => articles.find((item) => item.slug === relatedSlug)).filter((item) => item !== undefined);
  const publishedDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" }).format(new Date(`${article.date}T12:00:00Z`));
  return <>
    <PageHero title={article.title} description={article.description} label={`${article.category.toUpperCase()} / ${article.readingTime} DE LECTURE`} breadcrumb={[{ name: "Insights", href: "/insights" }, { name: article.seoTitle }]} />
    <section className="section"><Container><div className="article-layout">
      <article className="article-body">
        <div className="article-byline"><Link href="/a-propos">Par SEYA LABS</Link><span>Publié le <time dateTime={article.date}>{publishedDate}</time></span></div>
        <p className="article-lead">{article.intro}</p>
        {article.takeaways && <div className="article-takeaways"><h2>Les repères pour décider.</h2><ul>{article.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></div>}
        {article.download && <div className="article-download"><span className="mono">RESSOURCE GRATUITE / SANS INSCRIPTION</span><p>{article.download.description}</p><a className="button button-dark" href={article.download.href} download data-analytics="resource_downloaded"><span>{article.download.label}</span><Download size={18} aria-hidden="true" /></a></div>}
        {article.sections.map((section, i) => <section id={`section-${i}`} key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          {section.table && <figure className="comparison">
            <figcaption>{section.table.caption}</figcaption><p className="comparison-hint">Faites défiler le tableau horizontalement pour lire toutes les colonnes.</p>
            <div className="comparison-table" tabIndex={0} role="region" aria-label={section.table.caption}>
              <table><caption className="visually-hidden">{section.table.caption}</caption><thead><tr>{section.table.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
                <tbody>{section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={index} scope="row">{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </figure>}
          {section.links && <nav className="article-context-links" aria-label={`Pour approfondir : ${section.title}`}>{section.links.map((link) => <Link href={link.href} key={link.href}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</nav>}
        </section>)}
        <div className="article-author"><Link href="/a-propos">Écrit par SEYA LABS</Link><time dateTime={article.date}>{publishedDate}</time></div>
      </article>
      <aside className="article-aside"><span className="mono">DANS CE GUIDE</span><nav aria-label="Sommaire de l’article">{article.sections.map((section, i) => <a href={`#section-${i}`} key={section.title}>{section.title}</a>)}</nav><h3>Passer de la question au système.</h3><p>Vous reconnaissez votre situation ? Découvrez comment nous pouvons construire une réponse adaptée.</p>{service && <Button variant="dark" href={`/${service.kind}/${service.slug}`}>{service.name}</Button>}</aside>
    </div></Container></section>
    {related.length > 0 && <section className="section service-reading"><Container><h2 className="guides-heading">Continuer le cadrage.</h2><nav className="reading-links" aria-label="Guides complémentaires">{related.map((item) => <Link href={`/insights/${item.slug}`} key={item.slug}><span>{item.seoTitle}</span><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</nav></Container></section>}
    <FinalCta />
    <JsonLd data={breadcrumbs([{ name: "Insights", path: "/insights" }, { name: article.seoTitle, path: `/insights/${slug}` }])} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description,
      datePublished: `${article.date}T10:00:00+02:00`, dateModified: `${article.updatedAt || article.date}T10:00:00+02:00`,
      author: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: `${site.url}/a-propos` },
      publisher: { "@id": `${site.url}/#organization` }, mainEntityOfPage: `${site.url}/insights/${slug}`, image: `${site.url}/opengraph-image`, inLanguage: "fr-FR", articleSection: article.category }} />
  </>;
}
