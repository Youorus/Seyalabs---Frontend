"use client";

import { useEffect, useRef, useState } from "react";
import type { AnimationPlaybackControls } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { processSteps } from "@/data/process";

export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const interacted = useRef(false);
  function select(index: number) { interacted.current = true; setActive(index); }
  useEffect(() => {
    if (!interacted.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = document.getElementById(`process-panel-${active}`);
    if (!panel) return;
    let cancelled = false;
    let controls: AnimationPlaybackControls | undefined;
    void import("framer-motion/dom/mini").then(({ animate }) => {
      if (!cancelled) controls = animate(panel, { opacity: [0.5, 1], transform: ["translateY(8px)", "translateY(0px)"] }, { duration: 0.35, ease: "easeOut" });
    }).catch(() => { /* Content stays fully usable if optional motion cannot load. */ });
    return () => { cancelled = true; controls?.stop(); };
  }, [active]);
  return <div className="process-timeline"><div className="process-tabs" role="tablist" aria-label="Les étapes de notre méthode">
    {processSteps.map((step, i) => <button key={step.number} role="tab" id={`process-tab-${i}`} aria-controls={`process-panel-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => select(i)} onKeyDown={(event) => {
      const next = event.key === "ArrowRight" ? (i + 1) % 4 : event.key === "ArrowLeft" ? (i + 3) % 4 : event.key === "Home" ? 0 : event.key === "End" ? 3 : null;
      if (next !== null) { event.preventDefault(); select(next); document.getElementById(`process-tab-${next}`)?.focus(); }
    }}><span className="mono">{step.number}</span><span>{step.label}</span><ArrowUpRight size={18} aria-hidden="true" /></button>)}
  </div>{processSteps.map((step, i) => <div key={step.number} id={`process-panel-${i}`} role="tabpanel" aria-labelledby={`process-tab-${i}`} hidden={active !== i} tabIndex={0} className="process-panel">
    <span className="process-big-number" aria-hidden="true">{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p><span className="process-deliverable"><span className="mono">LIVRABLE /</span> {step.deliverable}</span></div>
  </div>)}</div>;
}
