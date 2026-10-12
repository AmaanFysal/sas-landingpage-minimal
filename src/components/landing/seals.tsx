// Seals for the standards tiles, redrawn after the RESET and WELL marks
// (owner request): white line work and lettering on a frosted disc.
// The WELL seal reads "v2 ALIGNED", matching the approved claim, rather
// than the "Health-Safety Rated" seal text, which is a separate rating.
// Geometry lives in a 200×200 box; angles are SVG degrees (0 = 3 o'clock,
// clockwise).

type Props = { className?: string };

const C = 100;
const pt = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [+(C + r * Math.cos(a)).toFixed(2), +(C + r * Math.sin(a)).toFixed(2)];
};
/** Clockwise arc from `a0` to `a1` degrees at radius `r`. */
const arc = (a0: number, a1: number, r: number) => {
  const [x0, y0] = pt(a0, r);
  const [x1, y1] = pt(a1, r);
  return `M${x0} ${y0}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
};

function Disc({ id, from, to }: { id: string; from: string; to: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0.15" y1="0.1" x2="0.85" y2="0.95">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.38" cy="0.32" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={C} cy={C} r="98" fill={`url(#${id})`} />
      <circle cx={C} cy={C} r="98" fill={`url(#${id}-glow)`} />
    </>
  );
}

/** RESET International Standard: clock-hand ring, curved tagline, R E S E T. */
export function ResetMark({ className }: Props) {
  const r = 84;
  const capY = 86.5; // cap height line of the big letters
  const side = (Math.asin((capY - C) / r) * 180) / Math.PI; // ring meets the cap line
  const [rx, ry] = pt(side, r);
  const [lx] = pt(180 - side, r);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <Disc id="reset-disc" from="#9aa0a6" to="#5d6267" />
      <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
        {/* top-left quarter and the hand dropping from 12 o'clock */}
        <path d={`${arc(204, 270, r)}V66`} strokeLinejoin="round" />
        {/* lower ring, 3 o'clock round to 9, with the stubs at cap height */}
        <path d={`M${rx - 17} ${ry}H${rx}${arc(side, 180 - side, r).replace(/^M[^A]+/, "")}H${lx + 11}`} strokeLinejoin="round" />
      </g>
      <path id="reset-tagline" d={arc(-86, -14, r - 2.4)} fill="none" />
      <text fill="#fff" fontSize="7" letterSpacing="0.7" fontWeight="500">
        <textPath href="#reset-tagline">REGENERATIVE TARGETS</textPath>
      </text>
      <text x="26.5" y="111" fill="#fff" fontSize="33" fontWeight="400" letterSpacing="10.2">
        RESE
      </text>
      <text x={C} y="127" fill="#fff" fontSize="7.4" fontWeight="500" letterSpacing="1.3" textAnchor="middle">
        INTERNATIONAL STANDARD
      </text>
    </svg>
  );
}

/** WELL seal: broken double ring of thick arcs, bold WELL, small caps below. */
export function WellMark({ className }: Props) {
  const outer = 88;
  const inner = 80;
  const segments: [number, number, number][] = [
    [-101, -31, outer], // top right
    [-118, -80, inner], // top
    [-44, 117, inner], // right, round the bottom
    [113, 134, outer], // bottom left
    [157, 207, inner], // left
    [166, 199, outer], // left, outer
  ];
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <Disc id="well-disc" from="#c3cfdc" to="#9aaabd" />
      <g fill="none" stroke="#fff" strokeWidth="4.2">
        {segments.map(([a0, a1, rr]) => (
          <path key={`${a0}-${rr}`} d={arc(a0, a1, rr)} />
        ))}
      </g>
      <text x={C} y="99" fill="#fff" fontSize="28" fontWeight="700" letterSpacing="0.8" textAnchor="middle">
        WELL
      </text>
      <text x={C} y="117" fill="#fff" fontSize="8" letterSpacing="1.7" textAnchor="middle">
        v2 ALIGNED
      </text>
    </svg>
  );
}
