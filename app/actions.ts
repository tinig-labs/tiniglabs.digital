"use server";

import { BLOG_ADDRESS, WAITLIST_ADDRESS, sendMail } from "./_server/mailer";
import { isRateLimited } from "./_server/rate-limit";

export type Role = "developer" | "specialist" | "supporter";
export type SignupResult = { ok: true } | { ok: false; error: string };

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

const INVALID = "Check your email. It should look like name@example.com.";
const TOO_MANY = "Too many attempts. Wait a few minutes and try again.";

type Input = { email: string; website?: string };

export async function joinWaitlist(input: Input & { role: Role }): Promise<SignupResult> {
  // Bots fill the hidden "website" field; pretend it worked
  if (input.website) return { ok: true };
  const email = cleanEmail(input.email);
  if (!email) return { ok: false, error: INVALID };
  const role = Object.hasOwn(ROLE_NEXT, input.role) ? ROLE_NEXT[input.role] : undefined;
  if (!role) return { ok: false, error: "Choose how you're joining." };
  if (await isRateLimited("waitlist")) return { ok: false, error: TOO_MANY };

  return deliver("waitlist", {
    record: {
      from: WAITLIST_ADDRESS,
      to: WAITLIST_ADDRESS,
      replyTo: email,
      subject: `Waitlist: ${role.label}, ${email}`,
      text: `New waitlist signup.\n\nEmail: ${email}\nRole: ${role.label}\nTime: ${new Date().toISOString()}`,
    },
    confirmation: {
      from: WAITLIST_ADDRESS,
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

export async function subscribeToBlog(input: Input): Promise<SignupResult> {
  if (input.website) return { ok: true };
  const email = cleanEmail(input.email);
  if (!email) return { ok: false, error: INVALID };
  if (await isRateLimited("blog")) return { ok: false, error: TOO_MANY };

  return deliver("blog", {
    record: {
      from: BLOG_ADDRESS,
      to: BLOG_ADDRESS,
      replyTo: email,
      subject: `Blog subscriber: ${email}`,
      text: `New blog subscriber.\n\nEmail: ${email}\nTime: ${new Date().toISOString()}`,
    },
    confirmation: {
      from: BLOG_ADDRESS,
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

type Mail = Parameters<typeof sendMail>[0];

// The record copy is what keeps the signup, so only its failure fails the form
async function deliver(form: string, { record, confirmation }: { record: Mail; confirmation: Mail }): Promise<SignupResult> {
  const [saved, confirmed] = await Promise.allSettled([sendMail(record), sendMail(confirmation)]);
  if (confirmed.status === "rejected") console.error(`[${form}] confirmation email failed`, confirmed.reason);
  if (saved.status === "rejected") {
    console.error(`[${form}] record email failed`, saved.reason);
    return { ok: false, error: "Couldn't sign you up right now. Try again in a few minutes." };
  }
  return { ok: true };
}
