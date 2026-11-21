import type { Metadata } from "next";
import Link from "next/link";
import { Brand, LogoMark, type Product, ProductLockup, ProductMark } from "./_components/brand";
import { SaidMeant } from "./_components/said-meant";
import { CORPUS_URL, NOTEBOOK_URL, SITE_NAME, pageMetadata } from "./_components/site";
import { buttonBlock, buttonPrimary, buttonSecondary, card, pill, textLink } from "./_components/ui";
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

const BUILDING: { title: string; body: string; product?: Product; link?: { href: string; label: string } }[] = [
  {
    title: "Open datasets",
    body: "Collected with consent and documented, so anyone can check how they were made.",
    product: "corpus",
    link: { href: CORPUS_URL, label: "Contribute recordings" },
  },
  { title: "Open models", body: "Released with weights, training code, and honest benchmarks." },
  {
    title: "Tools",
    body: "Apps and APIs built on our models. First: a recording notebook for speech-language pathologists.",
    product: "notebook",
    link: { href: NOTEBOOK_URL, label: "Try the notebook" },
  },
];

type Step = { title: string; body: string; state?: "done" | "now"; href?: string };

const ROADMAP: Step[] = [
  { title: "Groundwork", body: "Consent and recording protocol.", state: "done" },
  { title: "Pilot dataset", body: "Tagalog syllables and words, recording in closed beta.", state: "now", href: CORPUS_URL },
  { title: "Baseline model", body: "Open weights and a public benchmark." },
  { title: "Tools", body: "Notebook for SLPs in closed beta. Practice app and developer API next." },
];


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
          <ul aria-label="In closed beta" className="mt-8 flex flex-wrap gap-2 sm:mt-10">
            <li>
              <a href={CORPUS_URL} className={pill}>
                <ProductMark product="corpus" />
                Speech corpus in closed beta
              </a>
            </li>
            <li>
              <Link href="/blog/notebook-closed-beta" className={pill}>
                <ProductMark product="notebook" />
                Notebook for SLPs in closed beta
              </Link>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={CORPUS_URL} className={`${buttonPrimary} ${buttonBlock}`}>
              Lend your voice
            </a>
            <a href="#waitlist" className={`${buttonSecondary} ${buttonBlock}`}>
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
        <div className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-3 md:gap-6">
          {BUILDING.map((b) => (
            <div key={b.title} className={`${card} flex flex-col bg-white ring-1 ring-inset ring-[var(--tinta)]/[0.08]`}>
              <h3 className="text-xl font-semibold">{b.title}</h3>
              <p className="mt-3 max-w-[32ch] leading-relaxed text-[var(--abo)]">{b.body}</p>
              {b.product && b.link && (
                <div className="mt-auto pt-8">
                  <div className="border-t border-[var(--tinta)]/[0.08] pt-6">
                    <ProductLockup product={b.product} size="sm" />
                    <a href={b.link.href} className={`mt-4 inline-block ${textLink}`}>
                      {b.link.label} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
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
                <p
                  className={
                    now
                      ? "inline-flex rounded-full bg-[var(--mint)] px-2.5 py-0.5 text-sm font-semibold text-[var(--pandan)]"
                      : "text-sm font-medium text-[var(--abo)] md:py-0.5"
                  }
                >
                  {now ? "Now" : done ? "Done" : `Step ${i + 1}`}
                </p>
                <h3 className="mt-1 text-lg font-semibold md:mt-2">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-[var(--abo)] md:mt-2">{s.body}</p>
                {s.href && (
                  <a href={s.href} className={`mt-3 inline-block ${textLink}`}>
                    Start recording <span aria-hidden="true">→</span>
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="scroll-mt-18 bg-[var(--pandan)] text-[var(--gatas)] sm:scroll-mt-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:gap-14 sm:px-10 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <div>
            <LogoMark size={48} variant="reversed" />
            <h2 className="mt-8 max-w-[14ch] text-[clamp(2.25rem,10vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]">
              Help build it from day zero.
            </h2>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-[var(--mint)]">
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
