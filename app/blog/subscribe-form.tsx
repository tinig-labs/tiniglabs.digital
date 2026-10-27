"use client";

import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const STORAGE_KEY = "tinig-blog-subscribers";

// Placeholder submit. Replace the body with a POST to your newsletter endpoint.
async function subscribe(email: string): Promise<{ duplicate: boolean }> {
  await new Promise((r) => setTimeout(r, 800));
  let list: string[] = [];
  try {
    list = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    list = [];
  }
  const duplicate = list.includes(email);
  if (!duplicate) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, email]));
    } catch {
      /* storage unavailable; ignore */
    }
  }
  return { duplicate };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const emailId = useId();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean) return fail("Enter your email address.");
    if (!EMAIL_RE.test(clean)) return fail("Check your email. It should look like name@example.com.");
    setError("");
    setStatus("submitting");
    try {
      const res = await subscribe(clean);
      setDuplicate(res.duplicate);
      setStatus("success");
    } catch {
      fail("Couldn't subscribe you. Check your connection and try again.");
    }
  }

  function fail(msg: string) {
    setError(msg);
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="tl-fade flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--pandan)]">
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
        <div>
          <p className="text-lg font-semibold">
            {duplicate ? "You're already subscribed." : "Subscribed."}
          </p>
          <p className="mt-1 leading-relaxed text-[var(--abo)]">
            The first post will land in your inbox.
          </p>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={emailId} className="block text-sm font-medium text-[var(--abo)]">
        Get new posts by email
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
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
            "h-14 w-full min-w-0 rounded-2xl sm:flex-1 border bg-white px-5 text-base text-[var(--tinta)] placeholder:text-[var(--abo)]/60",
            "focus:border-[var(--pandan)] focus:outline-none focus:ring-4 focus:ring-[var(--pandan)]/15 disabled:opacity-60",
            error ? "border-[#B4234A]" : "border-[var(--tinta)]/10",
          ].join(" ")}
        />
        <button
          type="submit"
          disabled={submitting}
          className="h-14 shrink-0 rounded-2xl bg-[var(--pandan)] px-7 text-base font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#185A42] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pandan)] disabled:cursor-wait disabled:bg-[var(--pandan)]/70"
        >
          {submitting ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {error && (
        <p id={`${emailId}-err`} className="mt-2 text-sm font-medium text-[#B4234A]">
          {error}
        </p>
      )}
    </form>
  );
}
