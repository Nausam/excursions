/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, UserRound } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

/* -------------------- Accent tokens per trip -------------------- */
const ACCENT = {
  Safari: { hue: "amber", bar: "bg-amber-500" },
  Excursion: { hue: "violet", bar: "bg-violet-500" },
  Diving: { hue: "sky", bar: "bg-sky-500" },
} as const;

type Trip = keyof typeof ACCENT;

type Testimonial = {
  id: string;
  name: string;
  trip: Trip;
  when: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  location?: string;
  gender?: "male" | "female";
};

type Speed = "fast" | "normal" | "slow";
type Dir = "left" | "right";

/* -------------------- Hook: seamless marquee -------------------- */
function useInfiniteScroll(
  containerRef:
    | React.RefObject<HTMLDivElement | null>
    | React.MutableRefObject<HTMLDivElement | null>,
  scrollerRef:
    | React.RefObject<HTMLUListElement | null>
    | React.MutableRefObject<HTMLUListElement | null>,
  direction: Dir,
  speed: Speed
) {
  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    const kids = Array.from(scroller.children);
    kids.forEach((k) => scroller.appendChild(k.cloneNode(true)));

    const dur = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    container.style.setProperty("--animation-duration", dur);
    container.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  }, [containerRef, scrollerRef, direction, speed]);
}

/* -------------------- small helpers -------------------- */
function Stars({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="tm-stars inline-flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 20 20"
          className={i < rating ? "fill-amber-400" : "fill-neutral-300"}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.7 5.48 6.06.88-4.38 4.27 1.03 6.01L10 15.9l-5.41 2.84 1.03-6.01L1.24 7.86l6.06-.88L10 1.5z" />
        </svg>
      ))}
      <span className="sr-only">{rating} out of 5 stars</span>
    </span>
  );
}

const PaperTexture = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(black,transparent_75%)]"
    style={{
      backgroundImage: "radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)",
      backgroundSize: "6px 6px",
    }}
  />
);

/* -------------------- Single-piece ticket card -------------------- */
function TestimonialTicket({ t }: { t: Testimonial }) {
  const a = ACCENT[t.trip];
  const GenderIcon = t.gender === "female" ? UserRound : User;

  return (
    <li
      data-ticket="true"
      className="
        relative w-[clamp(280px,42vw,440px)] shrink-0
         bg-[#fffdf8] ring-1 ring-black/10
        rounded-l-lg rounded-r-2xl shadow-lg
        transition-transform duration-300 hover:-translate-y-0.5
        p-4 sm:p-5
        will-change-transform before:absolute before:inset-0 before:pointer-events-none before:opacity-[.03] before:[background-image:radial-gradient(rgba(0,0,0,.8)_1px,transparent_1px)] before:[background-size:6px_6px]
      "
    >
      <PaperTexture />

      {/* soft shine sweep layer */}
      <span className="tm-shine pointer-events-none absolute inset-y-0 left-0 w-24 skew-x-[-20deg] bg-white/70 opacity-0 blur-[2px]" />

      {/* left accent bar */}
      <span
        className={`tm-bar absolute left-0 top-0 h-full w-[6px] rounded-l-2xl ${a.bar}`}
      />

      {/* header row */}
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-white ring-2 ring-white shadow">
          <GenderIcon className={`h-6 w-6 text-${a.hue}-600`} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-900">
            {t.name}
          </p>
          <p className="truncate text-[11px] text-neutral-500">
            {t.trip} • {t.when}
            {t.location ? ` • ${t.location}` : ""}
          </p>
        </div>
        <div className="ml-auto">
          <Stars rating={t.rating} />
        </div>
      </div>

      {/* quote */}
      <p className="mt-3 text-[14px] leading-6 text-neutral-900 sm:text-[15px]">
        “{t.quote}”
      </p>

      {/* footer pill */}
      <div className="mt-3">
        <span
          className={`
            inline-flex items-center rounded-xl border px-3 py-1.5 text-[10px] font-semibold tracking-[0.28em] uppercase
            border-${a.hue}-600/40 text-${a.hue}-700 bg-${a.hue}-50
          `}
        >
          {t.trip}
        </span>
      </div>
    </li>
  );
}

/* -------------------- Main: Double-track marquee -------------------- */
export default function TestimonialsMovingDouble({
  items,
  speedTop = "normal",
  speedBottom = "normal",
  pauseOnHover = true,
}: {
  items: Testimonial[];
  speedTop?: Speed;
  speedBottom?: Speed;
  pauseOnHover?: boolean;
}) {
  const rowA = items.filter((_, i) => i % 2 === 0);
  const rowB = items.filter((_, i) => i % 2 === 1);

  const topContainerRef = useRef<HTMLDivElement>(null);
  const topScrollerRef = useRef<HTMLUListElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);
  const bottomScrollerRef = useRef<HTMLUListElement>(null);

  const [ready, setReady] = useState(false);

  useInfiniteScroll(topContainerRef, topScrollerRef, "left", speedTop);
  useInfiniteScroll(
    bottomContainerRef,
    bottomScrollerRef,
    "right",
    speedBottom
  );

  useEffect(() => setReady(true), []);

  /* -------------------- NEW: micro-animations -------------------- */
  useEffect(() => {
    if (!ready) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = document.getElementById("tm-section") || document.body;

    // Header: slide/fade in using Tailwind translate-x var (safe with transforms)
    gsap.set(".tm-hdr > *", { opacity: 0, "--tw-translate-x": "-10px" } as any);
    gsap.to(".tm-hdr > *", {
      opacity: 1,
      "--tw-translate-x": "0px",
      duration: 0.55,
      ease: "power2.out",
      stagger: 0.08,
      clearProps: "opacity",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        once: true,
      },
    } as any);

    // Tickets: ambient float (tiny up/down via Tailwind var)
    const tickets = gsap.utils.toArray<HTMLElement>('[data-ticket="true"]');
    tickets.forEach((el, i) => {
      gsap.set(el, { "--tw-translate-y": "0px" } as any);
      gsap.to(el, {
        "--tw-translate-y": gsap.utils.random(-3, 3) + "px",
        duration: gsap.utils.random(1.6, 2.4),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: (i % 6) * 0.12,
      } as any);
    });

    // Accent bar: grow once per ticket
    gsap.from(".tm-bar", {
      scaleY: 0,
      transformOrigin: "0 0",
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.06,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        once: true,
      },
    });

    // Shine sweep on a gentle loop
    const shines = gsap.utils.toArray<HTMLElement>(".tm-shine");
    shines.forEach((shine, idx) => {
      const loop = gsap.timeline({
        repeat: -1,
        repeatDelay: gsap.utils.random(2.5, 4.5),
      });
      loop.set(shine, { xPercent: -120, opacity: 0 });
      loop
        .to(shine, {
          xPercent: 120,
          opacity: 0.16,
          duration: 0.9,
          ease: "power2.out",
        })
        .to(shine, { opacity: 0, duration: 0.2 }, "-=0.2");
      loop.delay((idx % 5) * 0.2);
    });

    // Star twinkle (only filled amber stars)
    const stars = gsap.utils.toArray<SVGElement>(
      ".tm-stars svg.fill-amber-400"
    );
    if (stars.length) {
      gsap.to(stars, {
        scale: 1.08,
        transformOrigin: "50% 50%",
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.08,
          repeatDelay: 1.4,
          from: "random",
        },
      });
    }

    return () => {
      gsap.globalTimeline.clear(); // clean up loops if component unmounts
    };
  }, [ready]);

  return (
    <section
      id="tm-section"
      className="relative mx-auto w-[min(1400px,94vw)] py-12 md:py-16"
    >
      <div className="tm-hdr mx-auto mb-8 text-center md:w-3/4">
        <h2 className="mt-1 text-[clamp(28px,4vw,44px)] font-extrabold leading-tight text-neutral-900">
          Guests say it best
        </h2>
        <p className="mt-2 text-neutral-600">
          Real reviews from recent safaris, excursions, and dives.
        </p>
      </div>

      {/* Track A */}
      <div
        ref={topContainerRef}
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] "
      >
        <ul
          ref={topScrollerRef}
          className={`flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4  ${
            ready ? "animate-scroll" : ""
          } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        >
          {rowA.map((t) => (
            <TestimonialTicket key={`A-${t.id}`} t={t} />
          ))}
        </ul>
      </div>

      <div className="h-6" />

      {/* Track B (opposite direction) */}
      <div
        ref={bottomContainerRef}
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] "
      >
        <ul
          ref={bottomScrollerRef}
          className={`flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4 ${
            ready ? "animate-scroll" : ""
          } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        >
          {rowB.map((t) => (
            <TestimonialTicket key={`B-${t.id}`} t={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}
