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
    <section className="grid place-items-center mt-28">
      <div ref={root} className="relative mx-auto w-[min(1400px,94vw)] pb-20">
        <div className="relative overflow-hidden rounded-[5px]">
          <div className="relative w-full aspect-[16/9]">
            <video
              src="/hero.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

        {/* Floating search card slot */}
        <div className="absolute left-1/2 -bottom-6 z-10 w-[min(1100px,92%)] -translate-x-1/2" />
      </div>
    </section>
  );
}
