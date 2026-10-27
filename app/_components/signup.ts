// Client side of the signup forms. The endpoints are Azure Functions in api/,
// served by Static Web Apps on the same origin.

export type Role = "developer" | "specialist" | "supporter";
export type SignupResult = { ok: true } | { ok: false; error: string };

type Body = { email: string; website: string; role?: Role };

export async function postSignup(endpoint: "waitlist" | "subscribe", body: Body): Promise<SignupResult> {
  const res = await fetch(`/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => null)) as SignupResult | null;
  if (data && typeof data.ok === "boolean") return data;
  return { ok: false, error: "Couldn't sign you up right now. Try again in a few minutes." };
}
