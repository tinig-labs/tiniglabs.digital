// Everything on the post that changes as the experiment runs.
// The experiment repo (zero-shot-torgo/scripts/export_blog.py) rewrites CLIPS and RESULTS.

export type Phase = { label: string; done: boolean };

export const PHASES: Phase[] = [
  { label: "Read the study and plan the replication", done: true },
  { label: "Download TORGO and pick speakers", done: true },
  { label: "Build reference and held-out sets", done: true },
  { label: "Write Tagalog prompts and check them against KWF Diksiyonaryo", done: true },
  { label: "Round 1: clone two voices and measure what carries over", done: true },
  { label: "Round 2: add a severe speaker, salient references and a stability sweep", done: true },
  { label: "Listening test with SLPs and native Tagalog listeners", done: false },
];

export type Speaker = "F01" | "F03" | "FC03" | "stock";
export type Variant = "real" | "std-s05" | "std-s00" | "sal-s05" | "sal-s00" | "stock";
export type Condition = "real-en" | "clone-en" | "clone-tl" | "clone-tl-plain";

/** A clip served from public/blog/zero-shot-torgo/. variant "real" is a TORGO recording. */
export type Clip = { speaker: Speaker; variant: Variant; condition: Condition; text: string; file: string };

export const CLIPS: Clip[] = [
  { speaker: "F01", variant: "real", condition: "real-en", text: "The quick brown fox jumps over the lazy dog.", file: "F01-real-h03.mp3" },
  { speaker: "F01", variant: "real", condition: "real-en", text: "Twice each day he plays skillfully and with zest upon our small organ.", file: "F01-real-h10.mp3" },
  { speaker: "F01", variant: "std-s05", condition: "clone-en", text: "The quick brown fox jumps over the lazy dog.", file: "F01-std-s05-clone-en-h03.mp3" },
  { speaker: "F01", variant: "std-s05", condition: "clone-tl", text: "Tumalón ang mabilís na kayumangging soro sa ibabaw ng tamad na aso.", file: "F01-std-s05-clone-tl-t03.mp3" },
  { speaker: "F01", variant: "std-s00", condition: "clone-en", text: "The quick brown fox jumps over the lazy dog.", file: "F01-std-s00-clone-en-h03.mp3" },
  { speaker: "F01", variant: "std-s00", condition: "clone-tl", text: "Tumalón ang mabilís na kayumangging soro sa ibabaw ng tamad na aso.", file: "F01-std-s00-clone-tl-t03.mp3" },
  { speaker: "F03", variant: "real", condition: "real-en", text: "The quick brown fox jumps over the lazy dog.", file: "F03-real-h03.mp3" },
  { speaker: "F03", variant: "real", condition: "real-en", text: "Twice each day he plays skillfully and with zest upon our small organ.", file: "F03-real-h10.mp3" },
  { speaker: "F03", variant: "std-s05", condition: "clone-en", text: "The quick brown fox jumps over the lazy dog.", file: "F03-std-s05-clone-en-h03.mp3" },
  { speaker: "F03", variant: "std-s05", condition: "clone-tl", text: "Tumalón ang mabilís na kayumangging soro sa ibabaw ng tamad na aso.", file: "F03-std-s05-clone-tl-t03.mp3" },
  { speaker: "F03", variant: "std-s00", condition: "clone-en", text: "The quick brown fox jumps over the lazy dog.", file: "F03-std-s00-clone-en-h03.mp3" },
  { speaker: "F03", variant: "std-s00", condition: "clone-tl", text: "Tumalón ang mabilís na kayumangging soro sa ibabaw ng tamad na aso.", file: "F03-std-s00-clone-tl-t03.mp3" },
  { speaker: "F03", variant: "sal-s00", condition: "clone-en", text: "The quick brown fox jumps over the lazy dog.", file: "F03-sal-s00-clone-en-h03.mp3" },
  { speaker: "F03", variant: "sal-s00", condition: "clone-tl", text: "Tumalón ang mabilís na kayumangging soro sa ibabaw ng tamad na aso.", file: "F03-sal-s00-clone-tl-t03.mp3" },
  { speaker: "FC03", variant: "real", condition: "real-en", text: "The quick brown fox jumps over the lazy dog.", file: "FC03-real-h03.mp3" },
  { speaker: "FC03", variant: "real", condition: "real-en", text: "Twice each day he plays skillfully and with zest upon our small organ.", file: "FC03-real-h10.mp3" },
  { speaker: "FC03", variant: "std-s05", condition: "clone-en", text: "The quick brown fox jumps over the lazy dog.", file: "FC03-std-s05-clone-en-h03.mp3" },
  { speaker: "FC03", variant: "std-s05", condition: "clone-tl", text: "Tumalón ang mabilís na kayumangging soro sa ibabaw ng tamad na aso.", file: "FC03-std-s05-clone-tl-t03.mp3" },
  { speaker: "FC03", variant: "std-s00", condition: "clone-en", text: "The quick brown fox jumps over the lazy dog.", file: "FC03-std-s00-clone-en-h03.mp3" },
  { speaker: "FC03", variant: "std-s00", condition: "clone-tl", text: "Tumalón ang mabilís na kayumangging soro sa ibabaw ng tamad na aso.", file: "FC03-std-s00-clone-tl-t03.mp3" },
  { speaker: "FC03", variant: "sal-s00", condition: "clone-en", text: "The quick brown fox jumps over the lazy dog.", file: "FC03-sal-s00-clone-en-h03.mp3" },
  { speaker: "FC03", variant: "sal-s00", condition: "clone-tl", text: "Tumalón ang mabilís na kayumangging soro sa ibabaw ng tamad na aso.", file: "FC03-sal-s00-clone-tl-t03.mp3" },
  { speaker: "stock", variant: "stock", condition: "clone-tl", text: "Tumalón ang mabilís na kayumangging soro sa ibabaw ng tamad na aso.", file: "stock-clone-tl-t03.mp3" },
];

/** One measurement, averaged over a speaker's clips in one variant and condition */
export type Row = {
  speaker: string;
  variant: string;
  condition: string;
  n: number;
  similarity: number | null;
  wer: number | null;
  cer: number | null;
  rate: number | null;
  pauseRatio: number | null;
  f0sd: number | null;
  hnr: number | null;
  jitter: number | null;
  shimmer: number | null;
};

export type Transfer = {
  /** dysarthric speaker, compared with the FC03 control */
  speaker: string;
  condition: string;
  marker: string;
  label: string;
  /** dysarthric minus control on real English */
  real: number | null;
  /** Cohen's d of that real gap */
  d: number | null;
  /** false when the real speakers barely differ, so a ratio would mean nothing */
  reported: boolean;
  /** true when both real gaps use the same prompts */
  matched: boolean;
  nReal: number[];
  ratios: Record<string, number | null>;
  /** 90% bootstrap interval per variant */
  ci90: Record<string, number[] | null>;
};

export type Identity = { speaker: string; variant: string; condition: string; own: number | null; others: Record<string, number | null> };

export type KwfPilot = {
  voice: string;
  variant: string;
  n: number;
  werPlain: number;
  werKwf: number;
  cerPlain: number;
  cerKwf: number;
  better: number;
  worse: number;
};

export type Results = { rows: Row[]; transfer: Transfer[]; identity: Identity[]; kwfPilot: KwfPilot[]; variants: string[] };

export const RESULTS: Results | null = {
  "rows": [
    {
      "speaker": "F01",
      "variant": "real",
      "condition": "real-en",
      "n": 11,
      "similarity": 0.6646000000000001,
      "wer": 0.5381090909090909,
      "cer": 0.35456363636363636,
      "rate": 2.3423727272727275,
      "pauseRatio": 0.21485454545454544,
      "f0sd": 2.701290909090909,
      "hnr": 23.9633,
      "jitter": 0.01152727272727273,
      "shimmer": 0.04108181818181818
    },
    {
      "speaker": "F01",
      "variant": "std-s05",
      "condition": "clone-en",
      "n": 6,
      "similarity": 0.3256833333333333,
      "wer": 0.02778333333333333,
      "cer": 0.009266666666666666,
      "rate": 2.383966666666667,
      "pauseRatio": 0.06155,
      "f0sd": 2.34985,
      "hnr": 25.173033333333333,
      "jitter": 0.008133333333333333,
      "shimmer": 0.03735
    },
    {
      "speaker": "F01",
      "variant": "std-s05",
      "condition": "clone-tl",
      "n": 12,
      "similarity": 0.39615833333333333,
      "wer": 0.18400833333333333,
      "cer": 0.056108333333333336,
      "rate": 2.742058333333334,
      "pauseRatio": 0.08361666666666667,
      "f0sd": 2.9378583333333332,
      "hnr": 24.54619166666667,
      "jitter": 0.008825000000000001,
      "shimmer": 0.044333333333333336
    },
    {
      "speaker": "F01",
      "variant": "std-s00",
      "condition": "clone-en",
      "n": 6,
      "similarity": 0.31916666666666665,
      "wer": 0.08333333333333333,
      "cer": 0.02315,
      "rate": 2.469183333333333,
      "pauseRatio": 0.0712,
      "f0sd": 3.0424333333333333,
      "hnr": 24.21468333333333,
      "jitter": 0.008499999999999999,
      "shimmer": 0.044149999999999995
    },
    {
      "speaker": "F01",
      "variant": "std-s00",
      "condition": "clone-tl",
      "n": 12,
      "similarity": 0.39564166666666667,
      "wer": 0.2900083333333333,
      "cer": 0.10866666666666668,
      "rate": 2.783166666666667,
      "pauseRatio": 0.09280833333333333,
      "f0sd": 3.4407416666666664,
      "hnr": 23.622358333333338,
      "jitter": 0.009125000000000001,
      "shimmer": 0.0476
    },
    {
      "speaker": "F03",
      "variant": "real",
      "condition": "real-en",
      "n": 12,
      "similarity": 0.6526250000000001,
      "wer": 0.150675,
      "cer": 0.06252500000000001,
      "rate": 2.8068750000000002,
      "pauseRatio": 0.15075000000000002,
      "f0sd": 3.544333333333334,
      "hnr": 12.678399999999998,
      "jitter": 0.0193,
      "shimmer": 0.09425833333333333
    },
    {
      "speaker": "F03",
      "variant": "std-s05",
      "condition": "clone-en",
      "n": 6,
      "similarity": 0.33273333333333327,
      "wer": 0.012816666666666665,
      "cer": 0.002416666666666667,
      "rate": 3.950933333333334,
      "pauseRatio": 0.0,
      "f0sd": 3.685983333333333,
      "hnr": 14.041566666666668,
      "jitter": 0.016416666666666666,
      "shimmer": 0.07868333333333333
    },
    {
      "speaker": "F03",
      "variant": "std-s05",
      "condition": "clone-tl",
      "n": 12,
      "similarity": 0.30599166666666666,
      "wer": 0.14904166666666666,
      "cer": 0.03719166666666667,
      "rate": 4.2631250000000005,
      "pauseRatio": 0.01863333333333333,
      "f0sd": 3.038091666666667,
      "hnr": 15.047324999999999,
      "jitter": 0.015533333333333335,
      "shimmer": 0.08200833333333335
    },
    {
      "speaker": "F03",
      "variant": "std-s00",
      "condition": "clone-en",
      "n": 6,
      "similarity": 0.33298333333333335,
      "wer": 0.06836666666666667,
      "cer": 0.021133333333333334,
      "rate": 3.5082166666666663,
      "pauseRatio": 0.06613333333333334,
      "f0sd": 3.488566666666667,
      "hnr": 13.837516666666666,
      "jitter": 0.016916666666666667,
      "shimmer": 0.0837
    },
    {
      "speaker": "F03",
      "variant": "std-s00",
      "condition": "clone-tl",
      "n": 12,
      "similarity": 0.3767416666666666,
      "wer": 0.1221,
      "cer": 0.03137499999999999,
      "rate": 4.396841666666667,
      "pauseRatio": 0.011608333333333333,
      "f0sd": 3.1695916666666673,
      "hnr": 14.888883333333334,
      "jitter": 0.01579166666666667,
      "shimmer": 0.07887499999999999
    },
    {
      "speaker": "F03",
      "variant": "sal-s05",
      "condition": "clone-en",
      "n": 6,
      "similarity": 0.42208333333333337,
      "wer": 0.04415,
      "cer": 0.0213,
      "rate": 3.5144,
      "pauseRatio": 0.020166666666666666,
      "f0sd": 3.028883333333333,
      "hnr": 14.807616666666666,
      "jitter": 0.013666666666666667,
      "shimmer": 0.07953333333333333
    },
    {
      "speaker": "F03",
      "variant": "sal-s05",
      "condition": "clone-tl",
      "n": 12,
      "similarity": 0.35430000000000006,
      "wer": 0.10126666666666667,
      "cer": 0.020775000000000002,
      "rate": 4.447525,
      "pauseRatio": 0.020433333333333335,
      "f0sd": 3.76755,
      "hnr": 15.326450000000001,
      "jitter": 0.014199999999999999,
      "shimmer": 0.07675833333333333
    },
    {
      "speaker": "F03",
      "variant": "sal-s00",
      "condition": "clone-en",
      "n": 6,
      "similarity": 0.42979999999999996,
      "wer": 0.03663333333333333,
      "cer": 0.01705,
      "rate": 3.774133333333333,
      "pauseRatio": 0.013783333333333333,
      "f0sd": 3.573366666666667,
      "hnr": 14.610833333333332,
      "jitter": 0.01325,
      "shimmer": 0.0837
    },
    {
      "speaker": "F03",
      "variant": "sal-s00",
      "condition": "clone-tl",
      "n": 12,
      "similarity": 0.33664999999999995,
      "wer": 0.11376666666666668,
      "cer": 0.026333333333333334,
      "rate": 4.378324999999999,
      "pauseRatio": 0.014083333333333331,
      "f0sd": 3.20195,
      "hnr": 14.707333333333333,
      "jitter": 0.014241666666666665,
      "shimmer": 0.08349166666666667
    },
    {
      "speaker": "FC03",
      "variant": "real",
      "condition": "real-en",
      "n": 12,
      "similarity": 0.8003666666666668,
      "wer": 0.028633333333333334,
      "cer": 0.007233333333333334,
      "rate": 2.479766666666667,
      "pauseRatio": 0.14386666666666667,
      "f0sd": 5.300208333333335,
      "hnr": 12.062758333333333,
      "jitter": 0.020283333333333334,
      "shimmer": 0.07085
    },
    {
      "speaker": "FC03",
      "variant": "std-s05",
      "condition": "clone-en",
      "n": 6,
      "similarity": 0.3412,
      "wer": 0.0,
      "cer": 0.0,
      "rate": 3.543283333333333,
      "pauseRatio": 0.0,
      "f0sd": 4.3597,
      "hnr": 13.28133333333333,
      "jitter": 0.01735,
      "shimmer": 0.0718
    },
    {
      "speaker": "FC03",
      "variant": "std-s05",
      "condition": "clone-tl",
      "n": 12,
      "similarity": 0.243125,
      "wer": 0.032575,
      "cer": 0.0069,
      "rate": 4.447266666666667,
      "pauseRatio": 0.010775,
      "f0sd": 3.710333333333333,
      "hnr": 15.311208333333333,
      "jitter": 0.016183333333333334,
      "shimmer": 0.06985833333333334
    },
    {
      "speaker": "FC03",
      "variant": "std-s00",
      "condition": "clone-en",
      "n": 6,
      "similarity": 0.34321666666666667,
      "wer": 0.06836666666666667,
      "cer": 0.0163,
      "rate": 3.5115000000000003,
      "pauseRatio": 0.010166666666666666,
      "f0sd": 4.183416666666667,
      "hnr": 14.014183333333333,
      "jitter": 0.016550000000000002,
      "shimmer": 0.06863333333333334
    },
    {
      "speaker": "FC03",
      "variant": "std-s00",
      "condition": "clone-tl",
      "n": 12,
      "similarity": 0.25589999999999996,
      "wer": 0.04090833333333333,
      "cer": 0.008450000000000001,
      "rate": 4.3824499999999995,
      "pauseRatio": 0.017725,
      "f0sd": 3.890608333333333,
      "hnr": 15.11325,
      "jitter": 0.016900000000000002,
      "shimmer": 0.07137500000000001
    },
    {
      "speaker": "FC03",
      "variant": "sal-s05",
      "condition": "clone-en",
      "n": 6,
      "similarity": 0.32865000000000005,
      "wer": 0.012816666666666665,
      "cer": 0.002416666666666667,
      "rate": 3.8490333333333333,
      "pauseRatio": 0.0,
      "f0sd": 4.81895,
      "hnr": 13.718083333333334,
      "jitter": 0.01675,
      "shimmer": 0.06718333333333333
    },
    {
      "speaker": "FC03",
      "variant": "sal-s05",
      "condition": "clone-tl",
      "n": 12,
      "similarity": 0.31826666666666664,
      "wer": 0.08320833333333333,
      "cer": 0.019775,
      "rate": 4.544941666666666,
      "pauseRatio": 0.0051333333333333335,
      "f0sd": 4.522616666666667,
      "hnr": 14.881225,
      "jitter": 0.016591666666666668,
      "shimmer": 0.06824166666666667
    },
    {
      "speaker": "FC03",
      "variant": "sal-s00",
      "condition": "clone-en",
      "n": 6,
      "similarity": 0.32876666666666665,
      "wer": 0.0,
      "cer": 0.0,
      "rate": 3.6765666666666674,
      "pauseRatio": 0.0,
      "f0sd": 4.237283333333333,
      "hnr": 14.41601666666667,
      "jitter": 0.0146,
      "shimmer": 0.06206666666666666
    },
    {
      "speaker": "FC03",
      "variant": "sal-s00",
      "condition": "clone-tl",
      "n": 12,
      "similarity": 0.27963333333333334,
      "wer": 0.06869166666666666,
      "cer": 0.018075000000000004,
      "rate": 4.696858333333332,
      "pauseRatio": 0.00955,
      "f0sd": 4.249225,
      "hnr": 14.847908333333335,
      "jitter": 0.016108333333333332,
      "shimmer": 0.07175
    },
    {
      "speaker": "stock",
      "variant": "stock",
      "condition": "clone-tl",
      "n": 12,
      "similarity": null,
      "wer": 0.054799999999999995,
      "cer": 0.014408333333333334,
      "rate": 5.363158333333332,
      "pauseRatio": 0.016591666666666668,
      "f0sd": 2.93735,
      "hnr": 15.061,
      "jitter": 0.020375,
      "shimmer": 0.08680833333333333
    },
    {
      "speaker": "stock",
      "variant": "stock",
      "condition": "clone-tl-plain",
      "n": 12,
      "similarity": null,
      "wer": 0.10420833333333333,
      "cer": 0.02089166666666667,
      "rate": 5.6084000000000005,
      "pauseRatio": 0.02039166666666667,
      "f0sd": 3.531475,
      "hnr": 14.41230833333333,
      "jitter": 0.019841666666666667,
      "shimmer": 0.08718333333333332
    }
  ],
  "transfer": [
    {
      "speaker": "F01",
      "condition": "clone-en",
      "marker": "wer",
      "label": "ASR word error rate",
      "real": 0.5094757575757576,
      "d": 2.7126576020656117,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 0.05453318027443539,
        "std-s00": 0.029376602211423485,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          0.0,
          0.1521250854904932
        ],
        "std-s00": [
          -0.18631935906926445,
          0.28531583705615526
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-en",
      "marker": "rate",
      "label": "Speaking rate",
      "real": -0.1373939393939394,
      "d": -0.38050374327013803,
      "reported": false,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-en",
      "marker": "pauseRatio",
      "label": "Pause ratio",
      "real": 0.07098787878787877,
      "d": 0.5479796454645699,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 0.8670494322547599,
        "std-s00": 0.8597711943993855,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          -2.6032700556538866,
          4.7659956806175146
        ],
        "std-s00": [
          -2.1590685335315216,
          4.173686026092249
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-en",
      "marker": "f0sd",
      "label": "Pitch variability",
      "real": -2.5989174242424258,
      "d": -1.4831911599292114,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 0.7733412309495995,
        "std-s00": 0.439022541728476,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          0.4010728180459824,
          1.586421815792105
        ],
        "std-s00": [
          0.14701331001649418,
          0.9488139779577707
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-en",
      "marker": "hnr",
      "label": "Harmonics-to-noise",
      "real": 11.900541666666667,
      "d": 5.612996020963696,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 0.9992570366194817,
        "std-s00": 0.857145858206734,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          0.8292764709656152,
          1.1810881936833002
        ],
        "std-s00": [
          0.7129055440282686,
          1.0259409489443134
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-en",
      "marker": "jitter",
      "label": "Jitter",
      "real": -0.008756060606060604,
      "d": -2.5269627319378594,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 1.052604256791833,
        "std-s00": 0.91936321162831,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          0.6052439387428169,
          1.6611898229778177
        ],
        "std-s00": [
          0.5638363237722365,
          1.4030059781059308
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-en",
      "marker": "shimmer",
      "label": "Shimmer",
      "real": -0.02976818181818182,
      "d": -2.440840321496136,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 1.1572759199877845,
        "std-s00": 0.8224665343309414,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          0.7962338026354546,
          1.6969525227557756
        ],
        "std-s00": [
          0.5303834138792956,
          1.2557585485445715
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-tl",
      "marker": "wer",
      "label": "ASR word error rate",
      "real": 0.5094757575757576,
      "d": 2.7126576020656117,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 0.29723363885634074,
        "std-s00": 0.4889339606368995,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          0.12830599788628297,
          0.4939955087467752
        ],
        "std-s00": [
          0.2627105357472642,
          0.8011529320354877
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-tl",
      "marker": "rate",
      "label": "Speaking rate",
      "real": -0.1373939393939394,
      "d": -0.38050374327013803,
      "reported": false,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-tl",
      "marker": "pauseRatio",
      "label": "Pause ratio",
      "real": 0.07098787878787877,
      "d": 0.5479796454645699,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 1.0261141466746353,
        "std-s00": 1.057692307692308,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          -2.1876700030283693,
          5.925326203851381
        ],
        "std-s00": [
          -3.5213101061270664,
          5.154589330650541
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-tl",
      "marker": "f0sd",
      "label": "Pitch variability",
      "real": -2.5989174242424258,
      "d": -1.4831911599292114,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 0.2972295282622044,
        "std-s00": 0.1730977146370092,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          0.07671664862574253,
          0.643334953631449
        ],
        "std-s00": [
          -0.1093457896055244,
          0.5509304965525983
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-tl",
      "marker": "hnr",
      "label": "Harmonics-to-noise",
      "real": 11.900541666666667,
      "d": 5.612996020963696,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 0.7760136968555355,
        "std-s00": 0.7150185740845133,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          0.6698116688257224,
          0.8972785783159278
        ],
        "std-s00": [
          0.6217227217954339,
          0.8343178788171828
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-tl",
      "marker": "jitter",
      "label": "Jitter",
      "real": -0.008756060606060604,
      "d": -2.5269627319378594,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 0.8403703062813637,
        "std-s00": 0.887956393839765,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          0.5795086119554202,
          1.2200108531044938
        ],
        "std-s00": [
          0.6447956603614512,
          1.2548338287074878
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F01",
      "condition": "clone-tl",
      "marker": "shimmer",
      "label": "Shimmer",
      "real": -0.02976818181818182,
      "d": -2.440840321496136,
      "reported": true,
      "matched": false,
      "nReal": [
        11,
        12
      ],
      "ratios": {
        "std-s05": 0.8574591540693237,
        "std-s00": 0.7986715529088412,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": [
          0.6398396029278081,
          1.1986014948666037
        ],
        "std-s00": [
          0.5824453000369115,
          1.1319345084319001
        ],
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-en",
      "marker": "wer",
      "label": "ASR word error rate",
      "real": 0.12204166666666667,
      "d": 1.037991376800556,
      "reported": true,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": 0.10501877773984293,
        "std-s00": 0.0,
        "sal-s05": 0.2567429156708775,
        "sal-s00": 0.30017070672584495
      },
      "ci90": {
        "std-s05": [
          0.0,
          0.37988910209308185
        ],
        "std-s00": [
          -1.176538536372288,
          1.1773873964123718
        ],
        "sal-s05": [
          -0.13392386966254444,
          0.938489494367424
        ],
        "sal-s00": [
          0.0,
          0.9243512818411422
        ]
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-en",
      "marker": "rate",
      "label": "Speaking rate",
      "real": 0.32710833333333333,
      "d": 0.5928884369788641,
      "reported": true,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": 1.2462232186074973,
        "std-s00": -0.010037449366929317,
        "sal-s05": -1.0230046111125257,
        "sal-s00": 0.29827019590858933
      },
      "ci90": {
        "std-s05": [
          -1.6264025526890993,
          5.909279177421169
        ],
        "std-s00": [
          -2.7996125719355214,
          2.9948298389957
        ],
        "sal-s05": [
          -5.625956197316082,
          2.2701037500422743
        ],
        "sal-s00": [
          -2.3798327605489864,
          3.6041829849369855
        ]
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-en",
      "marker": "pauseRatio",
      "label": "Pause ratio",
      "real": 0.006883333333333352,
      "d": 0.0465243634846345,
      "reported": false,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-en",
      "marker": "f0sd",
      "label": "Pitch variability",
      "real": -1.755875000000001,
      "d": -0.977822107926938,
      "reported": true,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": 0.3836928407014546,
        "std-s00": 0.3957286253292517,
        "sal-s05": 1.019472722526755,
        "sal-s00": 0.3781115777983432
      },
      "ci90": {
        "std-s05": [
          -0.42628966272369573,
          1.7686833238177455
        ],
        "std-s00": [
          -0.2998947159270191,
          1.5030613974427092
        ],
        "sal-s05": [
          0.37105835013785154,
          3.1812352201828715
        ],
        "sal-s00": [
          -0.5868696036449921,
          1.6061443919839151
        ]
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-en",
      "marker": "hnr",
      "label": "Harmonics-to-noise",
      "real": 0.6156416666666651,
      "d": 0.2566016757525164,
      "reported": false,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-en",
      "marker": "jitter",
      "label": "Jitter",
      "real": -0.0009833333333333326,
      "d": -0.2456322112565948,
      "reported": false,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-en",
      "marker": "shimmer",
      "label": "Shimmer",
      "real": 0.023408333333333337,
      "d": 1.1947071381291838,
      "reported": true,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": 0.29405482378070447,
        "std-s00": 0.643645425418298,
        "sal-s05": 0.5275898896404414,
        "sal-s00": 0.9241723033107868
      },
      "ci90": {
        "std-s05": [
          -0.12418187372233716,
          1.0296938029815843
        ],
        "std-s00": [
          0.20964584823718924,
          1.5755131876742121
        ],
        "sal-s05": [
          0.023021070683042093,
          1.4422862192736674
        ],
        "sal-s00": [
          0.4041593189419283,
          2.116526440402805
        ]
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-tl",
      "marker": "wer",
      "label": "ASR word error rate",
      "real": 0.12204166666666667,
      "d": 1.037991376800556,
      "reported": true,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": 0.9543188801638783,
        "std-s00": 0.6652782519631273,
        "sal-s05": 0.14796858996244458,
        "sal-s00": 0.3693410720382384
      },
      "ci90": {
        "std-s05": [
          0.1763788337360724,
          2.973786583808261
        ],
        "std-s00": [
          0.09423084877166163,
          2.173843216505674
        ],
        "sal-s05": [
          -0.5828620225528622,
          1.1455504971060553
        ],
        "sal-s00": [
          -0.11982534341890884,
          1.1713812799984722
        ]
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-tl",
      "marker": "rate",
      "label": "Speaking rate",
      "real": 0.32710833333333333,
      "d": 0.5928884369788641,
      "reported": true,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": -0.562937864621811,
        "std-s00": 0.04399663719970693,
        "sal-s05": -0.29781163223193147,
        "sal-s00": -0.9737854431508406
      },
      "ci90": {
        "std-s05": [
          -3.2345281817319176,
          1.1629294080975578
        ],
        "std-s00": [
          -1.0692847854826926,
          1.312171539361917
        ],
        "sal-s05": [
          -2.455337514254683,
          1.1938686119309478
        ],
        "sal-s00": [
          -4.360116866831258,
          2.493995247275161
        ]
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-tl",
      "marker": "pauseRatio",
      "label": "Pause ratio",
      "real": 0.006883333333333352,
      "d": 0.0465243634846345,
      "reported": false,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-tl",
      "marker": "f0sd",
      "label": "Pitch variability",
      "real": -1.755875000000001,
      "d": -0.977822107926938,
      "reported": true,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": 0.38285280368287355,
        "std-s00": 0.41063097695830575,
        "sal-s05": 0.43002301796350345,
        "sal-s00": 0.5964405211077095
      },
      "ci90": {
        "std-s05": [
          0.004587504363300121,
          1.3531279775022123
        ],
        "std-s00": [
          -0.02090011583801637,
          1.3903235589793943
        ],
        "sal-s05": [
          0.027976194765500777,
          1.457909087182484
        ],
        "sal-s00": [
          0.15352835942443305,
          1.8357176635013461
        ]
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-tl",
      "marker": "hnr",
      "label": "Harmonics-to-noise",
      "real": 0.6156416666666651,
      "d": 0.2566016757525164,
      "reported": false,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-tl",
      "marker": "jitter",
      "label": "Jitter",
      "real": -0.0009833333333333326,
      "d": -0.2456322112565948,
      "reported": false,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      },
      "ci90": {
        "std-s05": null,
        "std-s00": null,
        "sal-s05": null,
        "sal-s00": null
      }
    },
    {
      "speaker": "F03",
      "condition": "clone-tl",
      "marker": "shimmer",
      "label": "Shimmer",
      "real": 0.023408333333333337,
      "d": 1.1947071381291838,
      "reported": true,
      "matched": true,
      "nReal": [
        12,
        12
      ],
      "ratios": {
        "std-s05": 0.519045923816305,
        "std-s00": 0.32039871840512546,
        "sal-s05": 0.3638305446778209,
        "sal-s00": 0.5016019935920261
      },
      "ci90": {
        "std-s05": [
          0.18939580855756935,
          1.2073479445385356
        ],
        "std-s00": [
          0.02211681367285918,
          0.8636567269894099
        ],
        "sal-s05": [
          0.10528334449899479,
          0.9128159050863996
        ],
        "sal-s00": [
          0.24026978061604337,
          1.079922778892373
        ]
      }
    }
  ],
  "identity": [
    {
      "speaker": "F01",
      "variant": "std-s05",
      "condition": "clone-en",
      "own": 0.3256833333333333,
      "others": {
        "F03": 0.35378333333333334,
        "FC03": 0.04376666666666667
      }
    },
    {
      "speaker": "F01",
      "variant": "std-s05",
      "condition": "clone-tl",
      "own": 0.39615833333333333,
      "others": {
        "F03": 0.3756083333333333,
        "FC03": 0.025283333333333335
      }
    },
    {
      "speaker": "F01",
      "variant": "std-s00",
      "condition": "clone-en",
      "own": 0.31916666666666665,
      "others": {
        "F03": 0.35746666666666665,
        "FC03": -0.004716666666666667
      }
    },
    {
      "speaker": "F01",
      "variant": "std-s00",
      "condition": "clone-tl",
      "own": 0.39564166666666667,
      "others": {
        "F03": 0.3557666666666666,
        "FC03": 0.0344
      }
    },
    {
      "speaker": "F03",
      "variant": "std-s05",
      "condition": "clone-en",
      "own": 0.33273333333333327,
      "others": {
        "F01": 0.19336666666666666,
        "FC03": 0.11881666666666667
      }
    },
    {
      "speaker": "F03",
      "variant": "std-s05",
      "condition": "clone-tl",
      "own": 0.30599166666666666,
      "others": {
        "F01": 0.22093333333333331,
        "FC03": 0.05434166666666668
      }
    },
    {
      "speaker": "F03",
      "variant": "std-s00",
      "condition": "clone-en",
      "own": 0.33298333333333335,
      "others": {
        "F01": 0.19746666666666668,
        "FC03": 0.07105
      }
    },
    {
      "speaker": "F03",
      "variant": "std-s00",
      "condition": "clone-tl",
      "own": 0.3767416666666666,
      "others": {
        "F01": 0.24579166666666666,
        "FC03": 0.08016666666666666
      }
    },
    {
      "speaker": "F03",
      "variant": "sal-s05",
      "condition": "clone-en",
      "own": 0.42208333333333337,
      "others": {
        "F01": 0.19860000000000003,
        "FC03": 0.07698333333333333
      }
    },
    {
      "speaker": "F03",
      "variant": "sal-s05",
      "condition": "clone-tl",
      "own": 0.35430000000000006,
      "others": {
        "F01": 0.2702166666666667,
        "FC03": 0.064125
      }
    },
    {
      "speaker": "F03",
      "variant": "sal-s00",
      "condition": "clone-en",
      "own": 0.42979999999999996,
      "others": {
        "F01": 0.21018333333333336,
        "FC03": 0.10761666666666665
      }
    },
    {
      "speaker": "F03",
      "variant": "sal-s00",
      "condition": "clone-tl",
      "own": 0.33664999999999995,
      "others": {
        "F01": 0.26524166666666665,
        "FC03": 0.07079166666666667
      }
    },
    {
      "speaker": "FC03",
      "variant": "std-s05",
      "condition": "clone-en",
      "own": 0.3412,
      "others": {
        "F01": 0.14613333333333334,
        "F03": 0.059199999999999996
      }
    },
    {
      "speaker": "FC03",
      "variant": "std-s05",
      "condition": "clone-tl",
      "own": 0.243125,
      "others": {
        "F01": 0.13245833333333334,
        "F03": 0.10261666666666668
      }
    },
    {
      "speaker": "FC03",
      "variant": "std-s00",
      "condition": "clone-en",
      "own": 0.34321666666666667,
      "others": {
        "F01": 0.13899999999999998,
        "F03": 0.07323333333333333
      }
    },
    {
      "speaker": "FC03",
      "variant": "std-s00",
      "condition": "clone-tl",
      "own": 0.25589999999999996,
      "others": {
        "F01": 0.13189166666666666,
        "F03": 0.07875833333333333
      }
    },
    {
      "speaker": "FC03",
      "variant": "sal-s05",
      "condition": "clone-en",
      "own": 0.32865000000000005,
      "others": {
        "F01": 0.14176666666666668,
        "F03": 0.07515000000000001
      }
    },
    {
      "speaker": "FC03",
      "variant": "sal-s05",
      "condition": "clone-tl",
      "own": 0.31826666666666664,
      "others": {
        "F01": 0.14438333333333334,
        "F03": 0.11804166666666667
      }
    },
    {
      "speaker": "FC03",
      "variant": "sal-s00",
      "condition": "clone-en",
      "own": 0.32876666666666665,
      "others": {
        "F01": 0.15773333333333336,
        "F03": 0.08781666666666667
      }
    },
    {
      "speaker": "FC03",
      "variant": "sal-s00",
      "condition": "clone-tl",
      "own": 0.27963333333333334,
      "others": {
        "F01": 0.13369166666666668,
        "F03": 0.09142499999999999
      }
    }
  ],
  "kwfPilot": [
    {
      "voice": "FC03",
      "variant": "std-s05",
      "n": 12,
      "werPlain": 0.10618333333333334,
      "werKwf": 0.032575,
      "cerPlain": 0.021525,
      "cerKwf": 0.0069,
      "better": 4,
      "worse": 1
    },
    {
      "voice": "stock",
      "variant": "stock",
      "n": 12,
      "werPlain": 0.10420833333333333,
      "werKwf": 0.054799999999999995,
      "cerPlain": 0.02089166666666667,
      "cerKwf": 0.014408333333333334,
      "better": 4,
      "worse": 0
    },
    {
      "voice": "F03",
      "variant": "std-s05",
      "n": 12,
      "werPlain": 0.14546666666666666,
      "werKwf": 0.14904166666666666,
      "cerPlain": 0.04765833333333334,
      "cerKwf": 0.03719166666666667,
      "better": 4,
      "worse": 2
    }
  ],
  "variants": [
    "std-s05",
    "std-s00",
    "sal-s05",
    "sal-s00"
  ]
};
