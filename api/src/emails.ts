import { renderEmail } from "./email-template";
import { BLOG_ADDRESS, SENDER_ADDRESS, WAITLIST_ADDRESS, type Mail } from "./mailer";
import { unsubscribeLinks, type List } from "./unsubscribe";

export type Role = "developer" | "specialist" | "supporter";

export const ROLES: Record<Role, { label: string; next: string }> = {
  developer: { label: "Developer", next: "You'll hear first when the dataset and model are ready." },
  specialist: { label: "Specialist", next: "We'll ask you to review how recordings are made and labeled." },
  supporter: { label: "Supporter", next: "You'll get an update when each milestone ships." },
};

const INBOX: Record<List, string> = { waitlist: WAITLIST_ADDRESS, blog: BLOG_ADDRESS };
const LIST_NAME: Record<List, string> = { waitlist: "the tinig labs waitlist", blog: "talâ, the tinig labs blog" };

// Emails to subscribers carry an unsubscribe link and the headers that make
// mail apps show their own Unsubscribe button. Replies go to the list's Zoho inbox.
function toSubscriber(list: List, email: string, subject: string, content: Parameters<typeof renderEmail>[0]): Mail {
  const unsubscribe = unsubscribeLinks(list, email, INBOX[list]);
  return {
    from: SENDER_ADDRESS,
    to: email,
    replyTo: INBOX[list],
    subject,
    headers: unsubscribe.headers,
    ...renderEmail({ ...content, unsubscribeUrl: unsubscribe.page }),
  };
}

export function waitlistConfirmation(email: string, role: Role) {
  const { label, next } = ROLES[role];
  return toSubscriber("waitlist", email, "You're on the tinig labs waitlist", {
    preheader: next,
    heading: "You're on the waitlist.",
    paragraphs: [
      `Thanks for joining as a ${label.toLowerCase()}. tinig labs is an independent lab releasing open models, datasets, and tools for the Philippines, starting with speech that today's AI gets wrong.`,
    ],
    panel: { title: label, body: next },
    reason: `You're getting this because ${email} joined ${LIST_NAME.waitlist}. Didn't sign up, or want to stop?`,
  });
}

export function blogConfirmation(email: string) {
  return toSubscriber("blog", email, "You're subscribed to talâ", {
    preheader: "The first post will come straight to your inbox.",
    heading: "You're subscribed.",
    paragraphs: ["Thanks for subscribing to talâ, the tinig labs blog. It's where we'll write up what we learn, from collecting data to releasing models."],
    panel: { title: "talâ", body: "Nothing is published yet. The first post will come straight to your inbox." },
    reason: `You're getting this because ${email} subscribed to ${LIST_NAME.blog}. Didn't sign up, or want to stop?`,
  });
}
