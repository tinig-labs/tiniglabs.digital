"use client";

import { useEffect, useState } from "react";
import { focusRing } from "../_components/brand";

// The "On this page" list beside a post. Marks the section being read.
export function PostToc({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      // The last heading that has scrolled past the top third of the screen
      const line = window.innerHeight / 3;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      // Short last sections never reach that line, so the page bottom selects the last one
      const { scrollHeight } = document.documentElement;
      if (window.scrollY + window.innerHeight >= scrollHeight - 2) current = sections.at(-1)?.id ?? current;
      setActive(current);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <nav aria-labelledby="post-toc-title">
      <p id="post-toc-title" className="text-sm font-semibold text-[var(--tinta)]">
        On this page
      </p>
      <ul className="mt-4 border-l border-[var(--tinta)]/10">
        {sections.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={[
                  "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors",
                  on
                    ? "border-[var(--pandan)] font-semibold text-[var(--pandan)]"
                    : "border-transparent font-medium text-[var(--abo)] hover:text-[var(--tinta)]",
                  focusRing,
                ].join(" ")}
              >
                {s.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
