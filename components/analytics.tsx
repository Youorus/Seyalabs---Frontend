"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { analyticsEnabled, isAnalyticsEvent, track } from "@/lib/analytics";
import { consentKey, readConsent, saveConsent, type ConsentChoice, type ConsentRecord } from "@/lib/consent";
import { sendAnalyticsEvent, sendPageView, startAnalytics, stopAnalytics } from "@/lib/google-analytics";
import { startTagManager, stopTagManager } from "@/lib/google-tag-manager";

export function Analytics() {
  const pathname = usePathname();
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!analyticsEnabled) return;
    function sync() {
      const choice = readConsent();
      if (choice?.analytics !== "granted") { stopAnalytics(); stopTagManager(); }
      setRecord(choice);
      setVisible(!choice);
    }
    queueMicrotask(sync);
    function onStorage(event: StorageEvent) { if (event.key === consentKey || event.key === null) sync(); }
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics]") : null;
      if (isAnalyticsEvent(target?.dataset.analytics)) track(target.dataset.analytics);
    }
    function onEvent(event: Event) {
      const detail = (event as CustomEvent).detail;
      if (isAnalyticsEvent(detail?.event)) sendAnalyticsEvent(detail.event);
    }
    function onPreferences() {
      setAnalytics(readConsent()?.analytics === "granted");
      dialog.current?.showModal();
    }
    function onVisibility() { if (document.visibilityState === "visible") sync(); }
    const timer = window.setInterval(sync, 30_000);
    document.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("storage", onStorage);
    window.addEventListener("seya:privacy", onPreferences);
    window.addEventListener("seya:analytics", onEvent);
    window.addEventListener("focus", sync);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("seya:privacy", onPreferences);
      window.removeEventListener("seya:analytics", onEvent);
      window.removeEventListener("focus", sync);
    };
  }, []);

  useEffect(() => {
    if (!analyticsEnabled || record?.analytics !== "granted") return;
    let current = true;
    // Le conteneur de balises part en même temps que la mesure, et sous la
    // même condition. Il ne bloque pas la page vue si Google ne répond pas.
    void startTagManager();
    void startAnalytics().then((ready) => {
      if (!current || !ready) return;
      sendPageView(pathname);
      if (/^\/(expertises|solutions)\//.test(pathname)) track("service_viewed");
      if (/^\/realisations\//.test(pathname)) track("case_study_viewed");
    });
    return () => { current = false; };
  }, [pathname, record?.analytics]);

  function choose(choice: ConsentChoice) {
    if (choice === "denied") { stopAnalytics(); stopTagManager(); }
    const saved = saveConsent(choice);
    if (!saved) { stopAnalytics(); stopTagManager(); }
    setStorageError(!saved);
    setRecord(saved);
    setVisible(false);
    dialog.current?.close();
  }
  function customise() { setAnalytics(readConsent()?.analytics === "granted"); dialog.current?.showModal(); }
  if (!analyticsEnabled) return null;
  return <>
    {visible && <aside className="consent-banner" aria-labelledby="cookies-title">
      <span className="mono">VOTRE CHOIX / VOS DONNÉES</span>
      <h2 id="cookies-title">Les cookies, à votre mesure.</h2>
      <p>Avec votre accord, Google Analytics nous aide à comprendre les pages consultées et à améliorer le site. Vous pouvez refuser et continuer à naviguer, puis changer d’avis via « Gérer les cookies » en bas de page.</p>
      <Link href="/confidentialite#cookies" className="consent-details">Cookies, durées et destinataires</Link>
      <div className="consent-actions"><button className="button button-outline" onClick={() => choose("denied")}>Tout refuser</button><button className="button button-outline" onClick={() => choose("granted")}>Tout accepter</button><button className="button button-outline" onClick={customise}>Personnaliser</button></div>
    </aside>}
    <dialog ref={dialog} className="cookie-dialog" aria-labelledby="cookie-dialog-title" aria-describedby="cookie-dialog-description">
      <div className="cookie-dialog-heading"><span className="mono">PRÉFÉRENCES DE CONFIDENTIALITÉ</span><button type="button" className="cookie-close" aria-label="Fermer les préférences" onClick={() => dialog.current?.close()}>×</button></div>
      <h2 id="cookie-dialog-title">Vous gardez le choix.</h2>
      <p id="cookie-dialog-description">Votre choix est conservé six mois sur ce navigateur. Vous pouvez le modifier à tout moment. Refuser la mesure d’audience ne limite pas l’accès au site.</p>
      <div className="cookie-category"><div><h3>Fonctionnement nécessaire</h3><p>Le stockage local mémorise votre choix. Il ne sert pas à mesurer votre navigation.</p></div><span className="cookie-required">Toujours actif</span></div>
      <div className="cookie-category"><label htmlFor="cookie-analytics"><strong>Mesure d’audience · Google Analytics</strong><span>Pages consultées et interactions avec nos services, pour améliorer le site. Facultatif, sans les informations saisies dans le formulaire. Aucun cookie publicitaire ajouté par le site.</span></label><input id="cookie-analytics" type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></div>
      <Link href="/confidentialite#cookies" className="consent-details">Lire la politique de confidentialité</Link>
      <div className="consent-actions"><button className="button button-outline" onClick={() => choose("denied")}>Tout refuser</button><button className="button button-outline" onClick={() => choose("granted")}>Tout accepter</button><button className="button button-dark" onClick={() => choose(analytics ? "granted" : "denied")}>Enregistrer mes choix</button></div>
    </dialog>
    {storageError && <p className="cookie-storage-error" role="status">Votre navigateur ne permet pas de mémoriser votre choix. La mesure d’audience reste désactivée.</p>}
  </>;
}
