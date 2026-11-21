import { Figtree, Montserrat } from "next/font/google";
import { type MarkName, type MarkVariant, PRODUCTS, type Product, markSrc } from "./marks";

export { PRODUCTS, markSrc, type MarkName, type MarkVariant, type Product };

export const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

// Brand name only: the wordmark and every mention of tinig labs
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});

export function Brand({ children = "tinig labs" }: { children?: string }) {
  return (
    <span className={`${montserrat.className} text-[0.94em] font-semibold tracking-[-0.02em]`}>
      {children}
    </span>
  );
}

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pandan)]";

/* ------------------------------------------------------------------ */
/* The logo family (files in public/brand/, see BRAND.md)              */
/* ------------------------------------------------------------------ */

// Below 32 px the Arch n's gradient turns muddy, so it switches to the mono version
function variantFor(name: MarkName, variant: MarkVariant, size: number): MarkVariant {
  if (name !== "notebook" || size >= 32) return variant;
  if (variant === "primary") return "mono-ink";
  if (variant === "reversed") return "mono-white";
  return variant;
}

/**
 * One of the three marks, drawn from its file. An <img> keeps each SVG's own
 * colours and its mask and gradient ids separate from the page.
 * Decorative by default: pass `alt` when the mark stands on its own.
 */
export function Mark({
  name = "tinig-labs",
  variant = "primary",
  size = 32,
  alt = "",
  className = "",
}: {
  name?: MarkName;
  variant?: MarkVariant;
  size?: number;
  alt?: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static SVGs, nothing to optimise
    <img
      src={markSrc(name, variantFor(name, variant, size))}
      width={size}
      height={size}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      decoding="async"
      className={`block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** The Echo t, the mark for tinig labs as a whole */
export function LogoMark({ size = 32, variant = "primary" }: { size?: number; variant?: MarkVariant }) {
  return <Mark name="tinig-labs" size={size} variant={variant} />;
}

// Lockup proportions from the guide: mark 1.75× the wordmark's size, gap about 0.55×
const LOCKUP = {
  md: { mark: 32, text: "text-lg", gap: "gap-2.5", product: "text-sm" },
  sm: { mark: 28, text: "text-base", gap: "gap-2", product: "text-xs" },
} as const;

type Tone = "light" | "dark";

function wordmarkInk(tone: Tone) {
  return tone === "dark" ? "text-[var(--gatas)]" : "text-[var(--tinta)]";
}

/** Echo t + "tinig labs" in Montserrat 600 */
export function Wordmark({ size = "md", tone = "light" }: { size?: "md" | "sm"; tone?: Tone }) {
  const s = LOCKUP[size];
  return (
    <span className={`flex items-center ${s.gap}`}>
      <LogoMark size={s.mark} variant={tone === "dark" ? "reversed" : "primary"} />
      <span className={`${montserrat.className} ${s.text} ${wordmarkInk(tone)} font-semibold leading-none tracking-[-0.02em]`}>
        tinig labs
      </span>
    </span>
  );
}

/** Product mark + "tinig labs" in Montserrat 600 + the product name in Figtree 500, in abo */
export function ProductLockup({
  product,
  size = "md",
  tone = "light",
}: {
  product: Product;
  size?: "md" | "sm";
  tone?: Tone;
}) {
  const s = LOCKUP[size];
  const p = PRODUCTS[product];
  return (
    <span className={`flex items-center ${s.gap}`}>
      <Mark name={p.mark} size={s.mark} variant={tone === "dark" ? "reversed" : "primary"} />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className={`${montserrat.className} ${s.text} ${wordmarkInk(tone)} font-semibold tracking-[-0.02em]`}>
          tinig labs
        </span>
        <span
          className={`${s.product} font-medium ${tone === "dark" ? "text-[var(--mint)]" : "text-[var(--abo)]"}`}
        >
          {p.name}
        </span>
      </span>
    </span>
  );
}

/** A product's mark at its minimum size, for nav links and pills */
export function ProductMark({ product, size = 24 }: { product: Product; size?: number }) {
  return <Mark name={PRODUCTS[product].mark} size={size} />;
}
