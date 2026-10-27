import { app, type HttpRequest, type HttpResponseInit } from "@azure/functions";
import { unsubscribe } from "../signup";
import { unsubscribePage, type List } from "../unsubscribe";

// One endpoint per list: /api/waitlist/unsubscribe and /api/blog/unsubscribe.
// POST: the one-click request from a mail app's Unsubscribe button (RFC 8058,
// form-encoded "List-Unsubscribe=One-Click"), or the button on the list's page.
// GET: someone opened the link directly. Link scanners also send GETs, so a
// GET never unsubscribes; it sends the person to the page with the button.
function unsubscribeEndpoint(list: List) {
  return async (request: HttpRequest): Promise<HttpResponseInit> => {
    let token = request.query.get("t");

    if (request.method === "GET") {
      return { status: 303, headers: { Location: unsubscribePage(list, token ?? undefined) } };
    }

    if (!token) {
      const raw = await request.text();
      try {
        token = (request.headers.get("content-type") ?? "").includes("application/json")
          ? (JSON.parse(raw) as { token?: string }).token ?? null
          : new URLSearchParams(raw).get("t");
      } catch {
        token = null;
      }
    }

    const result = await unsubscribe(list, token);
    return result.ok
      ? { status: 200, jsonBody: { ok: true } }
      : { status: result.status, jsonBody: { ok: false, error: result.error } };
  };
}

for (const list of ["waitlist", "blog"] as const) {
  app.http(`${list}-unsubscribe`, {
    route: `${list}/unsubscribe`,
    methods: ["GET", "POST"],
    authLevel: "anonymous",
    handler: unsubscribeEndpoint(list),
  });
}
