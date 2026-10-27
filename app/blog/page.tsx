import type { Metadata } from "next";
import { Brand } from "../_components/brand";
import { SubscribeForm } from "./subscribe-form";
import { TalaWord } from "./tala-word";

const title = "talâ, the tinig labs blog";
const description = "Notes from building open speech AI for Filipino voices. Coming soon.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", siteName: "tinig labs", title, description, url: "/blog" },
  twitter: { card: "summary", title, description },
};

export default function BlogPage() {
  return (
    <main className="w-full flex-1">
      <style>{`
        @keyframes tl-bar { from { transform: scaleY(0.05); opacity: 0.3 } to { transform: none; opacity: 1 } }
        .tl-bar { transform-box: fill-box; transform-origin: center; animation: tl-bar 420ms cubic-bezier(.2,.7,.2,1) both; }
        @keyframes tl-fade { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
        .tl-fade { animation: tl-fade 260ms 120ms ease-out both; }
        @keyframes tl-check { from { stroke-dashoffset: 18 } to { stroke-dashoffset: 0 } }
        .tl-check { stroke-dasharray: 18; animation: tl-check 360ms 120ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .tl-bar, .tl-fade, .tl-check { animation: none !important; }
          .tl-check { stroke-dasharray: none; }
        }
      `}</style>

      <section className="mx-auto max-w-6xl px-6 pb-28 pt-12 sm:px-10 lg:pb-36 lg:pt-20">
        <TalaWord />
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 pb-28 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:pb-40">
        <div>
          <p className="max-w-[20ch] text-[2rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[2.5rem]">
            Same spelling, two words. We named the blog after the note.
          </p>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-[var(--abo)]">
            Talâ is where <Brand /> will write up what it learns building speech AI for Filipino
            voices.
          </p>
          <div className="mt-10 max-w-[30rem]">
            <SubscribeForm />
          </div>
        </div>

        <div className="lg:pt-3">
          <h2 className="text-lg font-semibold">Posts</h2>
          <div className="mt-6 border-t border-[var(--tinta)]/10 pt-8">
            <p className="text-2xl font-medium tracking-[-0.01em]">Nothing here yet. Stay tuned.</p>
            <p className="mt-2 max-w-[36ch] leading-relaxed text-[var(--abo)]">
              Subscribe and the first post comes straight to your inbox.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
