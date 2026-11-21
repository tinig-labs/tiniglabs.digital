"use client";

import { useState } from "react";

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

export function SaidMeant() {
  const [i, setI] = useState(0);
  const ex = EXAMPLES[i];

  return (
    <div className="rounded-3xl bg-[var(--mint)] p-6 sm:p-8">
      <div aria-live="polite" className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-[var(--abo)]">Said</p>
          <p
            key={`s-${i}`}
            className="tl-swap mt-1 text-[clamp(4.5rem,22vw,5.5rem)] font-medium leading-none tracking-tight text-[var(--abo)] sm:text-[7.5rem]"
          >
            {ex.said}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--pandan)]">Meant</p>
          <p
            key={`m-${i}`}
            className="tl-swap mt-1 text-[clamp(4.5rem,22vw,5.5rem)] font-semibold leading-none tracking-tight text-[var(--tinta)] sm:text-[7.5rem]"
          >
            {ex.meant}
          </p>
        </div>
      </div>

      <p className="mt-6 min-h-[3rem] max-w-[34ch] sm:mt-8 leading-relaxed text-[var(--tinta)]/80">{ex.note}</p>

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
