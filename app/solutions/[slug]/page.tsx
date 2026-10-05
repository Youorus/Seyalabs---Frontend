import { notFound } from "next/navigation";
import { solutions, getService } from "@/data/services";
import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return solutions.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = getService("solutions", slug); if (!service) notFound();
  return pageMetadata(service.seoTitle, service.description, `/solutions/${slug}`);
}
export default async function Solution({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = getService("solutions", slug); if (!service) notFound(); return <ServicePage service={service} />;
}
