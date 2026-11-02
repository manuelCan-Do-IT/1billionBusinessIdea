import { env } from "cloudflare:workers";

const frequencies = new Set(["daily", "weekly", "monthly", "occasionally"]);
const benefits = new Set(["time", "money", "less-stress", "easier-access", "other"]);

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Format invalide." }, { status: 415 });
  }

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    if (payload.website) return Response.json({ ok: true });

    const id = typeof payload.id === "string" ? payload.id : "";
    const problem = typeof payload.problem === "string" ? payload.problem.trim() : "";
    const desiredChange = typeof payload.desiredChange === "string" ? payload.desiredChange.trim() : "";
    const currentWay = typeof payload.currentWay === "string" ? payload.currentWay.trim() : "";
    const frequency = typeof payload.frequency === "string" ? payload.frequency : "";
    const benefit = typeof payload.benefit === "string" ? payload.benefit : "";
    const locale = payload.locale === "en" ? "en" : "fr";

    if (!/^[0-9a-f-]{36}$/i.test(id) || problem.length < 8 || problem.length > 1200 ||
        desiredChange.length < 8 || desiredChange.length > 1200 || currentWay.length > 600 ||
        !frequencies.has(frequency) || !benefits.has(benefit)) {
      return Response.json({ error: "Merci de compléter les questions demandées." }, { status: 400 });
    }

    if (!env.DB) throw new Error("Database unavailable");
    await env.DB.prepare(
      "INSERT INTO responses (id, problem, desired_change, frequency, benefit, current_way, locale) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING"
    ).bind(id, problem, desiredChange, frequency, benefit, currentWay, locale).run();
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    const detail = process.env.NODE_ENV === "development" && error instanceof Error
      ? error.message : "L'envoi a échoué. Réessayez dans un instant.";
    return Response.json({ error: detail }, { status: 500 });
  }
}
