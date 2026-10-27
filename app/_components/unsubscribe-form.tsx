"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { focusRing } from "./brand";

export type UnsubscribeCopy = {
  list: "waitlist" | "blog";
  inbox: string;
  heading: string;
  feature: ReactNode;
  explain: string;
  action: string;
  busy: string;
  doneHeading: string;
  // "{email}" is replaced with the address being unsubscribed
  doneBody: string;
  back: { href: string; label: string };
};

type Status = "loading" | "invalid" | "ready" | "submitting" | "done" | "error";

// The token is "<base64url of list:email>.<signature>". The page only reads
// the first half to show who's unsubscribing; the API checks the signature.
function readLink(list: UnsubscribeCopy["list"]) {
  const token = new URLSearchParams(window.location.search).get("t") ?? "";
  const payload = token.split(".")[0];
  if (!payload) return null;
  try {
    const decoded = new TextDecoder().decode(
      Uint8Array.from(atob(payload.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0)),
    );
    const split = decoded.indexOf(":");
    const email = decoded.slice(split + 1);
    // A blog link opened on the waitlist page (or the reverse) isn't valid here
    return decoded.slice(0, split) === list && email ? { token, email } : null;
  } catch {
    return null;
  }
}

const button =
  "h-14 rounded-2xl bg-[var(--pandan)] px-7 text-base font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#185A42] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pandan)] disabled:cursor-wait disabled:bg-[var(--pandan)]/70";
const heading = "max-w-[18ch] text-[2.5rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]";
const lede = "mt-6 max-w-[44ch] text-lg leading-relaxed text-[var(--abo)]";
const failed = "Couldn't unsubscribe you right now. Try again in a few minutes.";

export function UnsubscribeForm({ copy }: { copy: UnsubscribeCopy }) {
  const [target, setTarget] = useState<{ token: string; email: string } | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const link = readLink(copy.list);
    // The link lives in the URL, which only exists in the browser
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTarget(link);
    setStatus(link ? "ready" : "invalid");
  }, [copy.list]);

  async function confirm() {
    if (!target) return;
    setStatus("submitting");
    try {
      const res = await fetch(`/api/${copy.list}/unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: target.token }),
      });
      const data = (await res.json().catch(() => null)) as { ok: boolean; error?: string } | null;
      if (data?.ok) return setStatus("done");
      if (res.status === 400) return setStatus("invalid");
      setError(data?.error ?? failed);
      setStatus("error");
    } catch {
      setError("Couldn't reach tinig labs. Check your connection and try again.");
      setStatus("error");
    }
  }

  let content: ReactNode;

  if (status === "loading") {
    content = <div className="min-h-[20rem]" />;
  } else if (status === "invalid" || !target) {
    content = (
      <>
        <h1 className={heading}>This unsubscribe link isn&apos;t valid.</h1>
        <p className={lede}>
          It may be incomplete. Open the link from the email again, or write to{" "}
          <a href={`mailto:${copy.inbox}`} className={`rounded-sm font-medium text-[var(--pandan)] underline underline-offset-4 ${focusRing}`}>
            {copy.inbox}
          </a>{" "}
          and we&apos;ll remove you.
        </p>
      </>
    );
  } else if (status === "done") {
    content = (
      <div role="status" className="tl-swap">
        <h1 className={heading}>{copy.doneHeading}</h1>
        <p className={lede}>{copy.doneBody.replace("{email}", target.email)}</p>
        <Link href={copy.back.href} className={`mt-10 inline-flex items-center ${button} ${focusRing}`}>
          {copy.back.label}
        </Link>
      </div>
    );
  } else {
    content = (
      <>
        <h1 className={heading}>{copy.heading}</h1>
        <div className="mt-10 max-w-[34rem] rounded-[28px] bg-[var(--mint)] p-3">
          <div className="px-6 pb-5 pt-4 sm:px-8">{copy.feature}</div>
          <div className="rounded-[20px] bg-white p-7 sm:p-9">
            <p className="text-sm font-medium text-[var(--abo)]">Email</p>
            <p className="mt-1 break-all text-xl font-semibold">{target.email}</p>
            <p className="mt-4 leading-relaxed text-[var(--abo)]">{copy.explain}</p>
            <button type="button" onClick={confirm} disabled={status === "submitting"} className={`mt-8 w-full ${button}`}>
              {status === "submitting" ? copy.busy : copy.action}
            </button>
            {status === "error" && (
              <p role="alert" className="mt-3 text-sm font-medium text-[#B4234A]">
                {error}
              </p>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-28 pt-12 sm:px-10 lg:pb-40 lg:pt-20">
      <style>{`
        @keyframes tl-swap { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
        .tl-swap { animation: tl-swap 280ms ease-out both; }
        @media (prefers-reduced-motion: reduce) { .tl-swap { animation: none !important; } }
      `}</style>
      {content}
    </main>
  );
}
