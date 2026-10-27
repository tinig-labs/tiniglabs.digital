import { EmailClient } from "@azure/communication-email";

// ACS only sends, and only as DoNotReply. Every other address is a Zoho Mail
// inbox: each form's inbox receives its signup records and replies to its
// confirmations (through Reply-To).
export const SENDER_ADDRESS = process.env.SENDER_EMAIL ?? "DoNotReply@tiniglabs.digital";
export const WAITLIST_ADDRESS = process.env.WAITLIST_EMAIL ?? "waitlist@tiniglabs.digital";
export const BLOG_ADDRESS = process.env.BLOG_EMAIL ?? "subscribe@tiniglabs.digital";

let client: EmailClient | undefined;

function getClient() {
  const connectionString = process.env.ACS_CONNECTION_STRING;
  if (!connectionString) throw new Error("ACS_CONNECTION_STRING is not set");
  client ??= new EmailClient(connectionString);
  return client;
}

export type Mail = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  headers?: Record<string, string>;
};

// Resolves once ACS has accepted the message. Delivery itself is asynchronous.
export async function sendMail({ from, to, subject, html, text, replyTo, headers }: Mail) {
  await getClient().beginSend({
    senderAddress: from,
    recipients: { to: [{ address: to }] },
    replyTo: replyTo ? [{ address: replyTo }] : undefined,
    content: { subject, plainText: text, html },
    headers,
    disableUserEngagementTracking: true,
  });
}
