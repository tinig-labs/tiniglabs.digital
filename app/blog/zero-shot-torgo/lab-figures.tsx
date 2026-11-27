import { proseLink } from "../../_components/ui";
import type { Clip, KwfPilot, Row, Transfer } from "./lab-data";

const TORGO_URL = "https://www.cs.toronto.edu/~complingweb/data/TORGO/torgo.html";

export const SPEAKER_LABEL: Record<string, string> = {
  F01: "F01, severe dysarthria",
  F03: "F03, mild dysarthria",
  FC03: "FC03, control",
  stock: "Stock Tagalog voice",
};

export const VARIANT_LABEL: Record<string, string> = {
  real: "Real recording",
  "std-s05": "Standard reference, stability 0.5",
  "std-s00": "Standard reference, stability 0",
  "sal-s05": "Salient reference, stability 0.5",
  "sal-s00": "Salient reference, stability 0",
  stock: "Stock voice",
};

const SHORT_VARIANT: Record<string, string> = {
  "std-s05": "Standard · 0.5",
  "std-s00": "Standard · 0",
  "sal-s05": "Salient · 0.5",
  "sal-s00": "Salient · 0",
};

const CONDITION_LABEL: Record<string, string> = {
  "real-en": "English",
  "clone-en": "English",
  "clone-tl": "Tagalog",
};

const VARIANT_FILL: Record<string, string> = {
  "std-s05": "var(--dahon)",
  "std-s00": "#4FA383",
  "sal-s05": "var(--pandan)",
  "sal-s00": "#13261F",
};

const base = "/blog/zero-shot-torgo/";

/** Real recordings first, then clones, grouped by speaker */
export function ClipTable({ clips }: { clips: Clip[] }) {
  // The stock voice isn't a speaker: it's the uncloned baseline, so it gets its own strip below
  const speakers = [...new Set(clips.map((c) => c.speaker))].filter((s) => s !== "stock");
  const stock = clips.filter((c) => c.speaker === "stock");
  return (
    <div className="post-wide mt-6 space-y-8 xl:grid xl:grid-cols-3 xl:items-start xl:gap-6 xl:space-y-0">
      {speakers.map((s) => (
        <figure key={s} className="rounded-3xl border border-[var(--tinta)]/10 p-5 sm:p-6">
          <figcaption className="font-semibold">{SPEAKER_LABEL[s] ?? s}</figcaption>
          <ul className="mt-4 space-y-5">
            {clips
              .filter((c) => c.speaker === s)
              .map((c) => {
                const real = c.variant === "real";
                return (
                  <li key={c.file} className={real ? "-mx-3 rounded-2xl bg-[var(--mint)] px-3 py-3" : undefined}>
                    <p className="text-sm font-semibold text-[var(--pandan)]">
                      {real ? "Real recording · TORGO" : `${VARIANT_LABEL[c.variant] ?? c.variant}`} ·{" "}
                      {CONDITION_LABEL[c.condition]}{" "}
                      <span className="font-medium text-[var(--abo)]">· {real ? "real" : "synthetic"}</span>
                    </p>
                    <p className="mt-1 leading-relaxed text-[var(--tinta)]/85">&ldquo;{c.text}&rdquo;</p>
                    <audio controls preload="none" src={`${base}${c.file}`} className="mt-2 w-full">
                      <a href={`${base}${c.file}`}>Download the clip</a>
                    </audio>
                    {real && (
                      <p className="mt-1.5 text-xs text-[var(--abo)]">
                        From the <a href={TORGO_URL} className={proseLink}>TORGO database</a> (Rudzicz et al., 2012),
                        University of Toronto. Trimmed and loudness-matched.
                      </p>
                    )}
                  </li>
                );
              })}
          </ul>
        </figure>
      ))}
      {stock.length > 0 && (
        <figure className="rounded-3xl bg-[var(--tinta)]/[0.03] p-5 sm:p-6 xl:col-span-3">
          <figcaption>
            <span className="font-semibold">{SPEAKER_LABEL.stock}, for comparison</span>
            <span className="mt-1 block text-sm leading-relaxed text-[var(--abo)]">
              A ready-made voice, not cloned from anyone. It shows how the Tagalog sentence sounds
              without any speaker&apos;s voice in it.
            </span>
          </figcaption>
          <ul className="mt-4 space-y-4">
            {stock.map((c) => (
              <li key={c.file} className="gap-x-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(16rem,26rem)] lg:items-center">
                <div>
                  <p className="text-sm font-semibold text-[var(--pandan)]">
                    {CONDITION_LABEL[c.condition]} <span className="font-medium text-[var(--abo)]">· synthetic</span>
                  </p>
                  <p className="mt-1 leading-relaxed text-[var(--tinta)]/85">&ldquo;{c.text}&rdquo;</p>
                </div>
                <audio controls preload="none" src={`${base}${c.file}`} className="mt-2 w-full lg:mt-0">
                  <a href={`${base}${c.file}`}>Download the clip</a>
                </audio>
              </li>
            ))}
          </ul>
        </figure>
      )}
    </div>
  );
}

function fmt(v: number | null | undefined, digits = 2, pct = false) {
  if (v === null || v === undefined) return "–";
  return pct ? `${(v * 100).toFixed(0)}%` : v.toFixed(digits);
}

/** Averages per speaker, variant and condition */
export function ResultsTable({ rows }: { rows: Row[] }) {
  return (
    <figure className="post-wide mt-8 max-w-[72rem]">
      <div className="overflow-x-auto rounded-2xl border border-[var(--tinta)]/10">
        <table className="w-full min-w-[50rem] text-left text-sm tabular-nums" aria-describedby="results-caption">
          <thead>
            <tr className="border-b border-[var(--tinta)]/10 text-[var(--abo)]">
              <th scope="col" className="px-4 py-3 font-semibold">Speaker</th>
              <th scope="col" className="px-4 py-3 font-semibold">Audio</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Clips</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Similarity</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">WER</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Syll/s</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Pauses</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">F0 SD (st)</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">HNR (dB)</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Shimmer</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={`${r.speaker}-${r.variant}-${r.condition}`}
                className={`border-b border-[var(--tinta)]/5 last:border-0 ${r.variant === "real" ? "bg-[var(--mint)]/60" : ""}`}
              >
                <th scope="row" className="px-4 py-2.5 font-medium">{SPEAKER_LABEL[r.speaker] ?? r.speaker}</th>
                <td className="px-4 py-2.5">
                  {r.variant === "real" ? "Real" : SHORT_VARIANT[r.variant] ?? VARIANT_LABEL[r.variant]}, {CONDITION_LABEL[r.condition] ?? r.condition}
                </td>
                <td className="px-4 py-2.5 text-right">{r.n}</td>
                <td className="px-4 py-2.5 text-right">{fmt(r.similarity)}</td>
                <td className="px-4 py-2.5 text-right">{fmt(r.wer, 0, true)}</td>
                <td className="px-4 py-2.5 text-right">{fmt(r.rate, 1)}</td>
                <td className="px-4 py-2.5 text-right">{fmt(r.pauseRatio, 0, true)}</td>
                <td className="px-4 py-2.5 text-right">{fmt(r.f0sd, 1)}</td>
                <td className="px-4 py-2.5 text-right">{fmt(r.hnr, 1)}</td>
                <td className="px-4 py-2.5 text-right">{fmt(r.shimmer, 1, true)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption id="results-caption" className="mt-3 max-w-[44rem] px-1 text-sm text-[var(--abo)]">
        Averages per speaker and audio type. Similarity is cosine similarity to the speaker&apos;s
        held-back real recordings (higher is closer). WER is from Whisper large-v3. Clones read 6
        English and 12 Tagalog sentences. Real rows are TORGO recordings. F01&apos;s real row adds
        its 9 reference sentences to its 2 held-back ones, since it recorded so few.
      </figcaption>
    </figure>
  );
}

/** Transfer ratio per marker and variant for one dysarthric speaker. 0 = trait lost, 1 = kept. */
export function TransferChart({ transfer, speaker, condition }: { transfer: Transfer[]; speaker: string; condition: string }) {
  const all = transfer.filter((t) => t.speaker === speaker && t.condition === condition);
  const shown = all.filter((m) => m.reported);
  const skipped = all.filter((m) => !m.reported);
  const variants = Object.keys(VARIANT_FILL).filter((v) => shown.some((m) => m.ratios[v] !== null && m.ratios[v] !== undefined));
  const min = -1;
  const max = 2;
  const rowH = 20;
  const groupGap = 18;
  const labelW = 150;
  const plotW = 420;
  const groupH = variants.length * rowH + groupGap;
  const h = shown.length * groupH + 30;
  const x = (v: number) => labelW + ((Math.max(min, Math.min(max, v)) - min) / (max - min)) * plotW;
  const id = `transfer-${speaker}-${condition}`;

  return (
    <figure className="post-wide mt-6 max-w-[56rem]">
      <svg viewBox={`0 0 ${labelW + plotW + 50} ${h}`} className="h-auto w-full" role="img" aria-labelledby={id}>
        <title id={id}>
          {`Transfer ratio for each dysarthria marker, ${SPEAKER_LABEL[speaker]}, ${CONDITION_LABEL[condition]} clones, by variant. 1 means the clone kept the difference from the control speaker; 0 means it lost it.`}
        </title>
        {[0, 1].map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={0} y2={h - 24} stroke="var(--tinta)" strokeOpacity={t === 0 ? 0.35 : 0.2} strokeDasharray={t === 1 ? "4 4" : undefined} />
            <text x={x(t)} y={h - 8} textAnchor="middle" fontSize="12" fill="var(--abo)">
              {t === 0 ? "0 · lost" : "1 · kept"}
            </text>
          </g>
        ))}
        {shown.map((m, i) => {
          const y0 = i * groupH;
          return (
            <g key={m.marker}>
              <text x={0} y={y0 + (variants.length * rowH) / 2 + 4} fontSize="13" fontWeight={600} fill="var(--tinta)">
                {m.label}
              </text>
              {variants.map((v, j) => {
                const r = m.ratios[v];
                const ci = m.ci90[v];
                if (r === null || r === undefined) return null;
                const y = y0 + j * rowH + 3;
                const x0 = x(0);
                const x1 = x(r);
                const mid = y + (rowH - 6) / 2;
                const labelX = Math.max(x0, x1, ci ? x(ci[1]) : 0) + 6;
                return (
                  <g key={v}>
                    <rect x={Math.min(x0, x1)} y={y + 2} width={Math.max(2, Math.abs(x1 - x0))} height={rowH - 10} rx={2} fill={VARIANT_FILL[v]} />
                    {ci && (
                      <g stroke="var(--tinta)" strokeOpacity={0.5} strokeWidth={1.2}>
                        <line x1={x(ci[0])} x2={x(ci[1])} y1={mid} y2={mid} />
                        <line x1={x(ci[0])} x2={x(ci[0])} y1={mid - 4} y2={mid + 4} />
                        <line x1={x(ci[1])} x2={x(ci[1])} y1={mid - 4} y2={mid + 4} />
                      </g>
                    )}
                    <text x={Math.min(labelX, labelW + plotW + 8)} y={mid + 4} fontSize="11" fill="var(--abo)">
                      {r.toFixed(2)}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-2 px-1 text-sm text-[var(--abo)]">
        {variants.map((v) => (
          <span key={v} className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="inline-block size-3 rounded-sm" style={{ background: VARIANT_FILL[v] }} />
            {VARIANT_LABEL[v]}
          </span>
        ))}
        <span className="basis-full">
          Bars are the ratio; whiskers are 90% bootstrap intervals, clipped to −1 to 2.
          {skipped.length > 0 && (
            <>
              {" "}Not shown: {skipped.map((m) => m.label.toLowerCase()).join(", ")}. The real speakers barely
              differ on these (|d| &lt; 0.5), so a ratio would mean nothing.
            </>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

/** Whisper error rates on the same Tagalog sentences, plain spelling vs KWF-guided spelling */
export function KwfPilotTable({ pilot }: { pilot: KwfPilot[] }) {
  const name: Record<string, string> = { FC03: "FC03 clone (control)", stock: "Stock Tagalog voice", F03: "F03 clone (mild dysarthria)" };
  return (
    <figure className="mt-6">
      <div className="overflow-x-auto rounded-2xl border border-[var(--tinta)]/10">
        <table className="w-full min-w-[30rem] text-left text-sm tabular-nums">
          <thead>
            <tr className="border-b border-[var(--tinta)]/10 text-[var(--abo)]">
              <th scope="col" className="px-4 py-3 font-semibold">Voice</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">WER, plain</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">WER, KWF</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Better / worse</th>
            </tr>
          </thead>
          <tbody>
            {pilot.map((p) => (
              <tr key={p.voice} className="border-b border-[var(--tinta)]/5 last:border-0">
                <th scope="row" className="px-4 py-2.5 font-medium">{name[p.voice] ?? p.voice}</th>
                <td className="px-4 py-2.5 text-right">{fmt(p.werPlain, 0, true)}</td>
                <td className="px-4 py-2.5 text-right font-semibold">{fmt(p.werKwf, 0, true)}</td>
                <td className="px-4 py-2.5 text-right">{p.better} / {p.worse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 px-1 text-sm text-[var(--abo)]">
        Whisper large-v3 word error rate on the same 12 Tagalog sentences, one take each. &ldquo;Better / worse&rdquo;
        counts sentences whose error rate went down or up with KWF spelling.
      </figcaption>
    </figure>
  );
}

export type Verdict = "kept" | "partly" | "lost" | "unclear";

const VERDICT: Record<Verdict, { label: string; className: string }> = {
  kept: { label: "Kept", className: "bg-[var(--pandan)] text-white" },
  partly: { label: "Partly", className: "bg-[var(--mint)] text-[var(--pandan)] ring-1 ring-inset ring-[var(--pandan)]/30" },
  lost: { label: "Lost", className: "bg-[var(--tinta)]/8 text-[var(--tinta)]" },
  unclear: { label: "Can't tell", className: "border border-dashed border-[var(--abo)]/60 text-[var(--abo)]" },
};

export function VerdictChip({ verdict }: { verdict: Verdict }) {
  const v = VERDICT[verdict];
  return (
    <span className={`inline-flex shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm font-semibold ${v.className}`}>
      {v.label}
    </span>
  );
}

export type ScoreCell = { verdict: Verdict; note: string };
export type ScoreRow = { trait: string; detail: string; F03: ScoreCell; F01: ScoreCell };

/** One row per dysarthria trait, one column per dysarthric speaker */
export function Scorecard({ rows }: { rows: ScoreRow[] }) {
  return (
    <figure className="post-wide mt-6 max-w-[64rem]">
      <div className="overflow-x-auto rounded-2xl border border-[var(--tinta)]/10">
        <table className="w-full min-w-[36rem] text-left">
          <thead>
            <tr className="border-b border-[var(--tinta)]/10 text-sm text-[var(--abo)]">
              <th scope="col" className="w-[34%] px-4 py-3 font-semibold">Trait</th>
              <th scope="col" className="px-4 py-3 font-semibold">F03, mild dysarthria</th>
              <th scope="col" className="px-4 py-3 font-semibold">F01, severe dysarthria</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.trait} className="border-b border-[var(--tinta)]/5 align-top last:border-0">
                <th scope="row" className="px-4 py-3.5">
                  <span className="block font-semibold">{r.trait}</span>
                  <span className="mt-0.5 block text-sm font-normal text-[var(--abo)]">{r.detail}</span>
                </th>
                {[r.F03, r.F01].map((c, i) => (
                  <td key={i} className="px-4 py-3.5">
                    <VerdictChip verdict={c.verdict} />
                    <span className="mt-1.5 block text-sm leading-snug text-[var(--tinta)]/75">{c.note}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 max-w-[44rem] px-1 text-sm text-[var(--abo)]">
        Tagalog clones, standard setup (default reference, stability 0.5, KWF spelling). Numbers are
        transfer ratios unless stated; see the box below for how to read them.
      </figcaption>
    </figure>
  );
}

/** Two bars that show what a transfer ratio of 0.6 means */
export function RatioExplainer() {
  return (
    <aside className="mt-6 rounded-3xl bg-[var(--mint)] p-6 sm:p-8" aria-labelledby="ratio-explainer">
      <h3 id="ratio-explainer" className="text-lg font-semibold">How to read the numbers</h3>
      <p className="mt-3 leading-relaxed text-[var(--tinta)]/85">
        For each trait we measure how far the dysarthric speaker is from the control speaker in real
        recordings, then how far apart their clones are. The <b>transfer ratio</b> is the share of the
        real difference that the clones keep.
      </p>
      <svg viewBox="0 0 300 72" className="mt-5 h-auto w-full max-w-[26rem]" role="img" aria-labelledby="ratio-svg-title">
        <title id="ratio-svg-title">
          Example: the real speakers differ by 10 units, their clones by 6, so the transfer ratio is 0.6.
        </title>
        <text x="0" y="21" fontSize="13" fill="var(--tinta)" fontWeight={600}>Real</text>
        <rect x="58" y="8" width="200" height="18" rx="4" fill="var(--pandan)" />
        <text x="266" y="21" fontSize="13" fill="var(--abo)">10</text>
        <text x="0" y="57" fontSize="13" fill="var(--tinta)" fontWeight={600}>Clones</text>
        <rect x="58" y="44" width="120" height="18" rx="4" fill="var(--dahon)" />
        <rect x="178" y="44" width="80" height="18" rx="4" fill="none" stroke="var(--pandan)" strokeOpacity={0.45} strokeDasharray="4 3" />
        <text x="266" y="57" fontSize="13" fill="var(--abo)">6</text>
      </svg>
      <p className="mt-2 text-sm text-[var(--tinta)]/85">
        Example: 6 ÷ 10 = a transfer ratio of 0.6. The clones keep 60% of the real difference.
      </p>
      <ul className="mt-5 grid gap-2 text-sm leading-snug sm:grid-cols-2">
        <li className="flex items-start gap-2"><VerdictChip verdict="kept" /><span>0.7 or more: the trait came through.</span></li>
        <li className="flex items-start gap-2"><VerdictChip verdict="partly" /><span>0.3 to 0.7: some of it came through.</span></li>
        <li className="flex items-start gap-2"><VerdictChip verdict="lost" /><span>Below 0.3: the clone smoothed it away.</span></li>
        <li className="flex items-start gap-2"><VerdictChip verdict="unclear" /><span>Too uncertain, or the real speakers barely differ.</span></li>
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-[var(--abo)]">
        With only 6 to 12 clips per speaker, every number has a wide margin. We call a trait kept or
        partly kept only when its 90% interval stays above zero.
      </p>
    </aside>
  );
}

export type Change = { tried: string; what: string; result: string };

/** What each change did */
export function ChangesTable({ rows }: { rows: Change[] }) {
  return (
    <figure className="post-wide mt-6 max-w-[64rem]">
      <div className="overflow-x-auto rounded-2xl border border-[var(--tinta)]/10">
        <table className="w-full min-w-[36rem] text-left">
          <thead>
            <tr className="border-b border-[var(--tinta)]/10 text-sm text-[var(--abo)]">
              <th scope="col" className="w-[30%] px-4 py-3 font-semibold">What we tried</th>
              <th scope="col" className="px-4 py-3 font-semibold">What happened</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.tried} className="border-b border-[var(--tinta)]/5 align-top last:border-0">
                <th scope="row" className="px-4 py-3.5">
                  <span className="block font-semibold">{r.tried}</span>
                  <span className="mt-0.5 block text-sm font-normal text-[var(--abo)]">{r.what}</span>
                </th>
                <td className="px-4 py-3.5 leading-snug text-[var(--tinta)]/85">{r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
