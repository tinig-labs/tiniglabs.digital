import { BLOG_ADDRESS, SENDER_ADDRESS, WAITLIST_ADDRESS, sendMail, type Mail } from "./mailer";
import { isRateLimited } from "./rate-limit";

export type SignupResult = { ok: true } | { ok: false; status: number; error: string };

type Role = "developer" | "specialist" | "supporter";

const ROLE_NEXT: Record<Role, { label: string; next: string }> = {
  developer: { label: "Developer", next: "You'll hear first when the dataset and model are ready." },
  specialist: { label: "Specialist", next: "We'll ask you to review how recordings are made and labeled." },
  supporter: { label: "Supporter", next: "You'll get an update when each milestone ships." },
};

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

function cleanEmail(raw: unknown) {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  return email.length <= 254 && EMAIL_RE.test(email) ? email : null;
}

const INVALID: SignupResult = { ok: false, status: 400, error: "Check your email. It should look like name@example.com." };
const TOO_MANY: SignupResult = { ok: false, status: 429, error: "Too many attempts. Wait a few minutes and try again." };

export type Input = { email?: unknown; role?: unknown; website?: unknown };

export async function joinWaitlist(input: Input, ip: string): Promise<SignupResult> {
  // Bots fill the hidden "website" field; pretend it worked
  if (input.website) return { ok: true };
  const email = cleanEmail(input.email);
  if (!email) return INVALID;
  const role = typeof input.role === "string" && Object.hasOwn(ROLE_NEXT, input.role) ? ROLE_NEXT[input.role as Role] : undefined;
  if (!role) return { ok: false, status: 400, error: "Choose how you're joining." };
  if (isRateLimited("waitlist", ip)) return TOO_MANY;

  return deliver("waitlist", {
    record: {
      from: SENDER_ADDRESS,
      to: WAITLIST_ADDRESS,
      replyTo: email,
      subject: `Waitlist: ${role.label}, ${email}`,
      text: `New waitlist signup.\n\nEmail: ${email}\nRole: ${role.label}\nTime: ${new Date().toISOString()}`,
    },
    confirmation: {
      from: SENDER_ADDRESS,
      to: email,
      replyTo: WAITLIST_ADDRESS,
      subject: "You're on the tinig labs waitlist",
      text: [
        `Thanks for joining the tinig labs waitlist as a ${role.label.toLowerCase()}.`,
        role.next,
        "Didn't sign up? Reply to this email and we'll remove you.",
        "tinig labs",
      ].join("\n\n"),
    },
  });
}

export async function subscribeToBlog(input: Input, ip: string): Promise<SignupResult> {
  if (input.website) return { ok: true };
  const email = cleanEmail(input.email);
  if (!email) return INVALID;
  if (isRateLimited("blog", ip)) return TOO_MANY;

  return deliver("blog", {
    record: {
      from: SENDER_ADDRESS,
      to: BLOG_ADDRESS,
      replyTo: email,
      subject: `Blog subscriber: ${email}`,
      text: `New blog subscriber.\n\nEmail: ${email}\nTime: ${new Date().toISOString()}`,
    },
    confirmation: {
      from: SENDER_ADDRESS,
      to: email,
      replyTo: BLOG_ADDRESS,
      subject: "You're subscribed to talâ",
      text: [
        "Thanks for subscribing to talâ, the tinig labs blog.",
        "Nothing is published yet. The first post will come straight to your inbox.",
        "Want to unsubscribe, or didn't sign up? Reply to this email and we'll remove you.",
        "tinig labs",
      ].join("\n\n"),
    },
  });
}

// The record copy is what keeps the signup, so only its failure fails the form
async function deliver(form: string, { record, confirmation }: { record: Mail; confirmation: Mail }): Promise<SignupResult> {
  const [saved, confirmed] = await Promise.allSettled([sendMail(record), sendMail(confirmation)]);
  if (confirmed.status === "rejected") console.error(`[${form}] confirmation email failed`, confirmed.reason);
  if (saved.status === "rejected") {
    console.error(`[${form}] record email failed`, saved.reason);
    return { ok: false, status: 503, error: "Couldn't sign you up right now. Try again in a few minutes." };
  }
  return { ok: true };
}
