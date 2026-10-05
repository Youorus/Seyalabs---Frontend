"use client";

import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand, Button, Container } from "@/components/ui/primitives";
import { navigation, site } from "@/lib/site";

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  return <header className="site-header"><Container className="header-inner">
    <Brand />
    <nav aria-label="Navigation principale" className="desktop-nav">
      {navigation.map((item) => <Link key={item.href} href={item.href} prefetch={false} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>{item.label}</Link>)}
    </nav>
    <Button variant="dark" className="header-cta">Démarrer un projet</Button>
    <button className="menu-toggle" aria-label="Ouvrir le menu" aria-haspopup="dialog" aria-controls="mobile-menu" onClick={() => dialog.current?.showModal()}><Menu size={25} /></button>
    <dialog ref={dialog} id="mobile-menu" className="mobile-menu" aria-label="Menu de navigation">
      <div className="mobile-menu-top"><Brand /><button aria-label="Fermer le menu" className="menu-close" onClick={() => dialog.current?.close()} autoFocus><X size={28} /></button></div>
      <nav aria-label="Navigation mobile">{navigation.map((item, i) => <Link key={item.href} href={item.href} prefetch={false} onClick={() => dialog.current?.close()}><span className="mono">0{i + 1}</span>{item.label}<ArrowUpRight size={25} /></Link>)}</nav>
      <Link className="button button-primary" href="/contact" onClick={() => dialog.current?.close()}>Démarrer un projet<ArrowUpRight size={18} /></Link>
      <a className="mobile-email" href={`mailto:${site.email}`} data-analytics="email_clicked">{site.email}</a>
      <p className="mono">PARIS, FRANCE / SOFTWARE × AI × AUTOMATION</p>
    </dialog>
  </Container></header>;
}
