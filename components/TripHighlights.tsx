/* eslint-disable @typescript-eslint/no-explicit-any */
// components/TripHighlights.tsx
"use client";

import { gsap } from "gsap";
import { Check, Mountain, PawPrint, Waves } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

/* ---------- types/data ---------- */
type Highlight = {
  icon: React.ElementType;
  title: string;
  bullets: string[];
  img: string;
  imgAlt: string;
  accent: "amber" | "violet" | "sky";
};

const HIGHLIGHTS: readonly Highlight[] = [
  {
    icon: Mountain, // or a better icon later
    title: "Excursion trips in Baa Atoll",
    bullets: [
      "Sandbanks, uninhabited islands and turtle reefs",
      "Small groups with local skippers and guides",
      "Picnic lunches and swim stops built into each day",
    ],
    img: "/images/excursion.jpg",
    imgAlt: "Boat anchored at a sandbank in Baa Atoll",
    accent: "amber",
  },
  {
    icon: PawPrint,
    title: "Liveaboard",
    bullets: [
      "Manta and dolphin safaris in Baa Atoll",
      "14–18 guests per trip with local crew",
      "Snorkelling gear and lifejackets included",
    ],
    img: "/images/safari.jpg",
    imgAlt: "Guests on a safari boat watching dolphins",
    accent: "violet",
  },
  {
    icon: Waves,
    title: "Dive with locals",
    bullets: [
      "Guided dives in Baa Atoll and Fuvahmulah",
      "PADI dive masters and small dive groups",
      "Options for both experienced and new divers",
    ],
    img: "/images/diving.jpg",
    imgAlt: "Divers exploring a Maldivian reef wall",
    accent: "sky",
  },
];

/* ---------- tokens ---------- */
const ACCENT = {
  amber: {
    bar: "bg-amber-500",
    iconBg: "bg-amber-50 ring-amber-100 text-amber-700",
    chip: "bg-amber-50 text-amber-800 ring-amber-100",
  },
  violet: {
    bar: "bg-violet-500",
    iconBg: "bg-violet-50 ring-violet-100 text-violet-700",
    chip: "bg-violet-50 text-violet-800 ring-violet-100",
  },
  sky: {
    bar: "bg-sky-500",
    iconBg: "bg-sky-50 ring-sky-100 text-sky-700",
    chip: "bg-sky-50 text-sky-800 ring-sky-100",
  },
} as const;

/* ---------- helpers ---------- */
function observeOnce(
  target: Element,
  cb: () => void,
  options?: IntersectionObserverInit
): () => void {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        cb();
        io.unobserve(e.target);
      }
    }
  }, options);
  io.observe(target);
  return () => io.disconnect();
}

/* ---------- Tile (keeps HOVER details; new reveal/float) ---------- */
function Tile({
  icon: Icon,
  title,
  bullets,
  img,
  imgAlt,
  accent,
  hMobile, // "58vw" or "60vw" etc.
  hDesktop, // 520, 248, ...
}: Highlight & { hMobile: string; hDesktop: number }) {
  const a = ACCENT[accent];

  // constants for the sliding ticket hover
  const HEADER_VISIBLE = 64;
  const BOTTOM = 20;
  const SAFE_TOP = 10;

  const cardRef = useRef<HTMLDivElement | null>(null);
  const ticketWrapRef = useRef<HTMLDivElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const floatWrapRef = useRef<HTMLDivElement | null>(null);

  // Hover (ticket slide) + image zoom targetting the real <img> in next/image
  useLayoutEffect(() => {
    const card = cardRef.current;
    const ticket = ticketWrapRef.current;
    const body = bodyRef.current;
    const imgWrap = imgWrapRef.current;
    if (!card || !ticket || !body || !imgWrap) return;

    // Locate the inner <img> rendered by next/image
    const imgEl = imgWrap.querySelector("img");

    /* ---- Measure states ---- */
    let yCollapsed = 0;
    let yOpen = 0;
    const measure = () => {
      const H = card.getBoundingClientRect().height;
      const T = ticket.getBoundingClientRect().height;
      yCollapsed = Math.max(0, T - HEADER_VISIBLE);
      yOpen = Math.max(0, T - (H - SAFE_TOP - BOTTOM));

      gsap.set(ticket, { y: yCollapsed });
      if (imgEl) gsap.set(imgEl, { scale: 1 });
      gsap.set(body, { opacity: 0 });
      gsap.set(card, { boxShadow: "0 30px 100px -40px rgba(0,0,0,.55)" });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ticket);
    ro.observe(card);

    const onEnter = () => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      gsap.to(ticket, { y: yOpen, duration: 0.35, ease: "power2.out" });
      if (imgEl)
        gsap.to(imgEl, { scale: 1.02, duration: 0.5, ease: "power2.out" });
      gsap.to(body, {
        opacity: 1,
        duration: 0.25,
        ease: "power1.out",
        delay: 0.05,
      });
      gsap.to(card, {
        boxShadow: "0 40px 120px -36px rgba(0,0,0,.6)",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      gsap.to(ticket, { y: yCollapsed, duration: 0.35, ease: "power2.inOut" });
      if (imgEl)
        gsap.to(imgEl, { scale: 1, duration: 0.45, ease: "power2.inOut" });
      gsap.to(body, { opacity: 0, duration: 0.2, ease: "power1.out" });
      gsap.to(card, {
        boxShadow: "0 30px 100px -40px rgba(0,0,0,.55)",
        duration: 0.35,
        ease: "power2.inOut",
      });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, []);

  // Entrance reveal + accent grow + ambient float
  useLayoutEffect(() => {
    const card = cardRef.current;
    const bar = barRef.current;
    const reveal = revealRef.current;
    const floatWrap = floatWrapRef.current;
    if (!card || !reveal || !floatWrap) return;

    // initial states
    gsap.set(floatWrap, {
      y: 18,
      rotateX: 6,
      scale: 0.985,
      opacity: 0,
      filter: "blur(6px)",
    });
    if (bar) gsap.set(bar, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(reveal, { xPercent: 0 }); // fully covering

    // run once when the tile enters viewport
    const cleanup = observeOnce(
      card,
      () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // curtain reveal slides away to the right
        tl.to(reveal, { xPercent: 105, duration: 0.45, ease: "power2.out" }, 0);

        // card lifts in and de-blurs
        tl.to(
          floatWrap,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.55,
            clearProps: "opacity,transform,filter",
          },
          0.05
        );

        // accent bar grows
        if (bar)
          tl.to(bar, { scaleY: 1, duration: 0.35, ease: "power2.out" }, 0.1);

        // tiny idle float
        tl.call(() => {
          gsap.to(floatWrap, {
            y: "+=2.5",
            duration: 2.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    return cleanup;
  }, []);

  return (
    <article
      ref={cardRef}
      className="hi-card group relative overflow-hidden rounded-[26px] ring-1 ring-black/10 bg-white shadow-[0_30px_100px_-40px_rgba(0,0,0,.55)]
                 h-[var(--h-m)] lg:h-[var(--h-d)]"
      style={
        {
          // CSS variables used by the Tailwind arbitrary value
          ["--h-m" as any]: hMobile,
          ["--h-d" as any]: `${hDesktop}px`,
        } as React.CSSProperties
      }
    >
      {/* entrance curtain */}
      <div
        ref={revealRef}
        className="hi-reveal pointer-events-none absolute inset-0 z-20 bg-white"
      />

      {/* float container to keep idle motion separate from card transforms */}
      <div ref={floatWrapRef} className="h-full w-full will-change-transform">
        {/* photo */}
        <div ref={imgWrapRef} className="relative h-full w-full">
          <Image
            src={img}
            alt={imgAlt}
            fill
            sizes="(max-width:1024px) 94vw, 800px"
            className="object-cover will-change-transform"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 via-black/25 to-transparent" />
        </div>

        {/* sliding ticket on hover */}
        <div
          ref={ticketWrapRef}
          className="absolute inset-x-5 bottom-5 will-change-transform"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-black/10 backdrop-blur-sm shadow-[0_18px_60px_-28px_rgba(0,0,0,.35)] before:absolute before:inset-0 before:pointer-events-none before:opacity-[.03] before:[background-image:radial-gradient(rgba(0,0,0,.8)_1px,transparent_1px)] before:[background-size:6px_6px]">
            {/* left accent bar (animated grow) */}
            <span
              ref={barRef}
              className={`absolute left-0 top-0 h-full w-[6px] rounded-l-2xl ${ACCENT[accent].bar}`}
            />

            {/* header (always visible portion) */}
            <div className="flex items-center gap-3 p-4 md:p-5">
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ring-1 ${ACCENT[accent].iconBg}`}
              >
                <Icon size={18} />
              </span>
              <h3 className="text-base md:text-lg font-extrabold text-neutral-900">
                {title}
              </h3>
            </div>

            {/* body (fades in during hover) */}
            <div ref={bodyRef} className="px-4 pb-4 pt-0 md:px-5">
              <div className="flex flex-wrap gap-2">
                {bullets.slice(0, 3).map((b) => (
                  <span
                    key={b}
                    className={[
                      "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] leading-none ring-1",
                      ACCENT[accent].chip,
                    ].join(" ")}
                  >
                    <Check size={12} className="opacity-90" />
                    {b}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-neutral-500">
                Reserve now, pay on arrival. Free cancellation up to 48h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Section (header reveal + staggered tiles) ---------- */
export default function TripHighlights() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Header: soft reveal
    const h = root.querySelector<HTMLElement>("h2");
    const sub = root.querySelector<HTMLElement>(".section-sub");
    if (h || sub) {
      const hdrKids = [h, sub].filter(Boolean) as HTMLElement[];
      gsap.set(hdrKids, { opacity: 0, y: 14, filter: "blur(6px)" });
      observeOnce(
        root,
        () => {
          gsap.to(hdrKids, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: prefersReduced ? 0.35 : 0.55,
            ease: "power2.out",
            stagger: 0.06,
            clearProps: "opacity,transform,filter",
          });
        },
        { threshold: 0.15 }
      );
    }
  }, []);

  const [safari, excursions, diving] = HIGHLIGHTS;
  const MOBILE_H = "58vw";

  return (
    <section
      ref={rootRef}
      className="mx-auto w-[min(1400px,94vw)] py-12 md:py-16"
    >
      <div className="mx-auto mb-8 text-center md:w-3/4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
          Where do we take you?
        </h2>
        <p className="section-sub mt-2 text-neutral-600">
          Three ways to experience the Maldives with La Via Travels.
        </p>
      </div>

      {/* layout: big left, two right */}
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
        <Tile {...safari} hMobile={MOBILE_H} hDesktop={520} />
        <div className="grid grid-cols-1 gap-7">
          <Tile {...excursions} hMobile={MOBILE_H} hDesktop={248} />
          <Tile {...diving} hMobile={MOBILE_H} hDesktop={248} />
        </div>
      </div>
    </section>
  );
}
