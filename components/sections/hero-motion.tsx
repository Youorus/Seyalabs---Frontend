"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, Check, CheckCheck, FileText, Layers3, Pause, Play, Sparkles, Workflow } from "lucide-react";
import styles from "./hero-motion.module.css";

const scenes = ["Votre besoin", "Notre ingénierie", "Votre système"];
const upperMark = "M320 17 596 178Q626 195 626 230V422L163 150Q127 127 157 101L305 21Q315 13 320 17Z";
const lowerMark = "M139 201V268Q139 294 164 311L490 502Q518 519 518 546V567Q518 590 495 605L319 698V615Q319 605 309 598L44 442Q13 424 13 397V305Q13 279 38 263Z";

function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function SeyaCore() {
  return <svg viewBox="-24 -20 700 800" className={styles.mark} aria-hidden="true">
    <defs>
      <linearGradient id="hero-mark-copper" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#ffe0c5" /><stop offset=".32" stopColor="#ed9c74" /><stop offset=".7" stopColor="#d65a31" /><stop offset="1" stopColor="#8d351e" />
      </linearGradient>
      <linearGradient id="hero-mark-ivory" x1="0" y1="0" x2=".85" y2="1">
        <stop stopColor="#fffaf0" /><stop offset=".45" stopColor="#e5d9c7" /><stop offset="1" stopColor="#a59883" />
      </linearGradient>
    </defs>
    {[24, 18, 12, 6].map((offset) => <g key={offset} transform={`translate(${offset * .55} ${offset})`}>
      <path d={upperMark} fill="#78341f" /><path d={lowerMark} fill="#776957" />
    </g>)}
    <path className={styles.markUpper} d={upperMark} fill="url(#hero-mark-copper)" stroke="#ffccab" strokeWidth="2" />
    <path className={styles.markLower} d={lowerMark} fill="url(#hero-mark-ivory)" stroke="#fff4e2" strokeWidth="2" />
  </svg>;
}

export function HeroMotion() {
  const root = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const playing = !paused && inView && pageVisible && !reducedMotion;
  const displayedScene = reducedMotion ? 2 : scene;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .1 });
    observer.observe(element);
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return <div
    ref={root}
    className={styles.motion}
    data-scene={displayedScene}
    data-playing={playing}
    data-reduced-motion={reducedMotion}
    role="group"
    aria-label="Du besoin au système, une animation SEYA LABS en trois étapes"
  >
    <p className="visually-hidden">Vos idées, vos données et vos outils sont réunis par SEYA LABS pour créer une application métier qui associe logiciel sur mesure, intelligence artificielle et automatisation.</p>

    <div className={styles.film} aria-hidden="true">
      <div className={styles.grain} />
      <div className={styles.halo} />
      <div className={styles.grid} />
      <div className={styles.topline}><span><i /> L’ATELIER SEYA</span><span>DE L’IDÉE AU RÉEL <ArrowUpRight /></span></div>

      <div className={styles.headlines}>
        <p className={styles.headline} data-active={displayedScene === 0}>Tout commence<br />par <em>votre métier.</em></p>
        <p className={styles.headline} data-active={displayedScene === 1}>La bonne technologie.<br /><em>Au bon endroit.</em></p>
        <p className={styles.headline} data-active={displayedScene === 2}>Vos outils.<br /><em>Enfin connectés.</em></p>
      </div>

      <div className={styles.orbit}><div /><div /><div /><i /><i /></div>
      <div className={styles.core}><div className={styles.coreFloat}><SeyaCore /></div><div className={styles.coreShadow} /></div>

      <div className={`${styles.scene} ${styles.inputs}`} data-active={displayedScene === 0}>
        <div className={`${styles.input} ${styles.idea}`}><span className={styles.inputIcon}><Sparkles /></span><span>Une idée<strong>Et si on simplifiait ?</strong></span><i /></div>
        <div className={`${styles.input} ${styles.data}`}><span className={styles.inputIcon}><FileText /></span><span>Vos données<strong>Tout se relie.</strong></span><i /></div>
        <div className={`${styles.input} ${styles.tools}`}><span className={styles.inputIcon}><Layers3 /></span><span>Vos outils<strong>Un nouveau potentiel.</strong></span><i /></div>
        <span className={`${styles.annotation} ${styles.inputNote}`}>LE POINT DE DÉPART : VOUS.</span>
      </div>

      <div className={`${styles.scene} ${styles.engineering}`} data-active={displayedScene === 1}>
        <svg className={styles.connections} viewBox="0 0 560 560" fill="none">
          <path className={styles.connectionBase} d="M115 295H210Q230 295 230 315H280M280 315V275Q280 255 300 255H438M280 315V385Q280 405 300 405H420" />
          <path className={styles.connectionPulse} d="M115 295H210Q230 295 230 315H280M280 315V275Q280 255 300 255H438M280 315V385Q280 405 300 405H420" />
        </svg>
        <div className={`${styles.module} ${styles.software}`}><Layers3 /><span>Logiciel<small>SUR MESURE</small></span></div>
        <div className={`${styles.module} ${styles.ai}`}><Sparkles /><span>Intelligence<small>ARTIFICIELLE</small></span></div>
        <div className={`${styles.module} ${styles.automation}`}><Workflow /><span>Automatisation<small>DES PROCESSUS</small></span></div>
        <span className={`${styles.annotation} ${styles.engineNote}`}>DES BRIQUES. UN SEUL SYSTÈME.</span>
      </div>

      <div className={`${styles.scene} ${styles.delivery}`} data-active={displayedScene === 2}>
        <div className={styles.application}>
          <div className={styles.appBar}><span><i /><i /><i /></span><span>VOTRE ESPACE MÉTIER</span><Layers3 /></div>
          <div className={styles.appBody}>
            <div className={styles.appSidebar}><span className={styles.appMiniLogo}>s.</span><i /><i /><i /><i /><span /></div>
            <div className={styles.appContent}>
              <div className={styles.appHeading}><div><small>UNE VUE D’ENSEMBLE</small><strong>Bonjour, votre équipe.</strong></div><span><i /> Tout est synchronisé</span></div>
              <div className={styles.appWidgets}><div><span>Votre activité</span><div className={styles.chart}>{[35, 58, 43, 76, 60, 88, 72, 96].map((height, index) => <i key={index} style={{ "--bar-height": `${height}%`, "--bar-index": index } as CSSProperties} />)}</div></div><div className={styles.appConnected}><Workflow /><span>Vos flux<br /><strong>en mouvement.</strong></span><div><i /><i /><i /><i /><i /></div></div></div>
              <div className={styles.appTasks}>{["Demande centralisée", "Traitement assisté par l’IA", "Équipe notifiée"].map((task, index) => <div className={styles.appTask} key={task} style={{ "--task-index": index } as CSSProperties}><span><Check size={10} /></span>{task}<CheckCheck size={12} /></div>)}</div>
            </div>
          </div>
        </div>
        <div className={styles.deliveryBadge}><span><Check /></span><div>Pensé pour vous.<strong>Prêt à avancer.</strong></div><ArrowUpRight /></div>
        <span className={`${styles.annotation} ${styles.deliveryNote}`}>ILLUSTRATION D’UNE APPLICATION MÉTIER</span>
      </div>

      <div className={styles.filmFooter}><span>SOFTWARE × AI × AUTOMATION</span><span className={styles.frameCounter}>0{displayedScene + 1} <i>/ 03</i></span></div>
    </div>

    <div className={styles.controls}>
      <div className={styles.chapters} aria-label="Étapes de l’animation">
        {scenes.map((label, index) => <button key={label} type="button" className={styles.chapter} aria-label={`Voir l’étape ${index + 1} : ${label}`} aria-pressed={displayedScene === index} disabled={reducedMotion} onClick={() => { setScene(index); setPaused(false); }}>
          <span className={styles.chapterTrack}><i onAnimationEnd={() => {
            if (!reducedMotion && index === scene) setScene((current) => (current + 1) % scenes.length);
          }} /></span><span><small>0{index + 1}</small>{label}</span>
        </button>)}
      </div>
      <button className={styles.pause} type="button" onClick={() => setPaused((value) => !value)} aria-label={reducedMotion ? "Animation désactivée selon vos préférences de mouvement" : paused ? "Reprendre l’animation" : "Mettre l’animation en pause"} aria-pressed={paused} disabled={reducedMotion}>
        {paused || reducedMotion ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
      </button>
    </div>
  </div>;
}
