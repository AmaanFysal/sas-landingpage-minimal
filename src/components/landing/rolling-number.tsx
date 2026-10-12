"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Section number whose digits slide up into view once, as on the fin.ai
 * homepage: each digit is masked, starts 1em low and transparent, and the
 * next digit follows 80ms later. Triggers when the number is ~12% above the
 * bottom of the viewport. Styles live in globals.css (`.roll-digit`).
 */
export function RollingNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} data-shown={shown || undefined} className="roll-number inline-flex overflow-hidden">
      {[...value].map((digit, i) => (
        <span key={i} className="roll-digit inline-block" style={{ transitionDelay: `${i * 80}ms` }}>
          {digit}
        </span>
      ))}
    </span>
  );
}
