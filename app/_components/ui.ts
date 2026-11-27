import { focusRing } from "./brand";

// Shared button, pill, card and link styles, so every page draws them the same way.
// Radii follow the brand tokens: radius-sm 8 (rounded-lg), radius-md 16 (rounded-2xl),
// radius-lg 24 (rounded-3xl), radius-pill (rounded-full). Spacing stays on 4/8/12/16/24/32.

const buttonBase =
  "inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold transition-[background-color,color,transform] duration-150 active:translate-y-px";

/** Pandan fill, white text (6.4:1) */
export const buttonPrimary = `${buttonBase} bg-[var(--pandan)] text-white hover:bg-[#185A42] ${focusRing}`;

/** Outline on gatas or white, mint on hover */
export const buttonSecondary = `${buttonBase} bg-transparent text-[var(--pandan)] ring-1 ring-inset ring-[var(--pandan)]/25 hover:bg-[var(--mint)] hover:ring-[var(--pandan)]/40 ${focusRing}`;

/** For pandan surfaces: gatas fill, pandan text */
export const buttonOnPandan =
  `${buttonBase} bg-[var(--gatas)] text-[var(--pandan)] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gatas)]`;

/** Full width on phones, natural width from sm up */
export const buttonBlock = "w-full sm:w-auto";

/** Mint pill with pandan text (5.6:1) */
export const pill =
  `inline-flex min-h-9 items-center gap-2 rounded-full bg-[var(--mint)] py-1.5 pl-1.5 pr-3.5 text-sm font-semibold text-[var(--pandan)] transition-colors hover:bg-[#CDEBDD] ${focusRing}`;

/** Large card: radius-lg, padding 24 on phones and 32 from sm up */
export const card = "rounded-3xl p-6 sm:p-8";

export const textLink = `rounded-sm font-semibold text-[var(--pandan)] underline-offset-4 hover:underline ${focusRing}`;

/** Inline link inside running text */
export const proseLink = `rounded-sm font-medium text-[var(--pandan)] underline underline-offset-4 hover:text-[#185A42] ${focusRing}`;

/** The site's outer frame: fills the screen up to 128rem, with wider gutters on large screens */
export const frame = "mx-auto w-full max-w-[128rem] px-5 sm:px-10 lg:px-16 2xl:px-24";

/** Short label above a section heading */
export const eyebrow = "text-sm font-semibold text-[var(--pandan)]";
