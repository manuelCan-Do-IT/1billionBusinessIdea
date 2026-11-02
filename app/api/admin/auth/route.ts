import { env } from "cloudflare:workers";
import { cookies } from "next/headers";
import { sessionValue } from "../../../../lib/admin-session";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const code = env.SURVEY_ADMIN_CODE;
  if (!code) return Response.json({ error: "Administration indisponible." }, { status: 503 });
  const payload = (await request.json().catch(() => null)) as { code?: unknown } | null;
  if (typeof payload?.code !== "string" || payload.code !== code) {
    return Response.json({ error: "Code incorrect." }, { status: 401 });
  }
  const cookieStore = await cookies();
  cookieStore.set("survey_admin", await sessionValue(code), {
    httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 60 * 60 * 24 * 7,
  });
  return Response.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set("survey_admin", "", {
    httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 0,
  });
  return Response.json({ ok: true });
}

