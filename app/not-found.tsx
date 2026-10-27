import Link from "next/link";
import { focusRing } from "./_components/brand";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-28 pt-16 sm:px-10 lg:pt-24">
      <h1 className="max-w-[16ch] text-[2.5rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem]">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-[var(--abo)]">
        The link may be broken, or the page may have moved.
      </p>
      <Link
        href="/"
        className={`mt-10 inline-flex h-14 items-center rounded-2xl bg-[var(--pandan)] px-7 text-base font-semibold text-white transition-colors hover:bg-[#185A42] ${focusRing}`}
      >
        Go to the home page
      </Link>
    </main>
  );
}
