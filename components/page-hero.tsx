import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button, Container, SectionLabel } from "@/components/ui/primitives";

export function PageHero({ title, description, label, number, breadcrumb, cta = false, ctaHref = "/contact" }: {
  title: string; description: string; label: string; number?: string;
  breadcrumb: { name: string; href?: string }[]; cta?: boolean; ctaHref?: string;
}) {
  return <section className="page-hero"><Container><nav className="breadcrumbs" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link>{breadcrumb.map((item, i) => <span key={item.name} style={{ display: "contents" }}><ChevronRight size={10} aria-hidden="true" />{item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current={i === breadcrumb.length - 1 ? "page" : undefined}>{item.name}</span>}</span>)}</nav><div className="page-hero-grid"><div><SectionLabel number={number}>{label}</SectionLabel><h1>{title}</h1><p>{description}</p>{cta && <Button href={ctaHref}>Parlons de votre projet</Button>}</div>{number && <span className="page-hero-index" aria-hidden="true">{number}</span>}</div></Container></section>;
}
