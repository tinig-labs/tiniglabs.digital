"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { focusRing } from "./brand";
import { HoneypotField } from "./honeypot-field";
import { postSignup, type Role } from "./signup";

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

export function WaitlistForm() {
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
      const res = await postSignup("waitlist", { email: clean, role, website });
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
      <div role="status" className="tl-swap rounded-3xl bg-white p-6 sm:p-8">
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
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-white p-6 sm:p-8">
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
                  "cursor-pointer rounded-full px-1 py-3 text-center text-sm sm:py-2.5 font-semibold transition-colors duration-150 sm:text-base",
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
          "mt-2 h-14 w-full rounded-full border bg-[var(--gatas)] px-5 text-base text-[var(--tinta)] placeholder:text-[var(--abo)]/60",
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
        className="mt-6 h-14 w-full rounded-full bg-[var(--pandan)] text-base font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#185A42] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pandan)] disabled:cursor-wait disabled:bg-[var(--pandan)]/70"
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
