import { Button, Container, SectionLabel } from "@/components/ui/primitives";

export function FinalCta() {
  return <section className="final-cta"><Container>
    <SectionLabel number="NEXT">CONSTRUISONS LA SUITE</SectionLabel>
    <div className="cta-grid"><h2>Un problème à<br />transformer en<br /><span>produit ?</span></h2><div><p>Tout commence par votre besoin.<br />Parlons de ce qui pourrait mieux fonctionner.</p><Button>Parlons-en</Button><span className="mono cta-note">DE VOTRE IDÉE À LA PRODUCTION.</span></div></div>
    <svg className="cta-watermark" viewBox="0 0 640 720" aria-hidden="true"><path d="M320 17 596 178Q626 195 626 230V422L163 150Q127 127 157 101L305 21Q315 13 320 17ZM139 201V268Q139 294 164 311L490 502Q518 519 518 546V567Q518 590 495 605L319 698V615Q319 605 309 598L44 442Q13 424 13 397V305Q13 279 38 263Z" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
  </Container></section>;
}
