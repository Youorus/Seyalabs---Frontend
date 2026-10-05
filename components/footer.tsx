import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand, Container } from "@/components/ui/primitives";
import { navigation, site } from "@/lib/site";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";

export function Footer() {
  return <footer className="site-footer"><Container>
    <div className="footer-top"><div><Brand /><p>Software × AI × Automation</p><span className="mono">PARIS, FRANCE</span></div>
      <nav aria-label="Navigation de pied de page">{navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
      <div className="footer-contact"><span className="mono">UNE CONVERSATION POUR COMMENCER.</span><a href={`mailto:${site.email}`} data-analytics="email_clicked">{site.email}<ArrowUpRight size={18} aria-hidden="true" /></a><div className="socials">
        {site.linkedin && <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>}{site.github && <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
      </div></div>
    </div>
    <nav className="footer-software" aria-label="Logiciels métier et ressources"><Link href="/expertises/developpement-logiciel">Développement logiciel sur mesure</Link><Link href="/solutions/application-metier">Applications métier</Link><Link href="/insights/budget-application-metier">Budget d’une application</Link><Link href="/insights/cahier-des-charges-application-metier">Modèle de cahier des charges</Link></nav>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} SEYA LABS</span><span className="footer-signature mono">BUILT WITH INTENT.</span><div><Link href="/mentions-legales">Mentions légales</Link><Link href="/confidentialite">Confidentialité</Link><CookiePreferencesButton /></div></div>
  </Container></footer>;
}
