// Line-art marks for the standards tiles. Abstract drawings only (no text),
// so the badge wording stays in the caption. Stroke follows `currentColor`.

type Props = { className?: string };

function Ring() {
  return (
    <>
      <circle cx="60" cy="60" r="56" />
      <circle cx="60" cy="60" r="49" strokeDasharray="1 4" />
      <circle cx="60" cy="60" r="40" />
    </>
  );
}

/** Air-quality data: three waves inside the seal. */
export function ResetMark({ className }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1" className={className} aria-hidden>
      <Ring />
      <path d="M30 50c5-5 10-5 15 0s10 5 15 0 10-5 15 0 10 5 15 0" />
      <path d="M26 60c5-5 10-5 15 0s10 5 15 0 10-5 15 0 10 5 15 0 10-5 13 0" />
      <path d="M30 70c5-5 10-5 15 0s10 5 15 0 10-5 15 0 10 5 15 0" />
    </svg>
  );
}

/** Healthy building: a simple roofline with a wave beneath. */
export function WellMark({ className }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1" className={className} aria-hidden>
      <Ring />
      <path d="M38 58 60 40l22 18v22H38Z" />
      <path d="M46 68c3-3 6-3 9 0s6 3 9 0 6-3 9 0" />
      <path d="M60 40v-6" />
    </svg>
  );
}
