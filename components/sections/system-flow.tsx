"use client";

import { useEffect, useRef, useState } from "react";

export function SystemFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [simplified, setSimplified] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    const update = () => {
      frame = 0;
      if (!visible || preference.matches) return;
      const bounds = element.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -bounds.top / (bounds.height * 0.65)));
      element.style.setProperty("--flow-progress", progress.toFixed(3));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); });
    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); preference.removeEventListener("change", schedule); };
  }, []);
  return <div ref={ref} className={`system-flow ${simplified ? "is-simplified" : ""}`}>
    <div className="system-caption mono"><span><i /> SYSTEM FLOW</span><span>FIG. 001</span></div>
    <svg viewBox="0 0 600 580" className="system-svg" role="img" aria-labelledby="system-title system-description">
      <title id="system-title">De la complexité au système</title><desc id="system-description">Des flux d’entrée, de traitement, d’IA et d’automatisation convergent vers un S géométrique, symbole de SEYA LABS.</desc>
      <defs>
        <linearGradient id="copper-surface" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f59973" /><stop offset=".5" stopColor="#D65A31" /><stop offset="1" stopColor="#9b3d20" /></linearGradient>
        <linearGradient id="mineral-surface" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#44403a" /><stop offset="1" stopColor="#11100e" /></linearGradient>
        <pattern id="system-grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#C9BDAE" strokeWidth=".6" opacity=".4" /></pattern>
      </defs>
      <rect x="25" y="20" width="550" height="520" fill="url(#system-grid)" />
      <g className="construction-lines" fill="none" stroke="#bdb1a0" strokeWidth=".7">
        <path d="M65 183 300 48 535 183V420L300 555 65 420ZM65 183 300 318 535 183M300 318V555M300 48V284M65 420 300 284 535 420" />
        <path d="M30 290H570M300 8V566" strokeDasharray="3 7" />
        <circle cx="300" cy="294" r="209" opacity=".4" />
      </g>
      <g className="flow-connections" fill="none" stroke="#a79480" strokeWidth="1">
        <path d="M66 133H150V199H230M50 358H118V394H200M402 194H472V123H548M392 418H493V465H550" />
        <path d="M86 236H170V308H230M383 333H465V283H555" strokeDasharray="3 5" />
        {[ [66,133], [50,358], [548,123], [550,465], [86,236], [555,283] ].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="3" fill="#F3F0E8" stroke="#D65A31" />)}
      </g>
      <g className="flow-labels" fontSize="10" fill="#5f5b54" fontFamily="monospace">
        <text x="50" y="112">01 / INPUT</text><text x="33" y="339">02 / PROCESS</text><text x="462" y="103">03 / AI</text><text x="444" y="486">04 / OUTPUT</text>
      </g>
      <g className="system-upper">
        <path d="M305 118 465 210V309L425 333V234L265 142Z" fill="#873a22" />
        <path d="M265 142 425 234V333L204 206Q184 193 204 178Z" fill="url(#copper-surface)" />
        <path d="M265 142 305 118 465 210 425 234Z" fill="#f1a181" />
        <path d="M265 142 425 234V333" fill="none" stroke="#f5ad8f" strokeWidth="1" />
      </g>
      <g className="system-lower">
        <path d="M184 251 224 228V281L397 381Q416 391 416 410V445L309 506 269 482 375 421V398L205 300Q184 288 184 269Z" fill="#11100e" />
        <path d="M144 274 184 251V299L358 399Q377 410 377 428V446L269 508V462L160 400Q144 390 144 374Z" fill="url(#mineral-surface)" />
        <path d="M144 274 184 251V299L358 399 397 376 224 275V228L184 251V299" fill="#4c4740" />
        <path d="M144 274V374Q144 390 160 400L269 462V508M184 299 358 399" fill="none" stroke="#797067" strokeWidth=".8" />
      </g>
      <g fill="#D65A31"><circle cx="300" cy="48" r="3" /><circle cx="65" cy="420" r="3" /><circle cx="535" cy="183" r="3" /></g>
      <text x="306" y="565" fontFamily="monospace" fontSize="9" fill="#5f5b54">48°51′ N / 2°21′ E</text>
    </svg>
    <div className="system-bottom"><span className="mono">COMPLEXITY → CLARITY</span><button aria-pressed={simplified} onClick={() => setSimplified(!simplified)}>{simplified ? "Voir les connexions" : "Simplifier le système"}<span aria-hidden="true">↗</span></button></div>
  </div>;
}
