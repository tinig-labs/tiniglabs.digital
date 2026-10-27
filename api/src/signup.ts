import { ROLES, blogConfirmation, waitlistConfirmation, type Role } from "./emails";
import { sendMail, type Mail } from "./mailer";
import { isRateLimited } from "./rate-limit";
import { addSubscriber, removeSubscriber } from "./subscribers";
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

  return subscribe("waitlist", email, () => waitlistConfirmation(email, role), role);
}

export async function subscribeToBlog(input: Input, ip: string): Promise<SignupResult> {
  if (input.website) return { ok: true };
  const email = cleanEmail(input.email);
  if (!email) return INVALID;
  if (isRateLimited("blog", ip)) return TOO_MANY;

  return subscribe("blog", email, () => blogConfirmation(email));
}

export async function unsubscribe(list: List, token: unknown): Promise<SignupResult> {
  const failed: SignupResult = { ok: false, status: 503, error: "Couldn't unsubscribe you right now. Try again in a few minutes." };
  let target;
  try {
    target = readToken(token);
  } catch (err) {
    console.error("[unsubscribe] can't verify token", err);
    return failed;
  }
  // Each list's endpoint only accepts that list's links
  if (!target || target.list !== list) return { ok: false, status: 400, error: "This unsubscribe link isn't valid." };

  try {
    await removeSubscriber(list, target.email);
    return { ok: true };
  } catch (err) {
    console.error(`[${list}] can't remove subscriber`, err);
    return failed;
  }
}

// Saving the subscriber is what counts, so only a database failure fails the
// form. The confirmation email is sent after, and its failure is only logged.
async function subscribe(list: List, email: string, compose: () => Mail, role?: Role): Promise<SignupResult> {
  let confirmation;
  try {
    confirmation = compose();
  } catch (err) {
    console.error(`[${list}] can't compose confirmation`, err);
    return UNAVAILABLE;
  }

  try {
    await addSubscriber(list, email, role);
  } catch (err) {
    console.error(`[${list}] can't save subscriber`, err);
    return UNAVAILABLE;
  }

  try {
    await sendMail(confirmation);
  } catch (err) {
    console.error(`[${list}] confirmation email failed`, err);
  }
  return { ok: true };
}
