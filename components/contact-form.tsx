"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { budgets, contactSchema, emailBody, projectTypes, timelines, type ProjectType } from "@/lib/contact-schema";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

type FieldName = "name" | "company" | "email" | "phone" | "projectType" | "budget" | "timeline" | "message" | "consent";
export function ContactForm({ deliveryEnabled, initialProjectType, initialMessage = "" }: { deliveryEnabled: boolean; initialProjectType?: ProjectType; initialMessage?: string }) {
  const startedAt = useRef<number | null>(null);
  const started = useRef(false);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "email" | "error">("idle");
  const [message, setMessage] = useState("");
  const [mailto, setMailto] = useState("");
  const [prepared, setPrepared] = useState("");
  const [copied, setCopied] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const [projectType, setProjectType] = useState<ProjectType | "">(initialProjectType || "");
  const isTraining = projectType === "Formation";
  function begin() { if (!started.current) { startedAt.current = Date.now(); started.current = true; track("contact_started"); } }
  const fieldProps = (name: FieldName) => ({ id: name, name, "aria-invalid": errors[name] ? true as const : undefined, "aria-describedby": errors[name] ? `${name}-error` : undefined });
  const error = (name: FieldName) => errors[name] ? <span id={`${name}-error`} className="field-error">{errors[name]}</span> : null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const result = contactSchema.safeParse({ ...Object.fromEntries(values), consent: values.get("consent") === "on", startedAt: startedAt.current || Date.now() });
    if (!result.success) {
      const nextErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of result.error.issues) { const field = issue.path[0] as FieldName; if (!nextErrors[field]) nextErrors[field] = issue.message; }
      setErrors(nextErrors); setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    const bodyText = emailBody(result.data);
    const subject = result.data.projectType === "Formation" ? `Formation — ${result.data.company}` : `Projet ${result.data.projectType} — ${result.data.company}`;
    const email = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    setPrepared(bodyText); setCopied(false); setShowCopy(false);
    setMailto(email);
    if (!deliveryEnabled) { setStatus("email"); return; }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result.data), signal: AbortSignal.timeout(20000) });
      const body = await response.json();
      if (!response.ok) { setMessage(body.error || "L’envoi n’a pas abouti. Vous pouvez nous écrire par email."); setStatus("error"); return; }
      setStatus("success"); track("contact_submitted"); form.reset(); setProjectType(initialProjectType || ""); started.current = false; startedAt.current = null;
    } catch { setMessage("L’envoi n’a pas pu être confirmé. Vos informations sont conservées dans ce formulaire. Vous pouvez nous écrire par email."); setStatus("error"); }
  }

  async function copy() { try { await navigator.clipboard.writeText(prepared); setCopied(true); } catch { setShowCopy(true); } }

  return <form onSubmit={submit} onFocus={begin} noValidate aria-label={isTraining ? "Décrire votre besoin de formation" : "Décrire votre projet"}>
    <p className="form-required">Les champs marqués d’un astérisque sont obligatoires.</p>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Site web</label><input name="website" id="website" tabIndex={-1} autoComplete="off" /></div>
    <fieldset className="form-section"><legend><span className="mono">01 /</span>Faisons connaissance.</legend><div className="form-grid">
      <div className="form-field"><label htmlFor="name">Votre nom *</label><input {...fieldProps("name")} autoComplete="name" maxLength={100} required />{error("name")}</div>
      <div className="form-field"><label htmlFor="company">Entreprise *</label><input {...fieldProps("company")} autoComplete="organization" maxLength={150} required />{error("company")}</div>
      <div className="form-field"><label htmlFor="email">Email professionnel *</label><input {...fieldProps("email")} type="email" autoComplete="email" maxLength={254} required />{error("email")}</div>
      <div className="form-field"><label htmlFor="phone">Téléphone <span>— facultatif</span></label><input {...fieldProps("phone")} type="tel" autoComplete="tel" maxLength={30} />{error("phone")}</div>
    </div></fieldset>
    <fieldset className="form-section"><legend><span className="mono">02 /</span>{isTraining ? "Préparons votre formation." : "Parlons de votre besoin."}</legend><div className="form-grid">
      <div className="form-field form-full"><label htmlFor="projectType">Type de demande *</label><select {...fieldProps("projectType")} value={projectType} onChange={(event) => setProjectType(event.target.value as ProjectType)} required><option value="" disabled>Sélectionnez un type de demande</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select>{error("projectType")}</div>
      <div className="form-field"><label htmlFor="budget">Budget indicatif *</label><select {...fieldProps("budget")} defaultValue="" required><option value="" disabled>Sélectionnez un budget</option>{budgets.map((budget) => <option key={budget}>{budget}</option>)}</select>{error("budget")}</div>
      <div className="form-field"><label htmlFor="timeline">{isTraining ? "Période souhaitée *" : "Horizon de lancement *"}</label><select {...fieldProps("timeline")} defaultValue="" required><option value="" disabled>Quand souhaitez-vous commencer ?</option>{timelines.map((timeline) => <option key={timeline}>{timeline}</option>)}</select>{error("timeline")}</div>
      <div className="form-field form-full"><label htmlFor="message">{isTraining ? "Vos objectifs de formation *" : "Votre besoin, avec vos mots *"}</label><textarea {...fieldProps("message")} defaultValue={initialMessage} placeholder={isTraining ? "Le sujet, les objectifs, le nombre de participants, leur niveau actuel et les outils concernés…" : "Ce qui pourrait mieux fonctionner, les outils que vous utilisez, ce que vous souhaitez construire…"} rows={5} minLength={20} maxLength={5000} required />{error("message")}</div>
    </div></fieldset>
    <div><label className="consent-field" htmlFor="consent"><input {...fieldProps("consent")} type="checkbox" required /><span>J’accepte que SEYA LABS utilise ces informations pour répondre à ma demande. J’ai pris connaissance de la <Link href="/confidentialite">politique de confidentialité</Link>. *</span></label>{error("consent")}</div>
    <div className="form-submit"><button type="submit" disabled={status === "sending"} className="button button-primary">{status === "sending" ? "Envoi en cours…" : isTraining ? "Envoyer ma demande" : "Envoyer mon projet"}<ArrowUpRight size={18} aria-hidden="true" /></button><p>{deliveryEnabled ? "Vos informations servent uniquement à traiter votre demande." : "Votre demande sera préparée pour un envoi depuis votre messagerie."}</p></div>
    <div aria-live="polite" aria-atomic="true">{status === "success" && <div className="form-message"><Check size={18} aria-hidden="true" /> Votre demande a bien été transmise. Merci, nous reviendrons vers vous à l’adresse indiquée.</div>}{status === "email" && <div className="form-message">Votre demande est prête. <a href={mailto} data-analytics="email_clicked">Ouvrir mon email pour finaliser l’envoi ↗</a><br />L’envoi doit être confirmé dans votre messagerie. Vous pouvez aussi écrire directement à <a href={`mailto:${site.email}`}>{site.email}</a>.</div>}{status === "error" && <div className="form-message" role="alert">{message}<br /><a href={mailto} data-analytics="email_clicked">Envoyer ma demande par email ↗</a></div>}{(status === "email" || status === "error") && <div className="email-copy"><button type="button" onClick={copy}>{copied ? "Demande copiée ✓" : "Copier ma demande"}</button>{showCopy && <label>Copiez ce texte dans votre email :<textarea readOnly value={prepared} rows={8} onFocus={(event) => event.currentTarget.select()} /></label>}</div>}</div>
  </form>;
}
