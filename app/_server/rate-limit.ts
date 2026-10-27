import "server-only";
import { headers } from "next/headers";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Per-instance memory. Good enough to stop a single client hammering the
// forms; scale-out instances each keep their own count.
const hits = new Map<string, number[]>();

async function clientIp() {
  const h = await headers();
  // App Service sets X-Client-IP; X-Forwarded-For entries there include a port
  const raw = h.get("x-client-ip") ?? h.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  return raw.trim().replace(/:\d+$/, "");
}

export async function isRateLimited(bucket: string) {
  const key = `${bucket}:${await clientIp()}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 10_000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}
