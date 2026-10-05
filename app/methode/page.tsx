import { PageHero } from "@/components/page-hero";
import { Container, JsonLd } from "@/components/ui/primitives";
import { FinalCta } from "@/components/sections/final-cta";
import { processSteps } from "@/data/process";
import { pageMetadata, breadcrumbs } from "@/lib/seo";

export const metadata = pageMetadata("Notre méthode : du besoin à la production", "Découvrez comment SEYA LABS cadre, conçoit, développe et déploie vos systèmes numériques, avec des cycles courts et des validations avec vos équipes.", "/methode");
export default function Methode() { return <><PageHero title="Un problème compris. Un produit construit." description="La méthode donne un cadre aux décisions, aux retours et à la livraison. Vous savez ce que nous construisons, pourquoi et quelle est la prochaine étape." label="MÉTHODE" breadcrumb={[{ name: "Méthode" }]} /><section className="section"><Container><div className="method-steps">{processSteps.map((step) => <article className="method-step" key={step.number}><span className="method-step-number" aria-hidden="true">{step.number}</span><div><span className="mono">{step.label}</span><h2>{step.title}</h2></div><div><p>{step.description}</p><p className="step-output">{step.deliverable}</p></div></article>)}</div></Container></section><FinalCta /><JsonLd data={breadcrumbs([{ name: "Méthode", path: "/methode" }])} /></>; }
