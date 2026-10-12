import { Fragment } from "react";

const NAME = "Air Intelligence";

/**
 * Renders section 05's title with "Air Intelligence" showing its initials, A
 * and I, in bold SAS sky blue, so the name reads as "AI" (owner request: the
 * title only, not the body or caption). Only the letters change; the words come
 * from site.ts unchanged. Sky (not sky-ink) because section 05 is dark.
 */
export function WithAiName({ text }: { text: string }) {
  const parts = text.split(NAME);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <>
          <span className="font-bold text-sky">A</span>ir <span className="font-bold text-sky">I</span>ntelligence
        </>
      )}
    </Fragment>
  ));
}
