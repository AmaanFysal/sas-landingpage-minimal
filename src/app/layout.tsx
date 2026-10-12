import type { Metadata } from "next";
import { hero, meta } from "@/content/site";
import "./globals.css";

// Typeface is Helvetica Neue via the system font stack (see globals.css);
// no web fonts are downloaded.

export const metadata: Metadata = {
  title: meta.title,
  description: `${hero.subline.lead} ${hero.subline.bold}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={meta.lang} className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
