"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1600; // ms
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Stat number that counts up from zero once, when it is ~12% above the bottom
 * of the viewport (owner request). Only the digits count; any prefix or suffix
 * ("£", "k+") stays put, and values like "24/7" don't count at all. The final
 * value reserves the width so nothing shifts, screen readers get the final
 * value, and before JS loads or under `prefers-reduced-motion` the final value
 * simply shows.
 */
export function CountUp({ value }: { value: string }) {
  const [, prefix = "", digits = "", suffix = ""] = value.match(/^(\D*)(\d+)(.*)$/) ?? [];
  // Only plain numbers count; a value like "24/7" (digits after the number) stays still.
  const counts = digits !== "" && !/\d/.test(suffix);
  const target = Number(digits);
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !counts || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCurrent(0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          setCurrent(Math.round(easeOutCubic(t) * target));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [counts, target]);

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden className="invisible">
        {value}
      </span>
      <span aria-hidden className="absolute inset-y-0 left-0 whitespace-nowrap">
        {current === null ? value : `${prefix}${current}${suffix}`}
      </span>
    </span>
  );
}
