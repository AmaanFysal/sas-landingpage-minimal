"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps the static ribbon image and, once it scrolls into view, fades in a
 * live WebGL version that ripples slowly like liquid (src/lib/air-ribbon-scene).
 * - The static image renders first (and stays for no-WebGL / reduced motion).
 * - three.js is only downloaded when a ribbon is about to be seen.
 * - The animation only runs while on screen and pauses in background tabs.
 * Uses spans so it can sit inside the closing <h2>.
 */
export function LiquidRibbon({ children, className = "" }: { children: ReactNode; className?: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let scene: import("@/lib/air-ribbon-scene").RibbonScene | null = null;
    let loading = false;
    let visible = false;
    let disposed = false;
    let lost = false;

    // If the browser drops the GPU context, bring the static image back for good.
    const onContextLost = () => {
      lost = true;
      scene?.stop();
      setLive(false);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (lost) return;
        visible = entry.isIntersecting;
        if (!visible) {
          scene?.stop();
          return;
        }
        if (scene) {
          scene.start();
          return;
        }
        if (loading) return;
        loading = true;
        const { createRibbonScene } = await import("@/lib/air-ribbon-scene");
        if (disposed) return;
        scene = createRibbonScene(canvas);
        if (!scene) return; // no WebGL: keep the static image
        scene.onFirstFrame(() => setLive(true));
        if (visible) scene.start();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(wrap);

    return () => {
      disposed = true;
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      scene?.dispose();
    };
  }, []);

  return (
    <span ref={wrapRef} className={`relative block ${className}`}>
      <span className={`block transition-opacity duration-700 ${live ? "opacity-0" : "opacity-100"}`}>{children}</span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`pointer-events-none absolute -left-[6%] -top-[6%] h-[112%] w-[112%] transition-opacity duration-700 ${
          live ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}
