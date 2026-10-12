"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { airIntelligence } from "@/content/site";

const C = 200; // centre of the 400×400 viewBox
const R = 140; // ring the pills sit on
const LOGO_R = 40; // where the connecting line meets the mark
// Pill positions, clockwise from the top (degrees, SVG y-axis points down).
const ANGLES = [-90, 0, 90, 180];

/*
 * Timing copied from fin.ai's flywheel (a Rive animation, measured frame by
 * frame). One loop is 9s; step k lights its pill at SWITCH[k] ms. Steps
 * alternate between two moves:
 * - "out" (STERILISE, LEARN): the arc waits at the pill, the mark lights, a
 *   line runs from the mark to the pill and the pill lights as it arrives.
 * - "in" (MEASURE, PROVE): the pill lights as the arc reaches it, then a line
 *   runs from the pill into the mark, which lights up.
 * The previous pill dims as the next one lights. A new arc then crawls slowly
 * on to the next pill while the old one collapses quickly into the lit pill.
 * All times below are ms relative to the step's SWITCH.
 */
const LOOP = 9000;
const SWITCH = [0, 2000, 4500, 6500];
const OUT = [true, false, true, false];
const T = {
  outLine: { at: -310, dur: 500, ease: bezier(0.5, 0, 0, 1) },
  inLine: { at: 50, dur: 590, ease: bezier(0.8, 0.2, 0.2, 0.9) },
  outLit: -335, // the mark lights before an "out" line leaves it
  inLit: 330, // …or as an "in" line reaches it
  unlit: 1080,
  lineGone: { at: 1250, dur: 200 }, // the line slides back into the pill
  crawlFrom: 400, // the new arc sets off for the next pill
  waitAtOut: 440, // the arc waits this long at an "out" pill
  collapse: { at: 430, dur: 200, ease: bezier(0.5, 0.1, 0.3, 0.9) },
};
/** A settled moment for pill k: lit, connected, arc in. Used to start and on click. */
const settledAt = (k: number) => SWITCH[k] + (OUT[k] ? 200 : 650);

type Geometry = { edge: number[]; inner: number[] }; // per pill: half-width on the ring (deg), radius of its inner edge
type Frame = { active: number; lit: boolean; arcs: [number, number][]; line: [number, number, number] | null }; // line: pill, from r, to r

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const rel = (t: number, s: number) => ((((t - s) % LOOP) + LOOP * 1.5) % LOOP) - LOOP / 2;
const stepLength = (k: number) => (SWITCH[(k + 1) % 4] - SWITCH[k] + LOOP) % LOOP;

/** CSS-style cubic-bezier easing. */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const at = (a: number, b: number, t: number) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
  return (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const slope = 3 * x1 * (1 - t) ** 2 + 6 * (x2 - x1) * t * (1 - t) + 3 * (1 - x2) * t * t;
      if (Math.abs(slope) < 1e-6) break;
      t = clamp01(t - (at(x1, x2, t) - x) / slope);
    }
    return at(y1, y2, t);
  };
}

function frameAt(t: number, g: Geometry): Frame {
  const f: Frame = { active: 0, lit: false, arcs: [], line: null };
  for (let k = 0; k < 4; k++) {
    const dt = rel(t, SWITCH[k]);
    const len = stepLength(k);
    const next = (k + 1) % 4;
    if (dt >= 0 && dt < len) f.active = k;
    if (dt >= (OUT[k] ? T.outLit : T.inLit) && dt < T.unlit) f.lit = true;

    // Line between the mark and pill k (its outer end tucked under the pill).
    const tip = g.inner[k] + 3;
    const span = tip - LOGO_R;
    const grow = OUT[k] ? T.outLine : T.inLine;
    const p = grow.ease(clamp01((dt - grow.at) / grow.dur));
    const gone = clamp01((dt - T.lineGone.at) / T.lineGone.dur) ** 3;
    if (p > 0 && gone < 1) {
      const from = OUT[k] ? LOGO_R : tip - span * p;
      const to = OUT[k] ? LOGO_R + span * p : tip;
      f.line = [k, Math.max(from, LOGO_R + span * gone), to];
    }

    // Arc from pill k to the next one; its ends hide under the pills.
    if (dt < T.crawlFrom) continue;
    const start = ANGLES[k] + g.edge[k];
    const end = ANGLES[k] + 90 - g.edge[next];
    const arrive = len - (OUT[next] ? T.waitAtOut : 0);
    const since = dt - len; // time since the next pill lit
    let head = start + (end - start) * clamp01((dt - T.crawlFrom) / (arrive - T.crawlFrom));
    let tail = ANGLES[k];
    if (since >= 0) head = ANGLES[k] + 90;
    if (since >= T.collapse.at) {
      const c = T.collapse.ease(clamp01((since - T.collapse.at) / T.collapse.dur));
      if (c >= 1) continue;
      tail = start + (end - start) * c;
    }
    f.arcs.push([tail, head]);
  }
  return f;
}

/** Pill k lit and connected, with the arc in from the previous pill. */
const staticFrame = (k: number): Frame => ({ active: k, lit: true, arcs: [[ANGLES[k] - 90, ANGLES[k]]], line: [k, LOGO_R, R] });

const point = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: +(C + r * Math.cos(a)).toFixed(2), y: +(C + r * Math.sin(a)).toFixed(2) };
};
const arcPath = (arc?: [number, number]) => {
  if (!arc || arc[1] - arc[0] < 0.05) return "";
  const a = point(arc[0], R);
  const b = point(arc[1], R);
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`;
};
const linePath = (line: Frame["line"]) => {
  if (!line) return "";
  const a = point(ANGLES[line[0]], line[1]);
  const b = point(ANGLES[line[0]], line[2]);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
};

const FIRST = staticFrame(0);

/** Sterilise → Measure → Learn → Prove loop (after Fin's flywheel). */
export function LoopDiagram() {
  const steps = airIntelligence.loop;
  const [active, setActive] = useState(FIRST.active);
  const [lit, setLit] = useState(FIRST.lit);
  const boxRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const arcRefs = useRef<(SVGPathElement | null)[]>([]);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const shown = useRef({ active: FIRST.active, lit: FIRST.lit });
  const paused = useRef(false);
  const seek = useRef<number | null>(null);
  const reduced = useRef(false);

  // Paths are written straight to the DOM each frame; React only re-renders
  // when the lit pill or the mark changes.
  const draw = useCallback((f: Frame) => {
    lineRef.current?.setAttribute("d", linePath(f.line));
    arcRefs.current.forEach((el, i) => el?.setAttribute("d", arcPath(f.arcs[i])));
    if (f.active !== shown.current.active) setActive((shown.current.active = f.active));
    if (f.lit !== shown.current.lit) setLit((shown.current.lit = f.lit));
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    // Where the ring and the line meet each pill, in viewBox units.
    const g: Geometry = { edge: [14, 6, 10, 6], inner: [R, R, R, R] };
    const measure = () => {
      const s = 400 / box.clientWidth;
      pillRefs.current.forEach((el, k) => {
        if (!el) return;
        const halfW = (el.offsetWidth / 2) * s;
        const halfH = (el.offsetHeight / 2) * s;
        const across = k % 2 === 0 ? halfW : halfH;
        g.edge[k] = (Math.asin(Math.min(1, across / R)) * 180) / Math.PI + 1;
        g.inner[k] = R - (k % 2 === 0 ? halfH : halfW);
      });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(box);

    let t = settledAt(0);
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (seek.current !== null) {
        t = seek.current;
        seek.current = null;
      } else if (!paused.current && last) {
        t = (t + Math.min(now - last, 100)) % LOOP;
      }
      last = now;
      draw(frameAt(t, g));
    };
    // Plays only while on screen (Fin: playOnInView + pauseOffscreen).
    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        last = 0;
        if (entry.isIntersecting) raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    io.observe(box);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [draw]);

  const select = (k: number) => {
    if (reduced.current) draw(staticFrame(k));
    else seek.current = settledAt(k);
  };

  return (
    <figure
      className="rounded-2xl bg-chalk px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div ref={boxRef} className="relative mx-auto aspect-square w-full max-w-[440px]">
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" fill="none" aria-hidden>
          <circle cx={C} cy={C} r={186} className="stroke-ink/25" strokeWidth="1" strokeDasharray="2 5" />
          <circle cx={C} cy={C} r={R} className="stroke-ink/30" strokeWidth="1" />
          <circle cx={C} cy={C} r={92} className="stroke-ink/10" strokeWidth="1" />
          <path ref={lineRef} d={linePath(FIRST.line)} className="stroke-sky" strokeWidth="1.5" />
          {[0, 1].map((i) => (
            <path
              key={i}
              ref={(el) => {
                arcRefs.current[i] = el;
              }}
              d={arcPath(FIRST.arcs[i])}
              className="stroke-sky"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {/* Grey at rest, brand colour while connected (Fin's mark goes black → orange). */}
        <Image
          src="/brand/sas-mark.png"
          alt=""
          width={249}
          height={233}
          className={`absolute left-1/2 top-1/2 w-[17%] -translate-x-1/2 -translate-y-1/2 transition-[filter] duration-200 motion-reduce:transition-none ${
            lit ? "grayscale-0" : "grayscale"
          }`}
        />

        {steps.map((step, i) => {
          const p = point(ANGLES[i], R);
          const on = i === active;
          return (
            <button
              key={step.label}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              type="button"
              aria-pressed={on}
              onClick={() => select(i)}
              style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%` }}
              className={`t-label absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 transition-colors motion-reduce:transition-none ${
                on ? "border-sky bg-sky text-ink duration-100" : "border-ink/25 bg-sheet text-ink/75 duration-300 hover:border-ink/50"
              }`}
            >
              {step.label}
            </button>
          );
        })}
      </div>

      <figcaption className="t-body mx-auto mt-6 max-w-[440px] text-center">{airIntelligence.loopCaption}</figcaption>
    </figure>
  );
}
