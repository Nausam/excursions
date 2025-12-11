// components/Hero.tsx
"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);
  const headingLine = useRef<HTMLParagraphElement | null>(null);
  const wordMain = useRef<HTMLParagraphElement | null>(null);
  const wordGlow = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    if (!root.current) return;

    const splitWords = (el: HTMLElement) => {
      const original = el.textContent ?? "";
      el.textContent = "";
      const spans: HTMLElement[] = [];
      const words = original.trim().split(/\s+/);
      words.forEach((w, i) => {
        const span = document.createElement("span");
        span.textContent = w;
        span.style.display = "inline-block";
        span.style.whiteSpace = "pre";
        span.style.willChange = "transform";
        el.appendChild(span);
        spans.push(span);
        if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
      });
      return { original, spans };
    };

    const splitChars = (el: HTMLElement) => {
      const original = el.textContent ?? "";
      el.textContent = "";
      const spans: HTMLElement[] = [];
      for (const ch of original) {
        const span = document.createElement("span");
        span.textContent = ch === " " ? "\u00A0" : ch;
        span.style.display = "inline-block";
        span.style.willChange = "transform";
        el.appendChild(span);
        spans.push(span);
      }
      return { original, spans };
    };

    const hEl = headingLine.current as HTMLElement | null;
    const mEl = wordMain.current as HTMLElement | null;
    const gEl = wordGlow.current as HTMLElement | null;
    if (!hEl || !mEl || !gEl) return;

    const prevVis = root.current.style.visibility;
    root.current.style.visibility = "hidden";

    try {
      const hSplit = splitWords(hEl);
      const mSplit = splitChars(mEl);
      const gSplit = splitChars(gEl);

      gsap.set(hSplit.spans, {
        y: 22,
        opacity: 0,
        rotateX: -20,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      gsap.set(mSplit.spans, {
        y: 28,
        opacity: 0,
        skewY: 6,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      gsap.set(gSplit.spans, {
        y: 28,
        opacity: 0,
        skewY: 6,
        transformOrigin: "50% 100%",
        force3D: true,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(
        hSplit.spans,
        { y: 0, rotateX: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
        0.05
      )
        .to(
          mSplit.spans,
          { y: 0, skewY: 0, opacity: 1, duration: 0.6, stagger: 0.035 },
          0.26
        )
        .to(
          gSplit.spans,
          { y: 0, skewY: 0, opacity: 1, duration: 0.45, stagger: 0.035 },
          0.3
        );

      return () => {
        tl.kill();
        hEl.textContent = hSplit.original;
        mEl.textContent = mSplit.original;
        gEl.textContent = gSplit.original;
      };
    } finally {
      root.current!.style.visibility = prevVis || "visible";
    }
  }, []);

  return (
    <section className="mt-24 md:mt-28">
      <div
        ref={root}
        className="relative mx-auto w-full max-w-[1400px] pb-16 md:pb-24"
      >
        <div className="relative overflow-hidden rounded-[24px]">
          <div className="relative w-full aspect-[4/5] md:aspect-[16/9]">
            <video
              src="/hero.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/hero-poster.jpg"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />

            <div className="pointer-events-auto absolute inset-x-0 bottom-0 md:bottom-10 px-6 pb-8 pt-10 md:px-12 md:pb-12">
              <p
                ref={headingLine}
                className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/90"
              >
                Maldives excursions • liveaboards • diving
              </p>

              <h1 className="mt-3 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-5xl">
                <span ref={wordMain}>Curated ocean</span>
                <br className="hidden sm:block" />
                <span
                  ref={wordGlow}
                  className="inline-block text-sky-200 drop-shadow-[0_0_35px_rgba(56,189,248,.4)]"
                >
                  adventures across the Maldives
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm md:text-base text-sky-50/90">
                Escape to reefs, sandbanks and local islands with small-group
                trips guided by Maldivian experts. Snorkel with mantas, join a
                liveaboard or plan a custom route with La Via Maldives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
