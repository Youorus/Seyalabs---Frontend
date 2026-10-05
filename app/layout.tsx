import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/ui/primitives";
import { site } from "@/lib/site";
import { robotsMetadata } from "@/lib/seo";
import "@/styles/globals.css";

const space = localFont({ src: "../public/fonts/space-grotesk.woff2", variable: "--font-heading", weight: "300 700", display: "swap" });
const inter = localFont({ src: "../public/fonts/inter.woff2", variable: "--font-body", weight: "100 900", display: "swap" });
const mono = localFont({ src: "../public/fonts/geist-mono.woff2", variable: "--font-mono", weight: "100 900", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: { default: "SEYA LABS — Software × AI × Automation", template: "%s | SEYA LABS" },
  description: site.description, applicationName: site.name, creator: site.name,
  robots: robotsMetadata(),
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  icons: { icon: "/icon.svg", apple: "/brand/apple-icon.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F3F0E8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" data-scroll-behavior="smooth" className={`${space.variable} ${inter.variable} ${mono.variable}`}><body>
    <a href="#main" className="skip-link">Aller au contenu</a>
    <Header /><main id="main">{children}</main><Footer /><Analytics />
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name,
        url: site.url, logo: `${site.url}/brand/logo-mark.svg`, email: site.email, description: site.description,
        areaServed: { "@type": "Country", name: "France" },
        sameAs: [site.linkedin, site.github].filter(Boolean) },
      { "@type": "WebSite", "@id": `${site.url}/#website`, name: site.name, url: site.url, inLanguage: "fr-FR", publisher: { "@id": `${site.url}/#organization` } },
    ] }} />
  </body></html>;
}
