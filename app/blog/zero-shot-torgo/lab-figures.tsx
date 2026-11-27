import type { Clip, Row, Transfer } from "./lab-data";

const CONDITION_LABEL: Record<string, string> = {
  "real-en": "Real, English",
  "clone-en": "Clone, English",
  "clone-tl-v3": "Clone, Tagalog (v3)",
  "clone-tl-v2": "Clone, Tagalog (multilingual v2)",
  "stock-tl": "Stock voice, Tagalog",
};

const SPEAKER_LABEL: Record<string, string> = {
  F03: "F03, dysarthria",
  FC03: "FC03, control",
  stock: "Stock voice",
};

const base = "/blog/zero-shot-torgo/";

/** Clips grouped by speaker, one audio player per clip */
export function ClipTable({ clips }: { clips: Clip[] }) {
  const speakers = [...new Set(clips.map((c) => c.speaker))];
  return (
    <div className="mt-6 space-y-8">
      {speakers.map((s) => (
        <figure key={s} className="rounded-3xl border border-[var(--tinta)]/10 p-5 sm:p-6">
          <figcaption className="font-semibold">{SPEAKER_LABEL[s] ?? s}</figcaption>
          <ul className="mt-4 space-y-5">
            {clips
              .filter((c) => c.speaker === s)
              .map((c) => (
                <li key={c.file}>
                  <p className="text-sm font-semibold text-[var(--pandan)]">
                    {CONDITION_LABEL[c.condition]} <span className="font-medium text-[var(--abo)]">· synthetic</span>
                  </p>
                  <p className="mt-1 leading-relaxed text-[var(--tinta)]/85">&ldquo;{c.text}&rdquo;</p>
                  <audio controls preload="none" src={`${base}${c.file}`} className="mt-2 w-full">
                    <a href={`${base}${c.file}`}>Download the clip</a>
                  </audio>
                </li>
              ))}
          </ul>
        </figure>
      ))}
    </div>
  );
}

function fmt(v: number | null, digits = 2, pct = false) {
  if (v === null) return "–";
  return pct ? `${(v * 100).toFixed(0)}%` : v.toFixed(digits);
}

/** Every averaged measurement, one row per speaker and condition */
export function ResultsTable({ rows }: { rows: Row[] }) {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--tinta)]/10 sm:-mx-6 lg:-mx-16">
      <table className="w-full min-w-[40rem] text-left text-sm tabular-nums">
        <caption className="px-4 pt-4 text-left text-sm text-[var(--abo)]">
          Averages per speaker and condition. Similarity is cosine similarity to the speaker&apos;s
          held-back real recordings (higher is closer). WER and CER from Whisper large-v3.
        </caption>
        <thead>
          <tr className="border-b border-[var(--tinta)]/10 text-[var(--abo)]">
            <th scope="col" className="px-4 py-3 font-semibold">Speaker</th>
            <th scope="col" className="px-4 py-3 font-semibold">Condition</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Clips</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Similarity</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">WER</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">CER</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Syll/s</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Pauses</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">F0 SD (st)</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">HNR (dB)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.speaker}-${r.condition}`} className="border-b border-[var(--tinta)]/5 last:border-0">
              <th scope="row" className="px-4 py-2.5 font-medium">{SPEAKER_LABEL[r.speaker] ?? r.speaker}</th>
              <td className="px-4 py-2.5">{CONDITION_LABEL[r.condition]}</td>
              <td className="px-4 py-2.5 text-right">{r.n}</td>
              <td className="px-4 py-2.5 text-right">{fmt(r.similarity)}</td>
              <td className="px-4 py-2.5 text-right">{fmt(r.wer, 0, true)}</td>
              <td className="px-4 py-2.5 text-right">{fmt(r.cer, 0, true)}</td>
              <td className="px-4 py-2.5 text-right">{fmt(r.rate, 1)}</td>
              <td className="px-4 py-2.5 text-right">{fmt(r.pauseRatio, 0, true)}</td>
              <td className="px-4 py-2.5 text-right">{fmt(r.f0sd, 1)}</td>
              <td className="px-4 py-2.5 text-right">{fmt(r.hnr, 1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const RATIO_CONDITIONS = ["clone-en", "clone-tl-v3", "clone-tl-v2"] as const;
const RATIO_FILL: Record<(typeof RATIO_CONDITIONS)[number], string> = {
  "clone-en": "var(--dahon)",
  "clone-tl-v3": "var(--pandan)",
  "clone-tl-v2": "#13261F",
};

/** Transfer ratio per marker: 0 = trait gone, 1 = trait kept */
export function TransferChart({ transfer }: { transfer: Transfer[] }) {
  const min = -0.5;
  const max = 1.5;
  const rowH = 22;
  const groupGap = 18;
  const labelW = 150;
  const plotW = 420;
  const groupH = RATIO_CONDITIONS.length * rowH + groupGap;
  const h = transfer.length * groupH + 30;
  const x = (v: number) => labelW + ((Math.max(min, Math.min(max, v)) - min) / (max - min)) * plotW;

  return (
    <figure className="mt-6 sm:-mx-6 lg:-mx-16">
      <svg viewBox={`0 0 ${labelW + plotW + 50} ${h}`} className="h-auto w-full" role="img" aria-labelledby="transfer-title">
        <title id="transfer-title">
          Transfer ratio for each dysarthria marker, for English and Tagalog clones. 1 means the
          clone kept the difference between the dysarthric and control speaker; 0 means it lost it.
        </title>
        {[0, 1].map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={0} y2={h - 24} stroke="var(--tinta)" strokeOpacity={t === 0 ? 0.35 : 0.2} strokeDasharray={t === 1 ? "4 4" : undefined} />
            <text x={x(t)} y={h - 8} textAnchor="middle" fontSize="12" fill="var(--abo)">
              {t === 0 ? "0 · lost" : "1 · kept"}
            </text>
          </g>
        ))}
        {transfer.map((m, i) => {
          const y0 = i * groupH;
          return (
            <g key={m.marker}>
              <text x={0} y={y0 + rowH * 1.5 + 4} fontSize="13" fontWeight={600} fill="var(--tinta)">
                {m.label}
              </text>
              {RATIO_CONDITIONS.map((c, j) => {
                const v = m.ratios[c];
                const y = y0 + j * rowH + 3;
                if (v === null || v === undefined) return null;
                const x0 = x(0);
                const x1 = x(v);
                return (
                  <g key={c}>
                    <rect x={Math.min(x0, x1)} y={y} width={Math.max(2, Math.abs(x1 - x0))} height={rowH - 6} rx={3} fill={RATIO_FILL[c]} />
                    <text x={Math.max(x0, x1) + 6} y={y + rowH - 10} fontSize="11" fill="var(--abo)">
                      {v.toFixed(2)}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-2 px-1 text-sm text-[var(--abo)] sm:px-6 lg:px-16">
        {RATIO_CONDITIONS.map((c) => (
          <span key={c} className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="inline-block size-3 rounded-sm" style={{ background: RATIO_FILL[c] }} />
            {CONDITION_LABEL[c]}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
