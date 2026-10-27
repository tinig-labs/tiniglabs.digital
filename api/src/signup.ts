import { ROLES, blogEmails, unsubscribeRecord, waitlistEmails, type Role } from "./emails";
import { sendMail, type Mail } from "./mailer";
import { isRateLimited } from "./rate-limit";
import { readToken, type List } from "./unsubscribe";

export type SignupResult = { ok: true } | { ok: false; status: number; error: string };

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

function cleanEmail(raw: unknown) {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  return email.length <= 254 && EMAIL_RE.test(email) ? email : null;
}

const INVALID: SignupResult = { ok: false, status: 400, error: "Check your email. It should look like name@example.com." };
const TOO_MANY: SignupResult = { ok: false, status: 429, error: "Too many attempts. Wait a few minutes and try again." };
const UNAVAILABLE: SignupResult = { ok: false, status: 503, error: "Couldn't sign you up right now. Try again in a few minutes." };

export type Input = { email?: unknown; role?: unknown; website?: unknown };

export async function joinWaitlist(input: Input, ip: string): Promise<SignupResult> {
  // Bots fill the hidden "website" field; pretend it worked
  if (input.website) return { ok: true };
  const email = cleanEmail(input.email);
  if (!email) return INVALID;
  const role = typeof input.role === "string" && Object.hasOwn(ROLES, input.role) ? (input.role as Role) : undefined;
  if (!role) return { ok: false, status: 400, error: "Choose how you're joining." };
  if (isRateLimited("waitlist", ip)) return TOO_MANY;

  return deliver("waitlist", () => waitlistEmails(email, role));
}

export async function subscribeToBlog(input: Input, ip: string): Promise<SignupResult> {
  if (input.website) return { ok: true };
  const email = cleanEmail(input.email);
  if (!email) return INVALID;
  if (isRateLimited("blog", ip)) return TOO_MANY;

  return deliver("blog", () => blogEmails(email));
}

// There's no database: an unsubscribe is a record in the list's inbox, and
// that address gets removed from the list kept there
export async function unsubscribe(list: List, token: unknown): Promise<SignupResult> {
  let target;
  try {
    target = readToken(token);
  } catch (err) {
    console.error("[unsubscribe] can't verify token", err);
    return { ok: false, status: 503, error: "Couldn't unsubscribe you right now. Try again in a few minutes." };
  }
  // Each list's endpoint only accepts that list's links
  if (!target || target.list !== list) return { ok: false, status: 400, error: "This unsubscribe link isn't valid." };

  try {
    await sendMail(unsubscribeRecord(target.list, target.email));
    return { ok: true };
  } catch (err) {
    console.error("[unsubscribe] record email failed", err);
    return { ok: false, status: 503, error: "Couldn't unsubscribe you right now. Try again in a few minutes." };
  }
}

// The record copy is what keeps the signup, so only its failure fails the form
async function deliver(form: string, compose: () => { record: Mail; confirmation: Mail }): Promise<SignupResult> {
  let emails;
  try {
    emails = compose();
  } catch (err) {
    console.error(`[${form}] can't compose emails`, err);
    return UNAVAILABLE;
  }
  const [saved, confirmed] = await Promise.allSettled([sendMail(emails.record), sendMail(emails.confirmation)]);
  if (confirmed.status === "rejected") console.error(`[${form}] confirmation email failed`, confirmed.reason);
  if (saved.status === "rejected") {
    console.error(`[${form}] record email failed`, saved.reason);
    return UNAVAILABLE;
  }
  return { ok: true };
}
