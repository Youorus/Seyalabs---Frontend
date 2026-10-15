import { Container, SectionLabel, JsonLd } from "@/components/ui/primitives";
import { ContactForm } from "@/components/contact-form";
import { pageMetadata, breadcrumbs } from "@/lib/seo";
import { site } from "@/lib/site";
import { trainings } from "@/data/trainings";
import { serviceEnquiry } from "@/lib/service-enquiry";
import { smtpConfig } from "@/lib/contact-mail";

export const metadata = pageMetadata("Contact : projet ou formation", "Décrivez votre projet ou votre besoin de formation à SEYA LABS : logiciel, IA, automatisation ou data/API. Précisez vos objectifs et votre calendrier.", "/contact");
export const dynamic = "force-dynamic";
export default async function Contact({ searchParams }: { searchParams: Promise<{ type?: string | string[]; formation?: string | string[]; service?: string | string[] }> }) {
  const query = await searchParams;
  const isTraining = query.type === "formation";
  const training = isTraining ? trainings.find((item) => item.slug === query.formation) : undefined;
  const enquiry = isTraining ? undefined : serviceEnquiry(query.service);
  const initialMessage = training ? `Je souhaite en savoir plus sur la formation « ${training.name} ».\n\n` : enquiry?.message || "";
  return <Container><div className="contact-layout"><div className="contact-aside"><SectionLabel>{isTraining ? "NEXT / VOTRE FORMATION" : "NEXT / VOTRE PROJET"}</SectionLabel><h1>Commençons<br />par votre<br /><span className="copper">besoin.</span></h1><p>{isTraining ? "À titre individuel ou pour votre équipe, décrivez vos objectifs, votre niveau et le nombre de participants. Nous préciserons ensemble le parcours adapté." : <>Pas besoin d’un cahier des charges complet.<br />Décrivez votre contexte et ce que vous aimeriez faire avancer.</>}</p><a href={`mailto:${site.email}`} data-analytics="email_clicked">{site.email} ↗</a><div className="contact-next"><span className="mono">ET ENSUITE ?</span><ol><li>Nous prenons connaissance de votre besoin.</li><li>Nous échangeons pour préciser le contexte.</li><li>{isTraining ? "Nous proposons un programme et des modalités adaptés." : "Nous définissons une prochaine étape adaptée."}</li></ol></div></div><ContactForm key={training?.slug || enquiry?.service.slug || (isTraining ? "formation" : "projet")} deliveryEnabled={Boolean(smtpConfig() || process.env.CONTACT_WEBHOOK_URL)} initialProjectType={isTraining ? "Formation" : enquiry?.projectType} initialMessage={initialMessage} /></div><JsonLd data={breadcrumbs([{ name: "Contact", path: "/contact" }])} /></Container>;
}
