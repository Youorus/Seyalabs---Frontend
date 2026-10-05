import { PageHero } from "@/components/page-hero";
import { Container, LinkArrow, JsonLd } from "@/components/ui/primitives";
import { FinalCta } from "@/components/sections/final-cta";
import { solutions } from "@/data/services";
import { pageMetadata, breadcrumbs } from "@/lib/seo";

export const metadata = pageMetadata("Solutions numériques pour les besoins de votre entreprise", "Applications métier, plateformes web/mobile, SaaS, assistants et agents IA, workflows, API et MVP : des solutions pour vos opérations et vos produits.", "/solutions");
export default function Solutions() { return <div className="services-landing"><PageHero title="Ce qui freine. Ce qui change." description="Une solution commence par un problème bien compris. Découvrez les systèmes que nous concevons pour simplifier vos opérations et développer vos produits." label="SOLUTIONS" breadcrumb={[{ name: "Solutions" }]} /><section className="section"><Container><div className="business-needs">{solutions.map((solution) => <article className="business-need" key={solution.slug}><span className="mono">{solution.number} / {solution.label}</span><h2>{solution.name}</h2><p>{solution.intro}</p><dl><dt>LE PROBLÈME</dt><dd>{solution.problemTitle}</dd><dt>NOTRE INTERVENTION</dt><dd>{solution.deliverables[0]}.</dd><dt>LE RÉSULTAT VISÉ</dt><dd>{solution.outcomes[0]}</dd></dl><LinkArrow href={`/solutions/${solution.slug}`}>Découvrir la solution</LinkArrow></article>)}</div></Container></section><FinalCta /><JsonLd data={breadcrumbs([{ name: "Solutions", path: "/solutions" }])} /></div>; }
