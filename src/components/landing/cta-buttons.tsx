import Link from "next/link";
import { footer } from "@/content/site";

type Page = "contact" | "waitlist";

/** Classes for one of Fin's buttons (filled or outlined), shared with the hero. */
export function buttonClass(variant: "filled" | "outlined", { dark = false, nav = false } = {}) {
  const size = nav ? "h-8 px-2.5 text-[13px] sm:text-sm md:h-10 md:px-3.5 md:text-base" : "h-10 px-3.5 text-base";
  const base = `inline-flex shrink-0 items-center whitespace-nowrap rounded-[4px] transition-colors ${size}`;
  if (variant === "filled") return `${base} ${dark ? "bg-white text-off-black hover:bg-sky" : "bg-off-black text-sheet hover:bg-sky-ink"}`;
  return `${base} ${
    dark
      ? "border border-white text-white hover:border-white/75 hover:text-white/75"
      : "border border-off-black text-off-black hover:border-off-black/75 hover:text-off-black/75"
  }`;
}

/**
 * Fin's button pair (B-01): filled primary "Contact our team" + outlined
 * "Join the waitlist", 8px apart. Used in the nav and the closing block.
 * On dark pages the primary inverts to white, as on Fin. `hide` drops the
 * button for the page you are on (Fin's nav does the same).
 */
export function CtaButtons({ dark = false, nav = false, hide }: { dark?: boolean; nav?: boolean; hide?: Page }) {
  return (
    <div className="flex items-center gap-2">
      {hide !== "contact" && (
        <Link href={footer.cta.href} className={buttonClass("filled", { dark, nav })}>
          {footer.cta.label}
        </Link>
      )}
      {hide !== "waitlist" && (
        // In the nav on narrow phones, only the primary button fits beside the full logo.
        <Link href={footer.waitlist.href} className={`${buttonClass("outlined", { dark, nav })} ${nav && hide !== "contact" ? "max-[439px]:hidden" : ""}`}>
          {footer.waitlist.label}
        </Link>
      )}
    </div>
  );
}
