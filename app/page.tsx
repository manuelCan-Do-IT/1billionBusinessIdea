"use client";

import { useEffect, useRef, useState } from "react";
import { CollageSide } from "./CollageSide";
import { FarewellSticker } from "./FarewellSticker";

type Locale = "fr" | "en";
type FormData = { problem: string; desiredChange: string; currentWay: string; frequency: string; benefit: string; website: string };
type VoiceField = "problem" | "desiredChange" | "currentWay";
type RecognitionResult = { isFinal: boolean; 0: { transcript: string } };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };
type Recognition = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void; stop: () => void; abort: () => void;
};
type RecognitionWindow = Window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
const empty: FormData = { problem: "", desiredChange: "", currentWay: "", frequency: "", benefit: "", website: "" };
function newId() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const h = Array.from(bytes, n => n.toString(16).padStart(2, "0")).join("");
  return h.slice(0,8) + "-" + h.slice(8,12) + "-" + h.slice(12,16) + "-" + h.slice(16,20) + "-" + h.slice(20);
}

const copy = {
  fr: {
    brand:"ET SI ON SIMPLIFIAIT LA VIE ?", language:"English", duration:"2 MIN · ANONYME",
    introKicker:"J’AIMERAIS VOUS ÉCOUTER", introTitle:"Et si vos journées devenaient", introAccent:"plus simples ?",
    introBody:"Au travail, à la maison, dans vos démarches ou ailleurs : qu’est-ce qui vous prend du temps, vous fatigue ou vous complique la vie ? Racontez-moi une situation avec vos mots.",
    introNote:"Je m’appelle Emmanuel. Je cherche des solutions scientifiques ou informatiques utiles, en partant de ce que vous vivez vraiment.",
    start:"Je raconte", section:"VOTRE HISTOIRE", step:"Question", of:"sur", contexts:["Au quotidien","Au travail","Et ailleurs"],
    q1:"Qu’est-ce qui vous complique la vie aujourd’hui ?",
    h1:"Au travail, chez vous ou ailleurs. Racontez un moment précis, même tout simple.",
    p1:"Il m’arrive souvent de…",
    q2:"Si vous pouviez changer une chose, ce serait quoi ?",
    h2:"Dites-moi ce qui vous soulagerait ou vous aiderait vraiment. Pas besoin de savoir comment y arriver.",
    p2:"Ce qui me ferait du bien, ce serait…",
    q3:"Juste pour mieux comprendre",
    h3:"Encore 2 petites questions, et c’est terminé.",
    frequency:"À quelle fréquence cela vous arrive-t-il ?", benefit:"Quel serait le principal avantage ?",
    currentWay:"Comment faites-vous aujourd’hui ?", optional:"Facultatif", currentPlaceholder:"Une méthode, une personne, un outil… Si le prix ou la complexité vous gêne, dites-le aussi.",
    voiceStart:"Dicter ma réponse", voiceStop:"Arrêter la dictée", voiceListening:"Je vous écoute… Parlez naturellement.",
    voiceReview:"Texte ajouté. Vous pouvez le relire ou le corriger.", voiceFinishing:"Je termine la transcription…",
    voiceHint:"La dictée peut utiliser le service vocal de votre navigateur. Relisez avant l’envoi.",
    voiceUnavailable:"La dictée n’est pas disponible ici. Si votre clavier a un micro, vous pouvez l’utiliser.",
    voiceDenied:"Le micro n’est pas autorisé. Vous pouvez écrire votre réponse.",
    voiceNoSpeech:"Je n’ai rien entendu. Réessayez ou écrivez votre réponse.",
    voiceFailed:"La dictée n’a pas fonctionné. Vous pouvez réessayer ou écrire votre réponse.",
    frequencies:[["daily","Tous les jours"],["weekly","Chaque semaine"],["monthly","Chaque mois"],["occasionally","De temps en temps"]],
    benefits:[["time","Gagner du temps"],["money","Économiser de l’argent"],["less-stress","Éviter du stress"],["easier-access","Accéder plus facilement à quelque chose"],["other","Autre avantage"]],
    back:"Revenir", next:"La suite", send:"Envoyer", sending:"Envoi…",
    privacy:"Aucun nom ou numéro demandé. Évitez d’écrire des informations personnelles ou sensibles.",
    required:"Écrivez au moins 8 caractères pour continuer.", select:"Choisissez une réponse pour chaque question.",
    error:"L’envoi n’a pas fonctionné. Votre réponse est encore ici : réessayez.",
    doneKicker:"BIEN REÇU !", doneTitle:"Merci de m’avoir raconté.", farewellThanks:"MERCI !", farewellBye:"À bientôt !",
    doneBody:"J’ai bien reçu votre réponse. Votre expérience m’aidera à imaginer quelque chose qui compte vraiment.",
    another:"Raconter autre chose", footer:"Les meilleures idées partent de la vraie vie.",
  },
  en: {
    brand:"WHAT IF WE MADE LIFE EASIER?", language:"Français", duration:"2 MIN · ANONYMOUS",
    introKicker:"I’D LOVE TO HEAR FROM YOU", introTitle:"What would make your days", introAccent:"a little easier?",
    introBody:"At work, at home, while handling errands, or anywhere else: what takes too much time, wears you out, or makes life harder? Tell me about one moment in your own words.",
    introNote:"I'm Emmanuel. I explore practical scientific or digital solutions, starting with what people actually experience.",
    start:"Tell me", section:"YOUR STORY", step:"Question", of:"of", contexts:["Everyday life","Work","And beyond"],
    q1:"What makes life harder for you right now?",
    h1:"At work, at home, or elsewhere. Tell me about a specific moment, however small.",
    p1:"I often find myself…",
    q2:"If you could change one thing, what would it be?",
    h2:"Tell me what would really help or bring you some relief. You don't need to know how to make it happen.",
    p2:"What would make a difference is…",
    q3:"Just to understand a little better",
    h3:"Two quick questions, and you're done.",
    frequency:"How often does this happen?", benefit:"What would be the main benefit?",
    currentWay:"How do you manage it today?", optional:"Optional", currentPlaceholder:"A method, a person, a tool… If cost or complexity gets in the way, tell me that too.",
    voiceStart:"Speak my answer", voiceStop:"Stop dictation", voiceListening:"I'm listening… Speak naturally.",
    voiceReview:"Text added. You can review or edit it.", voiceFinishing:"Finishing the transcription…",
    voiceHint:"Dictation may use your browser's speech service. Review the text before sending.",
    voiceUnavailable:"Dictation isn't available here. If your keyboard has a microphone, you can use it.",
    voiceDenied:"Microphone access wasn't allowed. You can type your answer.",
    voiceNoSpeech:"I couldn't hear anything. Try again or type your answer.",
    voiceFailed:"Dictation didn't work. You can try again or type your answer.",
    frequencies:[["daily","Every day"],["weekly","Every week"],["monthly","Every month"],["occasionally","Now and then"]],
    benefits:[["time","Save time"],["money","Save money"],["less-stress","Reduce stress"],["easier-access","Make something easier to access"],["other","Something else"]],
    back:"Go back", next:"Next", send:"Send", sending:"Sending…",
    privacy:"No name or phone number required. Please avoid sharing personal or sensitive information.",
    required:"Write at least 8 characters to continue.", select:"Choose one answer for each question.",
    error:"Your response was not sent. It's still here; please try again.",
    doneKicker:"RECEIVED!", doneTitle:"Thank you for sharing.", farewellThanks:"THANK YOU!", farewellBye:"See you!",
    doneBody:"I received your response. Your experience will help me imagine something that truly matters.",
    another:"Share another story", footer:"The best ideas begin with real life.",
  },
} as const;

export default function Home() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(empty);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [voiceSupported, setVoiceSupported] = useState<boolean | null>(null);
  const [listeningField, setListeningField] = useState<VoiceField | null>(null);
  const [voiceFinishing, setVoiceFinishing] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");
  const recognitionRef = useRef<Recognition | null>(null);
  const t = copy[locale];

  useEffect(() => {
    const browser = window as RecognitionWindow;
    setVoiceSupported(Boolean(browser.SpeechRecognition || browser.webkitSpeechRecognition));
    return () => recognitionRef.current?.abort();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [step]);

  function update(key: keyof FormData, value: string) {
    setForm(previous => ({ ...previous, [key]: value }));
    setError("");
  }

  function dictate(field: VoiceField) {
    if (listeningField === field) {
      setVoiceFinishing(true);
      setVoiceMessage(t.voiceFinishing);
      recognitionRef.current?.stop();
      return;
    }
    if (listeningField) return;
    const browser = window as RecognitionWindow;
    const SpeechRecognition = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!SpeechRecognition) return setVoiceMessage(t.voiceUnavailable);

    const recognition = new SpeechRecognition();
    let heard = false;
    let failed = false;
    recognition.lang = locale === "fr" ? "fr-FR" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = event => {
      const words: string[] = [];
      for (let index = event.resultIndex; index < event.results.length; index++) {
        const result = event.results[index];
        if (result?.isFinal) words.push(result[0]?.transcript || "");
      }
      const transcript = words.join(" ").trim();
      if (!transcript) return;
      heard = true;
      setForm(previous => {
        const existing = previous[field].trimEnd();
        const maxLength = field === "currentWay" ? 600 : 1200;
        return { ...previous, [field]: (existing + (existing ? " " : "") + transcript).slice(0, maxLength) };
      });
      setError("");
      setVoiceMessage(t.voiceReview);
    };
    recognition.onerror = event => {
      failed = true;
      setVoiceMessage(event.error === "not-allowed" || event.error === "service-not-allowed"
        ? t.voiceDenied : event.error === "no-speech" ? t.voiceNoSpeech : t.voiceFailed);
    };
    recognition.onend = () => {
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
        setListeningField(null);
        setVoiceFinishing(false);
        if (!heard && !failed) setVoiceMessage(t.voiceNoSpeech);
      }
    };
    try {
      recognitionRef.current = recognition;
      recognition.start();
      setListeningField(field);
      setVoiceMessage(t.voiceListening);
    } catch {
      recognitionRef.current = null;
      setListeningField(null);
      setVoiceMessage(t.voiceFailed);
    }
  }

  function voiceControl(field: VoiceField) {
    if (voiceSupported === null) return null;
    if (!voiceSupported) return <p className="voice-unavailable">{t.voiceUnavailable}</p>;
    const listening = listeningField === field;
    return <div className="voice-control">
      <button className={"voice-button " + (listening ? "is-listening" : "")} type="button"
        aria-pressed={listening} onClick={() => dictate(field)} disabled={voiceFinishing}>
        <span className="mic-badge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21m-4 0h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
        {listening ? t.voiceStop : t.voiceStart}
        {listening && <span className="sound-wave" aria-hidden="true"><i/><i/><i/></span>}
      </button>
      <span className="voice-message" role="status">{voiceMessage || t.voiceHint}</span>
    </div>;
  }

  async function advance() {
    if (listeningField) return;
    if (step === 1 && form.problem.trim().length < 8) return setError(t.required);
    if (step === 2 && form.desiredChange.trim().length < 8) return setError(t.required);
    if (step === 3) {
      if (!form.frequency || !form.benefit) return setError(t.select);
      setSending(true); setError("");
      try {
        const id = submissionId || newId();
        if (!submissionId) setSubmissionId(id);
        const response = await fetch("/api/respond", {
          method:"POST", headers:{"content-type":"application/json"},
          body:JSON.stringify({ ...form, locale, id }),
        });
        if (!response.ok) {
          const detail = await response.json().catch(() => null) as { error?: string } | null;
          throw new Error(detail?.error || "submit failed");
        }
        setStep(4);
      } catch (reason) { setError(process.env.NODE_ENV === "development" && reason instanceof Error ? reason.message : t.error); }
      finally { setSending(false); }
      return;
    }
    setError(""); setVoiceMessage(""); setStep(step + 1);
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a href="/" className="brand" aria-label="Accueil"><span className="brand-mark" aria-hidden="true">?</span><span>{t.brand}</span></a>
        <button className="language" type="button" onClick={() => { recognitionRef.current?.abort(); recognitionRef.current = null; setListeningField(null); setVoiceFinishing(false); setVoiceMessage(""); setLocale(locale === "fr" ? "en" : "fr"); setError(""); }}>{t.language} <span aria-hidden="true">↗</span></button>
      </header>
      <div className={"main-grid" + (step === 4 ? " is-done" : "")}>
        <CollageSide side="left" />
        <section className="survey-card" aria-live="polite">
          {step === 0 ? (
            <>
              <div className="poster-top"><div className="eyebrow">{t.introKicker}</div><div className="time-sticker"><strong>2</strong><span>MIN</span></div></div>
              <h1 className="hero-title">{t.introTitle} <em>{t.introAccent}</em></h1>
              <p className="lead">{t.introBody}</p>
              <div className="context-row">{t.contexts.map((context, index) => <span key={context} className={"context-tag context-" + index}>{context}</span>)}</div>
              <div className="note"><span className="note-number" aria-hidden="true">↳</span><p>{t.introNote}</p></div>
              <div className="intro-actions"><button className="primary" type="button" onClick={advance}>{t.start}<span className="button-arrow" aria-hidden="true">→</span></button><span className="duration">{t.duration}</span></div>
            </>
          ) : step === 4 ? (
            <div className="success">
              <FarewellSticker thanks={t.farewellThanks} bye={t.farewellBye} />
              <div className="eyebrow">{t.doneKicker}</div>
              <h1>{t.doneTitle}</h1>
              <p className="lead">{t.doneBody}</p>
              <button className="secondary" type="button" onClick={() => { setForm(empty); setSubmissionId(""); setStep(0); setError(""); setVoiceMessage(""); }}>{t.another} <span aria-hidden="true">→</span></button>
            </div>
          ) : (
            <>
              <div className="step-head"><span className="eyebrow">{t.section}</span><span className="step-count">{t.step} {step} {t.of} 3</span></div>
              <div className="progress-track" aria-label={t.step + " " + step + " " + t.of + " 3"}><span style={{ width: (step / 3 * 100) + "%" }} /></div>
              <h1 className="question-title">{step === 1 ? t.q1 : step === 2 ? t.q2 : t.q3}</h1>
              <p className="helper">{step === 1 ? t.h1 : step === 2 ? t.h2 : t.h3}</p>
              {step === 1 && <><div className="field"><label htmlFor="problem" className="visually-hidden">{t.q1}</label><textarea id="problem" autoFocus maxLength={1200} placeholder={t.p1} value={form.problem} onChange={e => update("problem", e.target.value)} /><span className="field-count">{form.problem.length} / 1200</span></div>{voiceControl("problem")}</>}
              {step === 2 && <><div className="field"><label htmlFor="change" className="visually-hidden">{t.q2}</label><textarea id="change" autoFocus maxLength={1200} placeholder={t.p2} value={form.desiredChange} onChange={e => update("desiredChange", e.target.value)} /><span className="field-count">{form.desiredChange.length} / 1200</span></div>{voiceControl("desiredChange")}</>}
              {step === 3 && <div className="details">
                <fieldset><legend>{t.frequency}</legend><div className="choices">{t.frequencies.map(([value, label]) => <label className={"choice " + (form.frequency === value ? "selected" : "")} key={value}><input type="radio" name="frequency" value={value} checked={form.frequency === value} onChange={() => update("frequency", value)} /><span className="choice-dot" />{label}</label>)}</div></fieldset>
                <fieldset><legend>{t.benefit}</legend><div className="choices">{t.benefits.map(([value, label]) => <label className={"choice " + (form.benefit === value ? "selected" : "")} key={value}><input type="radio" name="benefit" value={value} checked={form.benefit === value} onChange={() => update("benefit", value)} /><span className="choice-dot" />{label}</label>)}</div></fieldset>
                <div className="short-field"><label htmlFor="current">{t.currentWay} <span>{t.optional}</span></label><textarea id="current" rows={3} maxLength={600} placeholder={t.currentPlaceholder} value={form.currentWay} onChange={e => update("currentWay", e.target.value)} />{voiceControl("currentWay")}</div>
              </div>}
              <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => update("website", e.target.value)} /></div>
              {error && <p className="error" role="alert">{error}</p>}
              <div className="form-actions"><button className="back" type="button" disabled={Boolean(listeningField)} onClick={() => { setStep(step - 1); setError(""); setVoiceMessage(""); }}>{t.back}</button><button className="primary" type="button" onClick={advance} disabled={sending || Boolean(listeningField)}>{sending ? t.sending : step === 3 ? t.send : t.next}<span className="button-arrow" aria-hidden="true">→</span></button></div>
              <p className="privacy">{t.privacy}</p>
            </>
          )}
        </section>
        <CollageSide side="right" />
      </div>
      <footer className="footer"><span>© {new Date().getFullYear()} · {t.brand}</span><span>{t.footer} · {t.duration}</span></footer>
    </main>
  );
}
