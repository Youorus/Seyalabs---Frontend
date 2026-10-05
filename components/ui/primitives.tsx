import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}

export function SectionLabel({ number, children, className = "" }: { number?: string; children: ReactNode; className?: string }) {
  return <p className={`section-label ${className}`}>{number && <span>{number} /</span>} {children}</p>;
}

export function Button({ children, href = "/contact", variant = "primary", event, className = "" }: {
  children: ReactNode; href?: string; variant?: "primary" | "dark" | "outline"; event?: string; className?: string;
}) {
  return <Link href={href} className={`button button-${variant} ${className}`} data-analytics={event}>
    <span>{children}</span><ArrowUpRight size={18} aria-hidden="true" />
  </Link>;
}

export function LinkArrow({ children, href, className = "" }: { children: ReactNode; href: string; className?: string }) {
  return <Link href={href} className={`link-arrow ${className}`}><span>{children}</span><ArrowRight size={18} aria-hidden="true" /></Link>;
}

export function Tag({ children }: { children: ReactNode }) { return <span className="tag">{children}</span>; }

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" aria-label="SEYA LABS, accueil" className={`brand ${light ? "brand-light" : ""}`}>
    <svg viewBox="0 0 640 720" aria-hidden="true" className="brand-mark">
      <path d="M320 17 596 178Q626 195 626 230V422L163 150Q127 127 157 101L305 21Q315 13 320 17ZM139 201V268Q139 294 164 311L490 502Q518 519 518 546V567Q518 590 495 605L319 698V615Q319 605 309 598L44 442Q13 424 13 397V305Q13 279 38 263Z" fill="currentColor" />
    </svg><span>SEYA{" "}<span className="brand-labs">LABS</span></span>
  </Link>;
}
