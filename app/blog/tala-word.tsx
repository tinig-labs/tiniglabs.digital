"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* One spelling, two words: talâ (a note) and tála (a star)           */
/* ------------------------------------------------------------------ */

type Reading = {
  id: "note" | "star";
  written: string;
  meaning: string;
  ending: string;
  // Where the second vowel stops, as a fraction of the waveform width
  stop?: number;
};

const READINGS: Reading[] = [
  {
    id: "note",
    written: "talâ",
    meaning: "A note, a record.",
    ending: "Ends in a glottal stop, a quick catch in the throat.",
    stop: 0.8,
  },
  {
    id: "star",
    written: "tála",
    meaning: "A star.",
    ending: "Ends open. The last vowel just fades.",
  },
];

const BARS = 60;

// Rough loudness of "ta-la": a closure and burst for /t/, a stressed /a/,
// a dip for /l/, then a second /a/ that either cuts off or fades away.
function envelope(x: number, stop?: number) {
  if (x < 0.05) return 0;
  if (x < 0.08) return 0.35;
  if (x < 0.44) return Math.pow(Math.sin((Math.PI * (x - 0.08)) / 0.36), 0.5);
  if (x < 0.52) return 0.28;
  if (stop !== undefined) return x < stop ? 0.62 + 0.08 * Math.sin((x - 0.52) * 9) : 0;
  return 0.66 * Math.exp(-(x - 0.54) * 5.5);
}

function bars(stop?: number) {
  return Array.from({ length: BARS }, (_, i) => {
    const x = i / (BARS - 1);
    const grain = 0.72 + 0.28 * Math.abs(Math.sin(i * 12.9898));
    return Math.max(0, envelope(x, stop) * grain);
  });
}

function Waveform({ reading }: { reading: Reading }) {
  const heights = bars(reading.stop);
  const step = 12;
  const w = BARS * step;
  const h = 120;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full" aria-hidden="true">
        {heights.map((v, i) => {
          const bh = Math.max(4, v * h);
          return (
            <rect
              key={`${reading.id}-${i}`}
              x={i * step + 4}
              y={(h - bh) / 2}
              width={4}
              height={bh}
              rx={2}
              className="tl-bar"
              style={{
                fill: v > 0 ? "var(--pandan)" : "rgba(19,38,31,0.14)",
                animationDelay: `${i * 9}ms`,
              }}
            />
          );
        })}
      </svg>
      {reading.stop !== undefined && (
        <span
          key={`stop-${reading.id}`}
          className="tl-fade pointer-events-none absolute -bottom-7 flex -translate-x-1/2 flex-col items-center text-xs font-medium text-[var(--abo)]"
          style={{ left: `${(Math.round(reading.stop * (BARS - 1)) * step) / w * 100}%` }}
        >
          <span className="mb-1 h-3 w-px bg-[var(--tinta)]/40" />
          glottal stop
        </span>
      )}
    </div>
  );
}

export function TalaWord() {
  const [id, setId] = useState<Reading["id"]>("note");
  const reading = READINGS.find((r) => r.id === id)!;

  return (
    <div>
      <h1 className="text-[clamp(7.5rem,26vw,16rem)] font-semibold leading-[0.82] tracking-[-0.055em]">
        tala
        <span className="sr-only">, the tinig labs blog</span>
      </h1>

      <div className="mt-10 max-w-[38rem] sm:mt-14">
        <Waveform reading={reading} />
      </div>

      <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
        <div
          role="group"
          aria-label="Choose a pronunciation"
          className="flex shrink-0 gap-1 self-start rounded-full bg-[var(--mint)] p-1"
        >
          {READINGS.map((r) => {
            const on = r.id === id;
            return (
              <button
                key={r.id}
                type="button"
                aria-pressed={on}
                aria-label={`${r.written}, ${r.meaning}`}
                onClick={() => setId(r.id)}
                className={[
                  "h-11 rounded-full px-5 text-lg font-semibold transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pandan)]",
                  on
                    ? "bg-white text-[var(--pandan)] shadow-[0_1px_2px_rgba(19,38,31,0.12)]"
                    : "text-[var(--tinta)]/70 hover:text-[var(--tinta)]",
                ].join(" ")}
              >
                {r.written}
              </button>
            );
          })}
        </div>

        <div aria-live="polite" key={id} className="tl-fade min-h-[4rem]">
          <p className="text-xl font-semibold">{reading.meaning}</p>
          <p className="mt-1 max-w-[36ch] leading-relaxed text-[var(--abo)]">{reading.ending}</p>
        </div>
      </div>
    </div>
  );
}
