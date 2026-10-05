import { notFound } from "next/navigation";
import { expertises, getService } from "@/data/services";
import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return expertises.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = getService("expertises", slug); if (!service) notFound();
  return pageMetadata(service.seoTitle, service.description, `/expertises/${slug}`);
}
export default async function Expertise({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = getService("expertises", slug); if (!service) notFound(); return <ServicePage service={service} />;
}
