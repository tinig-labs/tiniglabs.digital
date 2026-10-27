const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Per-instance memory. Good enough to stop a single client hammering the
// forms; scaled-out Function instances each keep their own count.
const hits = new Map<string, number[]>();

// Static Web Apps passes the client address in X-Forwarded-For, sometimes with a port
export function clientIp(headers: Headers) {
  const raw = headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-client-ip") || "unknown";
  const bracketed = raw.match(/^\[([^\]]+)\]/); // [IPv6]:port
  if (bracketed) return bracketed[1];
  return raw.split(":").length === 2 ? raw.replace(/:\d+$/, "") : raw; // IPv4:port
}

export function isRateLimited(bucket: string, ip: string) {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 10_000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}
