import { Figtree, Montserrat } from "next/font/google";

export const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

// Brand name only: the wordmark and every mention of Tinig Labs
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});

export function Brand({ children = "tinig labs" }: { children?: string }) {
  return (
    <span className={`${montserrat.className} text-[0.94em] font-semibold tracking-[-0.01em]`}>
      {children}
    </span>
  );
}

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pandan)]";

export function Wordmark({ size = "md" }: { size?: "md" | "sm" }) {
  const mark = size === "md" ? "h-8 w-8" : "h-7 w-7";
  return (
    <span className="flex items-center gap-2.5">
      {/* logo.svg has unfilled (black) paths; masking lets it take the ink color */}
      <span
        aria-hidden="true"
        className={`${mark} shrink-0 bg-[var(--tinta)]`}
        style={{
          maskImage: "url(/logo.svg)",
          WebkitMaskImage: "url(/logo.svg)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
      <span
        className={`${montserrat.className} ${size === "md" ? "text-lg" : "text-base"} font-semibold tracking-[-0.02em]`}
      >
        tinig labs
      </span>
    </span>
  );
}
