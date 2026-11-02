"use client";

import { useCallback, useEffect, useState } from "react";

type Row = {
  id:string; problem:string; desired_change:string; frequency:string;
  benefit:string; current_way:string; locale:string; created_at:string;
};
type Results = { total:number; page:number; rows:Row[] };

const freq:Record<string,string> = { daily:"Tous les jours", weekly:"Chaque semaine", monthly:"Chaque mois", occasionally:"De temps en temps" };
const benefit:Record<string,string> = { time:"Temps", money:"Argent", "less-stress":"Moins de stress", "easier-access":"Accès facilité", other:"Autre" };

export default function ResultsPage() {
  const [code, setCode] = useState("");
  const [loggedIn, setLoggedIn] = useState<boolean|null>(null);
  const [results, setResults] = useState<Results|null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (requestedPage:number) => {
    const response = await fetch("/api/admin?page=" + requestedPage, { cache:"no-store" });
    if (response.status === 401) { setLoggedIn(false); return; }
    if (!response.ok) { setError("Impossible de charger les réponses."); return; }
    setResults(await response.json());
    setLoggedIn(true); setError("");
  }, []);
  useEffect(() => { void load(page); }, [page, load]);

  async function signIn(event:React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/admin/auth", {
        method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({code}),
      });
      if (!response.ok) throw new Error("invalid");
      setCode(""); await load(1); setPage(1);
    } catch { setError("Code incorrect ou connexion indisponible."); }
    finally { setLoading(false); }
  }
  async function signOut() {
    await fetch("/api/admin/auth", { method:"DELETE" });
    setResults(null); setLoggedIn(false);
  }

  return <main className="admin-shell">
    <header className="admin-header"><a className="brand" href="/"><span className="brand-mark" aria-hidden="true">?</span><span>ET SI ON SIMPLIFIAIT LA VIE ?</span></a><span>RÉSULTATS</span></header>
    {loggedIn === null ? <p>Chargement…</p> : loggedIn === false ? (
      <section className="admin-login">
        <div className="eyebrow">ESPACE PRIVÉ</div><h1>Voir les réponses</h1>
        <p className="helper">Entrez votre code d’accès pour consulter et exporter les idées reçues.</p>
        <form onSubmit={signIn}>
          <label htmlFor="admin-code">Code d’accès</label>
          <input id="admin-code" type="password" autoComplete="current-password" value={code} onChange={e => setCode(e.target.value)} required />
          <button className="primary" disabled={loading} type="submit">{loading ? "Ouverture…" : "Ouvrir les résultats"} <span aria-hidden="true">↗</span></button>
        </form>
        {error && <p className="error" role="alert">{error}</p>}
      </section>
    ) : (
      <section className="admin-content">
        <div className="admin-title"><div><div className="eyebrow">VOTRE ENQUÊTE</div><h1>Les idées reçues</h1><p className="helper">Chaque réponse décrit un problème réel et le changement attendu.</p></div><button className="back" onClick={signOut}>Se déconnecter</button></div>
        <div className="admin-toolbar"><div className="admin-count"><strong>{results?.total ?? "—"}</strong><span>réponse{results?.total === 1 ? "" : "s"}</span></div><a className="secondary" href="/api/admin?format=csv" download>Exporter en CSV <span aria-hidden="true">↗</span></a></div>
        {error && <p className="error" role="alert">{error}</p>}
        {results?.rows.length === 0 && <div className="empty-results">Aucune réponse pour l’instant. Le lien du questionnaire est prêt à être partagé.</div>}
        <div className="response-list">{results?.rows.map((row, index) => <article className="response-card" key={row.id}>
          <div className="response-meta"><span>#{(page - 1) * 30 + index + 1}</span><time>{new Date(row.created_at + "Z").toLocaleDateString("fr-FR", {day:"2-digit",month:"short",year:"numeric"})}</time><span>{row.locale.toUpperCase()}</span></div>
          <div className="response-section"><span>DIFFICULTÉ</span><p>{row.problem}</p></div>
          <div className="response-section"><span>CHANGEMENT SOUHAITÉ</span><p>{row.desired_change}</p></div>
          {row.current_way && <div className="response-section"><span>AUJOURD’HUI</span><p>{row.current_way}</p></div>}
          <div className="response-tags"><span>{freq[row.frequency] || row.frequency}</span><span>{benefit[row.benefit] || row.benefit}</span></div>
        </article>)}</div>
        {(results?.total ?? 0) > 30 && <div className="pagination"><button disabled={page === 1} onClick={() => setPage(page - 1)}>Précédent</button><span>Page {page} / {Math.ceil((results?.total ?? 0) / 30)}</span><button disabled={page * 30 >= (results?.total ?? 0)} onClick={() => setPage(page + 1)}>Suivant</button></div>}
      </section>
    )}
  </main>;
}
