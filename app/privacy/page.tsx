import type { Metadata } from "next";
import { Brand } from "../_components/brand";
import { A, LegalPage, List, Mail, P, Section } from "../_components/legal";

const title = "Privacy Policy";
const description = "What tinig labs collects when you join the waitlist or subscribe to the blog, and what it does with it.";

export const metadata: Metadata = {
  title: `${title} | tinig labs`,
  description,
  alternates: { canonical: "/privacy/" },
  openGraph: { type: "website", siteName: "tinig labs", title, description, url: "/privacy/" },
  twitter: { card: "summary", title, description },
};

const CONTACT = "waitlist@tiniglabs.digital";

// Keep in sync with api/src/signup.ts and api/src/rate-limit.ts
const DATA = [
  {
    what: "Email address and role",
    when: "You join the waitlist",
    why: "To send the updates for the role you picked",
    kept: "Until you ask to be removed",
  },
  {
    what: "Email address",
    when: "You subscribe to the blog",
    why: "To send new posts",
    kept: "Until you unsubscribe",
  },
  {
    what: "IP address",
    when: "You submit either form",
    why: "To block repeated automated signups",
    kept: "10 minutes, in server memory only",
  },
  {
    what: "Request details: IP address, browser, pages visited",
    when: "You load any page",
    why: "Our host needs them to serve the site and keep it secure",
    kept: "As set by Microsoft Azure",
  },
];

const COLS = [
  { key: "when", label: "When" },
  { key: "why", label: "Why" },
  { key: "kept", label: "How long" },
] as const;

function DataTable() {
  return (
    <div className="rounded-[28px] bg-[var(--mint)] p-3">
      <div className="rounded-[20px] bg-white px-6 py-2 sm:px-8">
        <table className="w-full text-left">
          <caption className="sr-only">Data tinig labs collects</caption>
          <thead className="hidden md:table-header-group">
            <tr className="text-sm text-[var(--abo)]">
              <th scope="col" className="py-4 pr-6 font-medium">What we collect</th>
              {COLS.map((c) => (
                <th key={c.key} scope="col" className="py-4 pr-6 font-medium last:pr-0">{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DATA.map((row) => (
              <tr key={row.what} className="block border-t border-[var(--tinta)]/10 py-5 first:border-t-0 md:table-row md:py-0 md:first:border-t">
                <th scope="row" className="block pb-2 align-top text-lg font-semibold leading-snug md:table-cell md:w-[28%] md:py-5 md:pr-6 md:text-base">
                  {row.what}
                </th>
                {COLS.map((c) => (
                  <td key={c.key} className="block py-1 align-top leading-relaxed text-[var(--tinta)]/80 md:table-cell md:py-5 md:pr-6 md:last:pr-0">
                    <span className="mr-2 text-sm text-[var(--abo)] md:hidden">{c.label}:</span>
                    {row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="px-6 pb-3 pt-5 font-medium text-[var(--pandan)] sm:px-8">
        No cookies, no analytics, and no open or click tracking in our emails.
      </p>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title={title}
      updated="October 27, 2026"
      lede={<>This page explains what <Brand /> collects, why, and how to have it deleted. We collect as little as we can.</>}
      summary={<DataTable />}
    >
      <Section id="who" title="Who we are">
        <P>
          <Brand /> is an independent lab run by one developer, who decides how your data is
          used. This policy covers tiniglabs.digital, the waitlist, and the blog emails.
        </P>
      </Section>

      <Section id="use" title="How we use your email">
        <P>We use your email address only to:</P>
        <List>
          <li>send a confirmation when you sign up</li>
          <li>send the updates or posts you signed up for</li>
          <li>reply when you write to us</li>
        </List>
        <P>We never sell your data, and we don&apos;t use it for advertising.</P>
      </Section>

      <Section id="providers" title="Who else handles it">
        <P>We use Microsoft services to run the site, so Microsoft processes data on our behalf:</P>
        <List>
          <li>Azure Static Web Apps hosts the website and runs the signup forms.</li>
          <li>Azure Communication Services sends our emails.</li>
          <li>Microsoft 365 hosts the mailboxes where signups arrive.</li>
        </List>
        <P>
          Microsoft may store this data outside the Philippines. We share data with anyone else
          only if the law requires it.
        </P>
      </Section>

      <Section id="security" title="How we protect it">
        <P>
          The site is served only over HTTPS. Signups are kept in mailboxes that only the
          developer can open, and service keys are stored encrypted in Azure, not in the code.
        </P>
      </Section>

      <Section id="rights" title="Your rights">
        <P>Under the Philippine Data Privacy Act of 2012, you can:</P>
        <List>
          <li>ask what data we hold about you</li>
          <li>have it corrected or deleted</li>
          <li>object to how we use it, or withdraw your consent</li>
          <li>get a copy of it</li>
        </List>
        <P>
          To do any of these, reply to any email from us or write to <Mail to={CONTACT} />. If
          you think we&apos;ve mishandled your data, you can also complain to the{" "}
          <A href="https://privacy.gov.ph">National Privacy Commission</A>.
        </P>
      </Section>

      <Section id="children" title="Children">
        <P>
          The waitlist and blog are for adults. If you&apos;re under 18, ask a parent or guardian
          before signing up.
        </P>
      </Section>

      <Section id="changes" title="Changes to this policy">
        <P>
          When we change this policy, we&apos;ll update the date at the top. If a change affects
          how we use your email, we&apos;ll tell you by email first.
        </P>
      </Section>

      <Section id="contact" title="Contact">
        <P>
          Questions about your data go to <Mail to={CONTACT} />. See also the{" "}
          <A href="/terms">Terms of Service</A>.
        </P>
      </Section>
    </LegalPage>
  );
}
