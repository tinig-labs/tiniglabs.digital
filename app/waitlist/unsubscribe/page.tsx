import type { Metadata } from "next";
import { UnsubscribeForm } from "../../_components/unsubscribe-form";

export const metadata: Metadata = {
  title: "Leave the waitlist | tinig labs",
  description: "Stop waitlist emails from tinig labs.",
  robots: { index: false, follow: false },
};

export default function WaitlistUnsubscribePage() {
  return (
    <UnsubscribeForm
      copy={{
        list: "waitlist",
        inbox: "waitlist@tiniglabs.digital",
        heading: "Leave the waitlist?",
        feature: (
          <p className="max-w-[36ch] leading-relaxed text-[var(--tinta)]/80">
            The waitlist is how we tell developers, specialists, and supporters when the speech
            dataset, models, and tools are ready.
          </p>
        ),
        explain: "You'll stop getting waitlist updates. If you also subscribe to talâ, the blog, you'll keep getting new posts.",
        action: "Leave the waitlist",
        busy: "Leaving…",
        doneHeading: "You've left the waitlist.",
        doneBody: "{email} won't get any more waitlist updates. It can take a few days to clear from our list. You can join again any time from the home page.",
        back: { href: "/#waitlist", label: "Go to the home page" },
      }}
    />
  );
}
