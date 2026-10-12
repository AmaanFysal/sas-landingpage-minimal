// Seals for the standards tiles: the RESET and WELL marks redrawn in fin.ai's
// certification-tile style (owner request). Fin draws each logo as grey line
// work (#AEACA8, ~1.5 stroke) in a 298-unit square, using about the middle
// 58%: big lettering as hollow outlines, small lettering solid.
// The WELL seal reads "v2 ALIGNED", matching the approved claim, rather than
// the "Health-Safety Rated" seal text, which is a separate rating.
// Drawings use a 200-unit design box centred at (100, 100); the viewBox adds
// Fin's margin. Angles are SVG degrees (0 = 3 o'clock, clockwise).

type Props = { className?: string };

const LINE = "#AEACA8"; // Fin's tile line grey
const VIEW = "-49 -49 298 298";
const C = 100;
const pt = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [+(C + r * Math.cos(a)).toFixed(2), +(C + r * Math.sin(a)).toFixed(2)];
};
/** Arc from `a0` to `a1` degrees at radius `r` (clockwise unless `back`). */
const arc = (a0: number, a1: number, r: number, back = false) => {
  const [x0, y0] = pt(a0, r);
  const [x1, y1] = pt(a1, r);
  return `M${x0} ${y0}A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${back ? 0 : 1} ${x1} ${y1}`;
};
/** A thick arc drawn as an outlined band (Fin outlines heavy shapes). */
const band = (a0: number, a1: number, r: number, w: number) => {
  const outer = arc(a0, a1, r + w / 2);
  const inner = arc(a1, a0, r - w / 2, true).replace(/^M/, "L");
  return `${outer}${inner}Z`;
};

/** RESET International Standard: clock-hand ring, curved tagline, R E S E T. */
export function ResetMark({ className }: Props) {
  const r = 84;
  const capY = 86.5; // cap height line of the big letters
  const side = (Math.asin((capY - C) / r) * 180) / Math.PI; // ring meets the cap line
  const [rx, ry] = pt(side, r);
  const [lx] = pt(180 - side, r);
  return (
    <svg viewBox={VIEW} className={className} aria-hidden>
      <g fill="none" stroke={LINE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* top-left quarter and the hand dropping from 12 o'clock */}
        <path d={`${arc(204, 270, r)}V66`} />
        {/* lower ring, 3 o'clock round to 9, with the stubs at cap height */}
        <path d={`M${rx - 17} ${ry}H${rx}${arc(side, 180 - side, r).replace(/^M[^A]+/, "")}H${lx + 11}`} />
      </g>
      <path id="reset-tagline" d={arc(-86, -14, r - 2.4)} fill="none" />
      <g fill={LINE}>
        <text fontSize="6.8" letterSpacing="0.7">
          <textPath href="#reset-tagline">REGENERATIVE TARGETS</textPath>
        </text>
        <text x="26.5" y="111" fontSize="33" fontWeight="400" letterSpacing="10.2">
          RESE
        </text>
        <text x={C} y="127" fontSize="7.4" letterSpacing="1.3" textAnchor="middle">
          INTERNATIONAL STANDARD
        </text>
      </g>
    </svg>
  );
}

/** WELL seal: broken double ring of thick arcs, bold WELL, small caps below. */
export function WellMark({ className }: Props) {
  const outer = 88;
  const inner = 79;
  const w = 5;
  const segments: [number, number, number][] = [
    [-101, -31, outer], // top right
    [-118, -80, inner], // top
    [-44, 117, inner], // right, round the bottom
    [113, 134, outer], // bottom left
    [157, 207, inner], // left
    [166, 199, outer], // left, outer
  ];
  return (
    <svg viewBox={VIEW} className={className} aria-hidden>
      <g fill="none" stroke={LINE} strokeWidth="1.2" strokeLinejoin="round">
        {segments.map(([a0, a1, rr]) => (
          <path key={`${a0}-${rr}`} d={band(a0, a1, rr, w)} />
        ))}
        <text x={C} y="100" fontSize="30" fontWeight="700" letterSpacing="0.8" textAnchor="middle" strokeWidth="1.1">
          WELL
        </text>
      </g>
      <text x={C} y="118" fill={LINE} fontSize="8" letterSpacing="1.7" textAnchor="middle">
        v2 ALIGNED
      </text>
    </svg>
  );
}
