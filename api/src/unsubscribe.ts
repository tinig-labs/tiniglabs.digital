import { createHmac, timingSafeEqual } from "node:crypto";

export type List = "waitlist" | "blog";

const LISTS: readonly List[] = ["waitlist", "blog"];

export const SITE_URL = (process.env.SITE_URL ?? "https://tiniglabs.digital").replace(/\/$/, "");

function secret() {
  const value = process.env.UNSUBSCRIBE_SECRET;
  if (!value || value.length < 32) throw new Error("UNSUBSCRIBE_SECRET must be set to at least 32 characters");
  return value;
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

// "<list>:<email>" in base64url, then an HMAC of it. No database needed: the
// token itself says who to unsubscribe from which list, and only we can make one.
export function makeToken(list: List, email: string) {
  const payload = Buffer.from(`${list}:${email}`).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readToken(token: unknown): { list: List; email: string } | null {
  if (typeof token !== "string" || token.length > 1024) return null;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return null;

  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  const decoded = Buffer.from(payload, "base64url").toString("utf8");
  const split = decoded.indexOf(":");
  const list = decoded.slice(0, split) as List;
  const email = decoded.slice(split + 1);
  return split > 0 && LISTS.includes(list) && email ? { list, email } : null;
}

// Each list has its own page: /waitlist/unsubscribe/ and /blog/unsubscribe/
export function unsubscribePage(list: List, token?: string) {
  return `${SITE_URL}/${list}/unsubscribe/${token ? `?t=${encodeURIComponent(token)}` : ""}`;
}

export function unsubscribeLinks(list: List, email: string, inbox: string) {
  const token = makeToken(list, email);
  const page = unsubscribePage(list, token);
  const oneClick = `${SITE_URL}/api/${list}/unsubscribe?t=${token}`;
  return {
    page,
    // RFC 2369 and RFC 8058: mail apps show their own Unsubscribe button from
    // these headers. Gmail and Yahoo POST to the https link in one click.
    headers: {
      "List-Unsubscribe": `<${oneClick}>, <mailto:${inbox}?subject=Unsubscribe%20${encodeURIComponent(email)}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}
