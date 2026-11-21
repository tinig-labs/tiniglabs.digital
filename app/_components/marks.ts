// The logo family: file names and products. The files live in public/brand/ (see BRAND.md).
// Kept apart from brand.tsx so the Open Graph routes can use it without loading next/font.

export type MarkName = "tinig-labs" | "notebook" | "corpus";

/** primary on gatas, white or mint; reversed on pandan or tinta; mono for one-colour use */
export type MarkVariant = "primary" | "reversed" | "mono-ink" | "mono-white";

export function markSrc(name: MarkName, variant: MarkVariant = "primary") {
  return `/brand/${name}-mark${variant === "primary" ? "" : `-${variant}`}.svg`;
}

export const PRODUCTS = {
  notebook: { mark: "notebook", name: "notebook" },
  corpus: { mark: "corpus", name: "speech corpus" },
} as const satisfies Record<string, { mark: MarkName; name: string }>;

export type Product = keyof typeof PRODUCTS;
