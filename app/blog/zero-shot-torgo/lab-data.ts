// Everything on the post that changes as the experiment runs.
// The experiment repo (zero-shot-torgo/scripts/export_blog.py) rewrites RESULTS and CLIPS.

export type Phase = { label: string; done: boolean };

export const PHASES: Phase[] = [
  { label: "Read the study and plan the replication", done: true },
  { label: "Download TORGO and pick two speakers", done: true },
  { label: "Build reference and held-out sets", done: true },
  { label: "Write Tagalog prompts and have them checked", done: true },
  { label: "Clone both voices and generate speech", done: true },
  { label: "Measure similarity, intelligibility and dysarthria markers", done: true },
  { label: "Listening test with SLPs and native Tagalog listeners", done: false },
];

/** A synthetic clip served from public/blog/zero-shot-torgo/ */
export type Clip = {
  speaker: string;
  condition: "clone-en" | "clone-tl-v3" | "clone-tl-v2" | "stock-tl";
  text: string;
  file: string;
};

export const CLIPS: Clip[] = [
  { speaker: "F03", condition: "clone-en", text: "The quick brown fox jumps over the lazy dog.", file: "F03-clone-en-h03.mp3" },
  { speaker: "F03", condition: "clone-en", text: "Twice each day he plays skillfully and with zest upon our small organ.", file: "F03-clone-en-h10.mp3" },
  { speaker: "F03", condition: "clone-tl-v3", text: "Tumalon ang mabilis na kayumangging soro sa ibabaw ng tamad na aso.", file: "F03-clone-tl-v3-t03.mp3" },
  { speaker: "F03", condition: "clone-tl-v3", text: "Ang pakikipagkapwa-tao ay mahalaga sa kulturang Pilipino.", file: "F03-clone-tl-v3-p07.mp3" },
  { speaker: "F03", condition: "clone-tl-v2", text: "Tumalon ang mabilis na kayumangging soro sa ibabaw ng tamad na aso.", file: "F03-clone-tl-v2-t03.mp3" },
  { speaker: "F03", condition: "clone-tl-v2", text: "Ang pakikipagkapwa-tao ay mahalaga sa kulturang Pilipino.", file: "F03-clone-tl-v2-p07.mp3" },
  { speaker: "FC03", condition: "clone-en", text: "The quick brown fox jumps over the lazy dog.", file: "FC03-clone-en-h03.mp3" },
  { speaker: "FC03", condition: "clone-en", text: "Twice each day he plays skillfully and with zest upon our small organ.", file: "FC03-clone-en-h10.mp3" },
  { speaker: "FC03", condition: "clone-tl-v3", text: "Tumalon ang mabilis na kayumangging soro sa ibabaw ng tamad na aso.", file: "FC03-clone-tl-v3-t03.mp3" },
  { speaker: "FC03", condition: "clone-tl-v3", text: "Ang pakikipagkapwa-tao ay mahalaga sa kulturang Pilipino.", file: "FC03-clone-tl-v3-p07.mp3" },
  { speaker: "FC03", condition: "clone-tl-v2", text: "Tumalon ang mabilis na kayumangging soro sa ibabaw ng tamad na aso.", file: "FC03-clone-tl-v2-t03.mp3" },
  { speaker: "FC03", condition: "clone-tl-v2", text: "Ang pakikipagkapwa-tao ay mahalaga sa kulturang Pilipino.", file: "FC03-clone-tl-v2-p07.mp3" },
  { speaker: "stock", condition: "stock-tl", text: "Ang pakikipagkapwa-tao ay mahalaga sa kulturang Pilipino.", file: "stock-tl-p07.mp3" },
  { speaker: "stock", condition: "stock-tl", text: "Tumalon ang mabilis na kayumangging soro sa ibabaw ng tamad na aso.", file: "stock-tl-t03.mp3" },
];

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
  jitter?: number | null;
  shimmer?: number | null;
};

export type Transfer = {
  marker: string;
  label: string;
  /** F03 minus FC03 on real English */
  real: number | null;
  /** Cohen's d of that real gap */
  d: number | null;
  /** false when the real speakers barely differ, so a ratio would mean nothing */
  reported: boolean;
  ratios: Record<string, number | null>;
  /** 90% bootstrap interval per condition */
  ci90: Record<string, [number, number] | null>;
};

export type Results = { rows: Row[]; transfer: Transfer[] };

export const RESULTS: Results | null = {
  "rows": [
    {
      "speaker": "F03",
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
      "condition": "clone-en",
      "n": 12,
      "similarity": 0.33232500000000004,
      "wer": 0.023075000000000002,
      "cer": 0.011625000000000002,
      "rate": 4.0848249999999995,
      "pauseRatio": 0.0,
      "f0sd": 3.079466666666667,
      "hnr": 15.125375,
      "jitter": 0.015424999999999996,
      "shimmer": 0.07241666666666667
    },
    {
      "speaker": "F03",
      "condition": "clone-tl-v3",
      "n": 22,
      "similarity": 0.3312636363636363,
      "wer": 0.14395454545454545,
      "cer": 0.03962272727272727,
      "rate": 4.408922727272728,
      "pauseRatio": 0.03014545454545454,
      "f0sd": 3.2383454545454544,
      "hnr": 15.704927272727275,
      "jitter": 0.015200000000000002,
      "shimmer": 0.07654545454545456
    },
    {
      "speaker": "F03",
      "condition": "clone-tl-v2",
      "n": 22,
      "similarity": 0.4986954545454546,
      "wer": 0.06549545454545455,
      "cer": 0.020595454545454545,
      "rate": 5.087872727272728,
      "pauseRatio": 0.05034090909090909,
      "f0sd": 2.5309500000000003,
      "hnr": 16.319863636363635,
      "jitter": 0.013581818181818183,
      "shimmer": 0.09039545454545453
    },
    {
      "speaker": "FC03",
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
      "condition": "clone-en",
      "n": 12,
      "similarity": 0.3530166666666667,
      "wer": 0.0,
      "cer": 0.0,
      "rate": 3.6473750000000003,
      "pauseRatio": 0.0036333333333333335,
      "f0sd": 4.5325,
      "hnr": 14.0573,
      "jitter": 0.016283333333333334,
      "shimmer": 0.06530833333333334
    },
    {
      "speaker": "FC03",
      "condition": "clone-tl-v3",
      "n": 22,
      "similarity": 0.2551318181818182,
      "wer": 0.1065272727272727,
      "cer": 0.024913636363636363,
      "rate": 4.420213636363636,
      "pauseRatio": 0.005504545454545455,
      "f0sd": 4.167504545454545,
      "hnr": 15.285690909090908,
      "jitter": 0.016213636363636364,
      "shimmer": 0.06962272727272728
    },
    {
      "speaker": "FC03",
      "condition": "clone-tl-v2",
      "n": 22,
      "similarity": 0.5003136363636363,
      "wer": 0.09717272727272727,
      "cer": 0.036186363636363635,
      "rate": 5.154486363636364,
      "pauseRatio": 0.0,
      "f0sd": 4.609063636363637,
      "hnr": 14.400950000000002,
      "jitter": 0.01862727272727273,
      "shimmer": 0.07715454545454545
    },
    {
      "speaker": "stock-vs-F03",
      "condition": "stock-tl",
      "n": 22,
      "similarity": 0.10978181818181816,
      "wer": 0.1028909090909091,
      "cer": 0.024577272727272725,
      "rate": 5.489172727272727,
      "pauseRatio": 0.021763636363636363,
      "f0sd": 3.269636363636364,
      "hnr": 14.667818181818184,
      "jitter": 0.020263636363636362,
      "shimmer": 0.0863409090909091
    },
    {
      "speaker": "stock-vs-FC03",
      "condition": "stock-tl",
      "n": 22,
      "similarity": 0.06911363636363635,
      "wer": 0.1028909090909091,
      "cer": 0.024577272727272725,
      "rate": 5.489172727272727,
      "pauseRatio": 0.021763636363636363,
      "f0sd": 3.269636363636364,
      "hnr": 14.667818181818184,
      "jitter": 0.020263636363636362,
      "shimmer": 0.0863409090909091
    }
  ],
  "transfer": [
    {
      "marker": "wer",
      "label": "ASR word error rate",
      "real": 0.12204166666666667,
      "d": 1.037991376800556,
      "reported": true,
      "ratios": {
        "clone-en": 0.18907476954592012,
        "clone-tl-v3": 0.30667618485986536,
        "clone-tl-v2": -0.2595611285266457
      },
      "ci90": {
        "clone-en": [
          0.0,
          0.6151535417014837
        ],
        "clone-tl-v3": [
          -0.22606161382206272,
          1.2119257688968768
        ],
        "clone-tl-v2": [
          -1.0386123282626816,
          0.32650325009543035
        ]
      }
    },
    {
      "marker": "rate",
      "label": "Speaking rate",
      "real": 0.32710833333333333,
      "d": 0.5928884369788641,
      "reported": true,
      "ratios": {
        "clone-en": 1.3373245357042751,
        "clone-tl-v3": -0.03451733857052902,
        "clone-tl-v2": -0.20364396004474303
      },
      "ci90": {
        "clone-en": [
          -1.8406639084247074,
          6.935321009482724
        ],
        "clone-tl-v3": [
          -1.2012344210546408,
          1.1726925254915403
        ],
        "clone-tl-v2": [
          -2.0820307414394223,
          1.2956460984931635
        ]
      }
    },
    {
      "marker": "pauseRatio",
      "label": "Pause ratio",
      "real": 0.006883333333333352,
      "d": 0.0465243634846345,
      "reported": false,
      "ratios": {
        "clone-en": null,
        "clone-tl-v3": null,
        "clone-tl-v2": null
      },
      "ci90": {
        "clone-en": null,
        "clone-tl-v3": null,
        "clone-tl-v2": null
      }
    },
    {
      "marker": "f0sd",
      "label": "Pitch variability",
      "real": -1.755875000000001,
      "d": -0.977822107926938,
      "reported": true,
      "ratios": {
        "clone-en": 0.8275266367670433,
        "clone-tl-v3": 0.5291715474672684,
        "clone-tl-v2": 1.1835202599066768
      },
      "ci90": {
        "clone-en": [
          0.2626149882091196,
          2.369994917453501
        ],
        "clone-tl-v3": [
          0.1782642073672278,
          1.752025054019528
        ],
        "clone-tl-v2": [
          0.632496106396622,
          3.6915999206920844
        ]
      }
    },
    {
      "marker": "hnr",
      "label": "Harmonics-to-noise",
      "real": 0.6156416666666651,
      "d": 0.2566016757525164,
      "reported": false,
      "ratios": {
        "clone-en": null,
        "clone-tl-v3": null,
        "clone-tl-v2": null
      },
      "ci90": {
        "clone-en": null,
        "clone-tl-v3": null,
        "clone-tl-v2": null
      }
    },
    {
      "marker": "jitter",
      "label": "Jitter",
      "real": -0.0009833333333333326,
      "d": -0.2456322112565948,
      "reported": false,
      "ratios": {
        "clone-en": null,
        "clone-tl-v3": null,
        "clone-tl-v2": null
      },
      "ci90": {
        "clone-en": null,
        "clone-tl-v3": null,
        "clone-tl-v2": null
      }
    },
    {
      "marker": "shimmer",
      "label": "Shimmer",
      "real": 0.023408333333333337,
      "d": 1.1947071381291838,
      "reported": true,
      "ratios": {
        "clone-en": 0.3036667853328584,
        "clone-tl-v3": 0.2957377261400046,
        "clone-tl-v2": 0.5656493737661408
      },
      "ci90": {
        "clone-en": [
          -0.036892059978341205,
          0.8583286675005594
        ],
        "clone-tl-v3": [
          0.10506748318867636,
          0.7444706201981427
        ],
        "clone-tl-v2": [
          0.2854901255429975,
          1.2632112131654765
        ]
      }
    }
  ]
};
