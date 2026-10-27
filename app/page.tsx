"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { Brand, focusRing } from "./_components/brand";
import { HoneypotField } from "./_components/honeypot-field";
import { joinWaitlist, type Role } from "./actions";

/* ------------------------------------------------------------------ */
/* Hero: said / meant                                                  */
/* ------------------------------------------------------------------ */

type Example = { meant: string; said: string; note: string };

const EXAMPLES: Example[] = [
  { meant: "ka", said: "ʔa", note: "A glottal stop replaces /k/. Common with cleft palate." },
  { meant: "ba", said: "ma", note: "Air escapes through the nose. Common with cleft palate." },
  { meant: "ra", said: "la", note: "A sound children often work on in articulation therapy." },
  { meant: "ta", said: "da", note: "An inconsistent error seen in speech after a stroke." },
  { meant: "sa", said: "ha", note: "The /s/ moves to the throat. Common with cleft palate." },
];

function SaidMeant() {
  const [i, setI] = useState(0);
  const ex = EXAMPLES[i];

  return (
    <div className="rounded-[28px] bg-[var(--mint)] p-6 sm:p-10">
      <div aria-live="polite" className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-[var(--abo)]">Said</p>
          <p
            key={`s-${i}`}
            className="tl-swap mt-1 text-[5.5rem] font-medium leading-none tracking-tight text-[var(--abo)] sm:text-[7.5rem]"
          >
            {ex.said}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--pandan)]">Meant</p>
          <p
            key={`m-${i}`}
            className="tl-swap mt-1 text-[5.5rem] font-semibold leading-none tracking-tight text-[var(--tinta)] sm:text-[7.5rem]"
          >
            {ex.meant}
          </p>
        </div>
      </div>

      <p className="mt-8 min-h-[3rem] max-w-[34ch] leading-relaxed text-[var(--tinta)]/80">{ex.note}</p>

      <div role="group" aria-label="Choose an example" className="mt-6 flex flex-wrap gap-2">
        {EXAMPLES.map((e, idx) => {
          const on = idx === i;
          return (
            <button
              key={e.meant}
              type="button"
              aria-pressed={on}
              aria-label={`${e.meant}, said as ${e.said}`}
              onClick={() => setI(idx)}
              className={[
                "h-11 min-w-11 rounded-full px-4 text-base font-semibold transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pandan)]",
                on
                  ? "bg-[var(--pandan)] text-white"
                  : "bg-white/70 text-[var(--tinta)] hover:bg-white",
              ].join(" ")}
            >
              {e.meant}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Waitlist                                                            */
/* ------------------------------------------------------------------ */

type Status = "idle" | "submitting" | "success" | "error";

const ROLES: { id: Role; label: string; hint: string; next: string }[] = [
  {
    id: "developer",
    label: "Developer",
    hint: "Early access to datasets, models, and the API.",
    next: "You'll hear first when the dataset and model are ready.",
  },
  {
    id: "specialist",
    label: "Specialist",
    hint: "For SLPs, audiologists, linguists, and audio engineers. Help shape the data.",
    next: "We'll ask you to review how recordings are made and labeled.",
  },
  {
    id: "supporter",
    label: "Supporter",
    hint: "Short updates when something real ships.",
    next: "You'll get an update when each milestone ships.",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("developer");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const emailId = useId();

  const current = ROLES.find((r) => r.id === role)!;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean) return fail("Enter your email address.");
    if (!EMAIL_RE.test(clean)) return fail("Check your email. It should look like name@example.com.");
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    setError("");
    setStatus("submitting");
    try {
      const res = await joinWaitlist({ email: clean, role, website });
      if (!res.ok) return fail(res.error);
      setStatus("success");
    } catch {
      fail("Couldn't reach the waitlist. Check your connection and try again.");
    }
  }

  function fail(msg: string) {
    setError(msg);
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="tl-swap rounded-[28px] bg-white p-8 sm:p-10">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--pandan)]">
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
            <path
              d="M5 10.5l3.2 3L15 6.5"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tl-check"
            />
          </svg>
        </span>
        <p className="mt-6 text-2xl font-semibold tracking-tight">
          You&apos;re on the waitlist.
        </p>
        <p className="mt-2 leading-relaxed text-[var(--abo)]">
          {current.next} A confirmation is on its way to your inbox.
        </p>
        <button
          type="button"
          onClick={() => {
            setEmail("");
            setStatus("idle");
          }}
          className="mt-8 rounded-md font-semibold text-[var(--pandan)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pandan)]"
        >
          Add another email
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[28px] bg-white p-8 sm:p-10">
      <HoneypotField />
      <fieldset>
        <legend className="text-sm font-medium text-[var(--abo)]">I&apos;m joining as a</legend>
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-full bg-[var(--mint)] p-1">
          {ROLES.map((r) => {
            const on = role === r.id;
            return (
              <label
                key={r.id}
                className={[
                  "cursor-pointer rounded-full py-2.5 text-center text-sm font-semibold transition-colors duration-150 sm:text-base",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--pandan)]",
                  on ? "bg-white text-[var(--pandan)] shadow-[0_1px_2px_rgba(19,38,31,0.12)]" : "text-[var(--tinta)]/70 hover:text-[var(--tinta)]",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="role"
                  value={r.id}
                  checked={on}
                  onChange={() => setRole(r.id)}
                  className="sr-only"
                />
                {r.label}
              </label>
            );
          })}
        </div>
        <p className="mt-3 min-h-[2.5rem] text-sm text-[var(--abo)]">{current.hint}</p>
      </fieldset>

      <label htmlFor={emailId} className="mt-6 block text-sm font-medium text-[var(--abo)]">
        Email
      </label>
      <input
        id={emailId}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${emailId}-err` : undefined}
        disabled={submitting}
        className={[
          "mt-2 h-14 w-full rounded-2xl border bg-[var(--gatas)] px-5 text-base text-[var(--tinta)] placeholder:text-[var(--abo)]/60",
          "focus:border-[var(--pandan)] focus:outline-none focus:ring-4 focus:ring-[var(--pandan)]/15 disabled:opacity-60",
          error ? "border-[#B4234A]" : "border-[var(--tinta)]/10",
        ].join(" ")}
      />
      {error && (
        <p id={`${emailId}-err`} className="mt-2 text-sm font-medium text-[#B4234A]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 h-14 w-full rounded-2xl bg-[var(--pandan)] text-base font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#185A42] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pandan)] disabled:cursor-wait disabled:bg-[var(--pandan)]/70"
      >
        {submitting ? "Joining…" : "Join the waitlist"}
      </button>
      <p className="mt-4 text-sm text-[var(--abo)]">
        We only email you about this. Read the{" "}
        <Link href="/privacy" className={`rounded-sm underline underline-offset-4 hover:text-[var(--pandan)] ${focusRing}`}>
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const BUILDING = [
  { title: "Open datasets", body: "Collected with consent and documented, so anyone can check how they were made." },
  { title: "Open models", body: "Released with weights, training code, and honest benchmarks." },
  { title: "Tools", body: "Apps and APIs built on our models, for people who'd never touch a model." },
];

const ROADMAP = [
  { title: "Groundwork", body: "Consent and recording protocol, reviewed by specialists.", now: true },
  { title: "Pilot dataset", body: "Tagalog syllables and words." },
  { title: "Baseline model", body: "Open weights and a public benchmark." },
  { title: "Tools", body: "Practice app and developer API." },
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
        className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-28 pt-16 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:pb-40 lg:pt-24"
      >
        <div>
          <h1 className="max-w-[14ch] text-[3rem] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[4.5rem]">
            An independent lab for open Filipino AI.
          </h1>
          <p className="mt-8 max-w-[40ch] text-lg leading-relaxed text-[var(--abo)] sm:text-xl">
            We release models, datasets, and tools anyone can use. First up: speech that
            today&apos;s AI gets wrong.
          </p>
          <a
            href="#waitlist"
            className={`mt-10 inline-flex h-14 items-center rounded-2xl bg-[var(--pandan)] px-7 text-base font-semibold text-white transition-colors hover:bg-[#185A42] ${focusRing}`}
          >
            Join the waitlist
          </a>
        </div>

        <SaidMeant />
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-10 lg:pb-40">
        <p className="max-w-[24ch] text-[2rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[2.75rem]">
          Most speech AI is trained on clear, standard English. Speech after a stroke, with a cleft
          palate, or in therapy gets treated as noise.
        </p>
        <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-[var(--abo)]">
          Our first project builds what Filipino clinicians and developers are missing, in the
          open. Tagalog first, then Cebuano, Ilocano, and Hiligaynon.
        </p>
      </section>

      {/* What we're building */}
      <section id="building" className="mx-auto max-w-6xl scroll-mt-6 px-6 pb-28 sm:px-10 lg:pb-40">
        <h2 className="text-2xl font-semibold tracking-tight">What we release</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
          {BUILDING.map((b) => (
            <div key={b.title}>
              <h3 className="text-xl font-semibold">{b.title}</h3>
              <p className="mt-3 max-w-[32ch] leading-relaxed text-[var(--abo)]">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="mx-auto max-w-6xl scroll-mt-6 px-6 pb-28 sm:px-10 lg:pb-40">
        <h2 className="text-2xl font-semibold tracking-tight">Where the speech project is</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
          {ROADMAP.map((s, i) => (
            <li key={s.title} className="border-t-2 pt-6" style={{ borderColor: s.now ? "var(--pandan)" : "rgba(19,38,31,0.1)" }}>
              <p className={`text-sm font-medium ${s.now ? "text-[var(--pandan)]" : "text-[var(--abo)]"}`}>
                {s.now ? "Now" : `Step ${i + 1}`}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-[var(--abo)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="scroll-mt-6 bg-[var(--mint)]">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-28 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:py-36">
          <div>
            <h2 className="max-w-[14ch] text-[2.5rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]">
              Help build it from day zero.
            </h2>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-[var(--tinta)]/70">
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
