// Fin-style graphic marks: square bullets, corner squares and crop-mark frames.
// See docs/design-library/fin-ai.md (T-04, S-06, S-07).

type MarkProps = { className?: string };

/** Small solid square used instead of a bullet dot. */
export function Square({ className = "bg-sky" }: MarkProps) {
  return <span aria-hidden className={`inline-block size-1.5 shrink-0 ${className}`} />;
}

/** Four squares sitting on the corners of the nearest `relative` parent. */
export function CornerMarks({ className = "bg-sky" }: MarkProps) {
  const pos = ["-left-[3px] -top-[3px]", "-right-[3px] -top-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"];
  return (
    <>
      {pos.map((p) => (
        <span key={p} aria-hidden className={`absolute size-1.5 ${p} ${className}`} />
      ))}
    </>
  );
}

/** Crop marks at corners and edge midpoints, framing a whole section. */
export function CrosshairFrame({ className = "bg-ink/20" }: MarkProps) {
  const points = [
    [0, 0], [50, 0], [100, 0],
    [0, 50], [100, 50],
    [0, 100], [50, 100], [100, 100],
  ];
  return (
    <>
      {points.map(([x, y]) => (
        <span
          key={`${x}-${y}`}
          aria-hidden
          className={`absolute size-1.5 -translate-x-1/2 -translate-y-1/2 ${className}`}
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}
    </>
  );
}
