import type { Metadata } from "next";
import { UnsubscribeForm } from "../../_components/unsubscribe-form";

export const metadata: Metadata = {
  title: "Unsubscribe from talâ | tinig labs",
  description: "Stop getting new talâ posts by email.",
  robots: { index: false, follow: false },
};

export default function BlogUnsubscribePage() {
  return (
    <UnsubscribeForm
      copy={{
        list: "blog",
        inbox: "subscribe@tiniglabs.digital",
        heading: "Unsubscribe from talâ?",
        feature: (
          <>
            <p className="text-[3.5rem] font-semibold leading-none tracking-[-0.03em] text-[var(--pandan)]">talâ</p>
            <p className="mt-3 text-[var(--tinta)]/80">A note, a record. The tinig labs blog.</p>
          </>
        ),
        explain: "You'll stop getting new posts by email. Waitlist updates, if you signed up for them, aren't affected.",
        action: "Unsubscribe from talâ",
        busy: "Unsubscribing…",
        doneHeading: "You're unsubscribed from talâ.",
        doneBody: "{email} won't get new posts by email anymore. It can take a few days to clear from our list. Posts will still be on the blog whenever you want to read them.",
        back: { href: "/blog", label: "Go to the blog" },
      }}
    />
  );
}
