import type { Metadata } from "next";
import { Brand, focusRing } from "./_components/brand";
import { SaidMeant } from "./_components/said-meant";
import { CORPUS_URL, SITE_NAME, pageMetadata } from "./_components/site";
import { WaitlistForm } from "./_components/waitlist-form";

export const metadata: Metadata = pageMetadata({
  title: { absolute: `${SITE_NAME}: open Filipino speech AI` },
  ogTitle: `${SITE_NAME}: open Filipino speech AI`,
  description:
    "An independent lab releasing open models, datasets, and tools for the Philippines, starting with speech that today's AI gets wrong.",
  path: "/",
});

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const BUILDING: { title: string; body: string; link?: { href: string; label: string } }[] = [
  {
    title: "Open datasets",
    body: "Collected with consent and documented, so anyone can check how they were made.",
    link: { href: CORPUS_URL, label: "Contribute recordings" },
  },
  { title: "Open models", body: "Released with weights, training code, and honest benchmarks." },
  { title: "Tools", body: "Apps and APIs built on our models, for people who'd never touch a model." },
];

type Step = { title: string; body: string; state?: "done" | "now"; href?: string };

const ROADMAP: Step[] = [
  { title: "Groundwork", body: "Consent and recording protocol.", state: "done" },
  { title: "Pilot dataset", body: "Tagalog syllables and words, recording in closed beta.", state: "now", href: CORPUS_URL },
  { title: "Baseline model", body: "Open weights and a public benchmark." },
  { title: "Tools", body: "Practice app and developer API." },
];

const linkClass = `rounded-sm font-semibold text-[var(--pandan)] underline-offset-4 hover:underline ${focusRing}`;

export default function Home() {
  return (
    <main className="w-full flex-1">
      <style>{`
        @keyframes tl-swap { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
        .tl-swap { animation: tl-swap 280ms ease-out both; }
        @keyframes tl-check { from { stroke-dashoffset: 18 } to { stroke-dashoffset: 0 } }
        .tl-check { stroke-dasharray: 18; animation: tl-check 360ms 120ms ease-out both; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          .tl-swap, .tl-check { animation: none !important; }
          .tl-check { stroke-dasharray: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>

      {/* Hero */}
      <section
        id="top"
        className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-8 sm:gap-16 sm:px-10 sm:pb-28 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:pb-40 lg:pt-24"
      >
        <div>
          <h1 className="max-w-[14ch] text-balance text-[clamp(2.5rem,11vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[4.5rem]">
            An independent lab for open Filipino AI.
          </h1>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed sm:mt-8 text-[var(--abo)] sm:text-xl">
            We release models, datasets, and tools anyone can use. First up: speech that
            today&apos;s AI gets wrong.
          </p>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--mint)] px-3.5 py-1.5 text-sm font-semibold text-[var(--pandan)] sm:mt-10">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--pandan)]" />
            Speech corpus now in closed beta
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={CORPUS_URL}
              className={`flex h-14 w-full items-center justify-center rounded-2xl sm:inline-flex sm:w-auto bg-[var(--pandan)] px-7 text-base font-semibold text-white transition-colors hover:bg-[#185A42] ${focusRing}`}
            >
              Lend your voice
            </a>
            <a
              href="#waitlist"
              className={`flex h-14 w-full items-center justify-center rounded-2xl sm:inline-flex sm:w-auto px-7 text-base font-semibold text-[var(--pandan)] transition-colors hover:bg-[var(--mint)] ${focusRing}`}
            >
              Join the waitlist
            </a>
          </div>
        </div>

        <SaidMeant />
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-10 sm:pb-28 lg:pb-40">
        <p className="max-w-[24ch] text-[1.75rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[2.75rem]">
          Most speech AI is trained on clear, standard English. Speech after a stroke, with a cleft
          palate, or in therapy gets treated as noise.
        </p>
        <p className="mt-6 max-w-[48ch] text-lg sm:mt-8 leading-relaxed text-[var(--abo)]">
          Our first project builds what Filipino clinicians and developers are missing, in the
          open. Tagalog first, then Cebuano, Ilocano, and Hiligaynon.
        </p>
      </section>

      {/* What we're building */}
      <section id="building" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 sm:scroll-mt-6 sm:px-10 sm:pb-28 lg:pb-40">
        <h2 className="text-2xl font-semibold tracking-tight">What we release</h2>
        <div className="mt-8 grid gap-8 sm:mt-12 sm:gap-12 md:grid-cols-3 md:gap-10">
          {BUILDING.map((b) => (
            <div key={b.title}>
              <h3 className="text-xl font-semibold">{b.title}</h3>
              <p className="mt-3 max-w-[32ch] leading-relaxed text-[var(--abo)]">{b.body}</p>
              {b.link && (
                <a href={b.link.href} className={`mt-4 inline-block ${linkClass}`}>
                  {b.link.label} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 sm:scroll-mt-6 sm:px-10 sm:pb-28 lg:pb-40">
        <h2 className="text-2xl font-semibold tracking-tight">Where the speech project is</h2>
        <ol className="mt-8 grid sm:mt-12 md:grid-cols-4 md:gap-8">
          {ROADMAP.map((s, i) => {
            const now = s.state === "now";
            const done = s.state === "done";
            return (
              <li
                key={s.title}
                aria-current={now ? "step" : undefined}
                className="border-l-2 pb-8 pl-5 last:pb-0 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-6"
                style={{ borderColor: now || done ? "var(--pandan)" : "rgba(19,38,31,0.1)" }}
              >
                <p className={`text-sm font-medium ${now ? "text-[var(--pandan)]" : "text-[var(--abo)]"}`}>
                  {now ? "Now" : done ? "Done" : `Step ${i + 1}`}
                </p>
                <h3 className="mt-1 text-lg font-semibold md:mt-2">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-[var(--abo)] md:mt-2">{s.body}</p>
                {s.href && (
                  <a href={s.href} className={`mt-3 inline-block ${linkClass}`}>
                    Start recording <span aria-hidden="true">→</span>
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="scroll-mt-18 bg-[var(--mint)] sm:scroll-mt-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:gap-14 sm:px-10 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:py-36">
          <div>
            <h2 className="max-w-[14ch] text-[clamp(2.25rem,10vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]">
              Help build it from day zero.
            </h2>
            <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-[var(--tinta)]/70 sm:mt-6">
              <Brand /> is independent and run by one developer, in public. Join to follow
              along or to help.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>

    </main>
  );
}
