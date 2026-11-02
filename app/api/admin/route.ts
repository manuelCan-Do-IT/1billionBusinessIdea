import { env } from "cloudflare:workers";
import { isAdmin } from "../../../lib/admin-session";

export const dynamic = "force-dynamic";

type Row = {
  id: string; problem: string; desired_change: string; frequency: string;
  benefit: string; current_way: string; locale: string; created_at: string;
};

const columns: (keyof Row)[] = ["created_at", "problem", "desired_change", "frequency", "benefit", "current_way", "locale"];

function csvCell(value: string) {
  // Prefix spreadsheet formula starters so untrusted free text stays text on CSV open.
  const safe = /^[\s]*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  if (!await isAdmin()) return Response.json({ error: "Accès refusé." }, { status: 401 });
  if (!env.DB) return Response.json({ error: "Base indisponible." }, { status: 503 });

  const url = new URL(request.url);
  if (url.searchParams.get("format") === "csv") {
    const result = await env.DB.prepare("SELECT * FROM responses ORDER BY created_at DESC LIMIT 10000").all<Row>();
    const csv = "\uFEFF" + columns.join(",") + "\r\n" + result.results.map(row => columns.map(key => csvCell(String(row[key] ?? ""))).join(",")).join("\r\n");
    return new Response(csv, {
      headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": "attachment; filename=idees-utiles-reponses.csv", "cache-control": "no-store" },
    });
  }

  const page = Math.max(1, Math.min(200, Number.parseInt(url.searchParams.get("page") || "1", 10) || 1));
  const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM responses").first<{ total: number }>();
  const result = await env.DB.prepare("SELECT * FROM responses ORDER BY created_at DESC, id DESC LIMIT 30 OFFSET ?").bind((page - 1) * 30).all<Row>();
  return Response.json({ total: count?.total ?? 0, page, rows: result.results }, { headers: { "cache-control": "no-store" } });
}
