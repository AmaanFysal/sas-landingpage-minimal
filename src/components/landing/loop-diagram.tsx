"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { airIntelligence } from "@/content/site";

const STEP_MS = 3000;
const C = 200; // centre of the 400×400 viewBox
const R = 140; // circle the pills sit on
// Pill positions, clockwise from the top (degrees, SVG y-axis points down).
const ANGLES = [-90, 0, 90, 180];

const point = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
};

/** Quarter arc from one pill to the next, drawn clockwise. */
function arcPath(from: number) {
  const a = point(ANGLES[from]);
  const b = point(ANGLES[from] + 90);
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`;
}

/** Sterilise → Measure → Learn → Prove loop (after Fin's flywheel). */
export function LoopDiagram() {
  const steps = airIntelligence.loop;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % steps.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [paused, steps.length]);

  return (
    <figure
      className="rounded-2xl bg-chalk px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative mx-auto aspect-square w-full max-w-[440px]">
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" fill="none" aria-hidden>
          <circle cx={C} cy={C} r={186} className="stroke-ink/25" strokeWidth="1" strokeDasharray="2 5" />
          <circle cx={C} cy={C} r={R} className="stroke-ink/30" strokeWidth="1" />
          <circle cx={C} cy={C} r={92} className="stroke-ink/10" strokeWidth="1" />
          <path key={active} d={arcPath(active)} pathLength={1} className="loop-arc stroke-sky" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        <Image
          src="/brand/sas-mark.png"
          alt=""
          width={249}
          height={233}
          className="absolute left-1/2 top-1/2 w-[17%] -translate-x-1/2 -translate-y-1/2"
        />

        {steps.map((step, i) => {
          const p = point(ANGLES[i]);
          const on = i === active;
          return (
            <button
              key={step.label}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(i)}
              style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%` }}
              className={`t-label absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 transition-colors motion-reduce:transition-none ${
                on ? "border-sky bg-sky text-ink" : "border-ink/25 bg-sheet text-ink/75 hover:border-ink/50"
              }`}
            >
              {step.label}
            </button>
          );
        })}
      </div>

      {/* One caption that follows the active pill (decorative for screen readers). */}
      <figcaption aria-hidden className="mx-auto mt-6 flex min-h-[3rem] max-w-[440px] items-start gap-3 motion-reduce:hidden">
        <span className="t-label shrink-0 pt-[0.3em] text-sky-ink">{steps[active].label}</span>
        <span className="t-body">{steps[active].caption}</span>
      </figcaption>

      {/* All four captions: shown as a list when motion is reduced, always read by screen readers. */}
      <ul className="sr-only motion-reduce:not-sr-only motion-reduce:mx-auto motion-reduce:mt-6 motion-reduce:max-w-[440px] motion-reduce:space-y-3">
        {steps.map((step) => (
          <li key={step.label} className="flex items-start gap-3">
            <span className="t-label w-20 shrink-0 pt-[0.3em] text-sky-ink">{step.label}</span>
            <span className="t-body">{step.caption}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
