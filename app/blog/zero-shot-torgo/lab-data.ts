// Everything on the post that changes as the experiment runs.
// The experiment repo (zero-shot-torgo/scripts/export_blog.py) rewrites RESULTS and CLIPS.

export type Phase = { label: string; done: boolean };

export const PHASES: Phase[] = [
  { label: "Read the study and plan the replication", done: true },
  { label: "Download TORGO and pick two speakers", done: false },
  { label: "Build reference and held-out sets", done: false },
  { label: "Write Tagalog prompts and have them checked", done: false },
  { label: "Clone both voices and generate speech", done: false },
  { label: "Measure similarity, intelligibility and dysarthria markers", done: false },
];

/** A synthetic clip served from public/blog/zero-shot-torgo/ */
export type Clip = {
  speaker: string;
  condition: "clone-en" | "clone-tl-v3" | "clone-tl-v2" | "stock-tl";
  text: string;
  file: string;
};

export const CLIPS: Clip[] = [];

/** One measurement, averaged over a speaker's clips in one condition */
export type Row = {
  speaker: string;
  condition: "real-en" | "clone-en" | "clone-tl-v3" | "clone-tl-v2" | "stock-tl";
  n: number;
  similarity: number | null;
  wer: number | null;
  cer: number | null;
  rate: number | null;
  pauseRatio: number | null;
  f0sd: number | null;
  hnr: number | null;
};

export type Transfer = { marker: string; label: string; real: number; ratios: Record<string, number | null> };

export type Results = { rows: Row[]; transfer: Transfer[] };

export const RESULTS: Results | null = null;
