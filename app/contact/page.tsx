import { Container, SectionLabel, JsonLd } from "@/components/ui/primitives";
import { ContactForm } from "@/components/contact-form";
import { pageMetadata, breadcrumbs } from "@/lib/seo";
import { site } from "@/lib/site";
import { trainings } from "@/data/trainings";

export const metadata = pageMetadata("Contact : projet ou formation", "Décrivez votre projet ou votre besoin de formation à SEYA LABS : logiciel, IA, automatisation ou data/API. Précisez vos objectifs et votre calendrier.", "/contact");
export const dynamic = "force-dynamic";
export default async function Contact({ searchParams }: { searchParams: Promise<{ type?: string | string[]; formation?: string | string[] }> }) {
  const query = await searchParams;
  const isTraining = query.type === "formation";
  const training = isTraining ? trainings.find((item) => item.slug === query.formation) : undefined;
  const initialMessage = training ? `Je souhaite organiser une formation « ${training.name} » pour mon équipe.\n\n` : "";
  return <Container><div className="contact-layout"><div className="contact-aside"><SectionLabel>{isTraining ? "NEXT / VOTRE FORMATION" : "NEXT / VOTRE PROJET"}</SectionLabel><h1>Commençons<br />par votre<br /><span className="copper">besoin.</span></h1><p>{isTraining ? "Décrivez les objectifs de votre équipe, le nombre de participants et leur niveau actuel. Nous préciserons ensemble le parcours adapté." : <>Pas besoin d’un cahier des charges complet.<br />Décrivez votre contexte et ce que vous aimeriez faire avancer.</>}</p><a href={`mailto:${site.email}`} data-analytics="email_clicked">{site.email} ↗</a><div className="contact-next"><span className="mono">ET ENSUITE ?</span><ol><li>Nous prenons connaissance de votre besoin.</li><li>Nous échangeons pour préciser le contexte.</li><li>{isTraining ? "Nous proposons un programme et des modalités adaptés." : "Nous définissons une prochaine étape adaptée."}</li></ol></div></div><ContactForm key={training?.slug || (isTraining ? "formation" : "projet")} deliveryEnabled={Boolean(process.env.CONTACT_WEBHOOK_URL)} initialProjectType={isTraining ? "Formation" : undefined} initialMessage={initialMessage} /></div><JsonLd data={breadcrumbs([{ name: "Contact", path: "/contact" }])} /></Container>;
}
