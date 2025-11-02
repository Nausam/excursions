// components/Safety.tsx
"use client";

import { gsap } from "gsap";
import {
  BadgeCheck,
  LifeBuoy,
  ShieldCheck,
  ThermometerSun,
  Users2,
  Wrench,
} from "lucide-react";
import React, { useLayoutEffect, useRef } from "react";

gsap.config({ nullTargetWarn: false }); // quiet during hot reloads

/* ---------- Fixed palettes ---------- */
const PALETTE = {
  amber: {
    chipBg: "bg-amber-50",
    chipText: "text-amber-700",
    ring: "ring-amber-200",
  },
  sky: { chipBg: "bg-sky-50", chipText: "text-sky-700", ring: "ring-sky-200" },
  emerald: {
    chipBg: "bg-emerald-50",
    chipText: "text-emerald-700",
    ring: "ring-emerald-200",
  },
  violet: {
    chipBg: "bg-violet-50",
    chipText: "text-violet-700",
    ring: "ring-violet-200",
  },
  rose: {
    chipBg: "bg-rose-50",
    chipText: "text-rose-700",
    ring: "ring-rose-200",
  },
  indigo: {
    chipBg: "bg-indigo-50",
    chipText: "text-indigo-700",
    ring: "ring-indigo-200",
  },
} as const;

type Hue = keyof typeof PALETTE;
type StepIcon = React.ComponentType<{ size?: number; className?: string }>;

type Badge = {
  icon: StepIcon;
  title: string;
  desc: string;
  hue: Hue;
};

const BADGES: Badge[] = [
  {
    icon: BadgeCheck,
    title: "Licensed & certified",
    desc: "All guides are locally licensed with up-to-date certifications.",
    hue: "amber",
  },
  {
    icon: ShieldCheck,
    title: "Insured operations",
    desc: "Comprehensive operator insurance and guest coverage.",
    hue: "emerald",
  },
  {
    icon: Wrench,
    title: "Pro-grade equipment",
    desc: "Well-maintained vehicles, dive gear, and safety kits.",
    hue: "indigo",
  },
  {
    icon: LifeBuoy,
    title: "Emergency ready",
    desc: "First-aid kits, radios, and clear escalation protocols.",
    hue: "rose",
  },
  {
    icon: Users2,
    title: "Small groups",
    desc: "Capped group sizes for safety and better experiences.",
    hue: "violet",
  },
  {
    icon: ThermometerSun,
    title: "Weather aware",
    desc: "Live monitoring with flexible reschedules if conditions shift.",
    hue: "sky",
  },
];

/* ---------- env helpers ---------- */
const hasWindow = typeof window !== "undefined";
const prefersReducedMotion =
  hasWindow && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Tiny observer util to fire an effect once */
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

/* ---------- Card (plate tilt only) ---------- */
function SafetyCard({ data, tiltDeg }: { data: Badge; tiltDeg: number }) {
  const { icon: Icon, title, desc, hue } = data;
  const p = PALETTE[hue];
  const plateRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = plateRef.current;
    if (!el) return;
    gsap.set(el, { rotate: tiltDeg, y: 0, willChange: "transform" });
  }, [tiltDeg]);

  const onEnter: React.MouseEventHandler<HTMLElement> = () => {
    const el = plateRef.current;
    if (prefersReducedMotion || !el) return;
    gsap.to(el, { rotate: 0, y: -4, duration: 0.35, ease: "power2.out" });
  };

  const onLeave: React.MouseEventHandler<HTMLElement> = () => {
    const el = plateRef.current;
    if (prefersReducedMotion || !el) return;
    gsap.to(el, { rotate: tiltDeg, y: 0, duration: 0.35, ease: "power2.out" });
  };

  return (
    <article
      className="s-card group relative isolate"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Back-plate (only this rotates) */}
      <div
        ref={plateRef}
        className="s-plate absolute inset-0 rounded-2xl bg-[#fffdf8] ring-1 ring-black/10 shadow-[0_22px_80px_-34px_rgba(0,0,0,.28)] pointer-events-none before:absolute before:inset-0 before:pointer-events-none before:opacity-[.03] before:[background-image:radial-gradient(rgba(0,0,0,.8)_1px,transparent_1px)] before:[background-size:6px_6px]"
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-[0.45]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
            maskImage: "radial-gradient(black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(black, transparent 75%)",
          }}
        />
      </div>

      {/* Foreground (no transforms) */}
      <div className="s-body relative z-10 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <span
            className={[
              "s-icon grid h-12 w-12 place-items-center rounded-xl ring-1",
              p.chipBg,
              p.chipText,
              p.ring,
            ].join(" ")}
            aria-hidden
          >
            <Icon size={22} />
          </span>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold leading-tight text-neutral-900">
                {title}
              </h3>
              <span className="s-verified inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                <BadgeCheck size={12} />
              </span>
            </div>
            <p className="mt-1 text-neutral-600">{desc}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Section ---------- */
export default function Safety() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl || prefersReducedMotion) return;

    const cleanups: Array<() => void> = [];

    // Headings: slide-up + deblur once visible
    const headerItems = Array.from(
      rootEl.querySelectorAll<HTMLElement>(".s-hdr > *")
    );
    if (headerItems.length) {
      gsap.set(headerItems, { opacity: 0, filter: "blur(6px)", y: 12 });
      cleanups.push(
        observeOnce(
          rootEl,
          () => {
            gsap.to(headerItems, {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
              clearProps: "opacity,filter,transform",
            });
          },
          { rootMargin: "0px 0px -10% 0px" }
        )
      );
    }

    // Cards: reveal + plate wobble + icon pop + verified tick
    const cards = Array.from(rootEl.querySelectorAll<HTMLElement>(".s-card"));
    cards.forEach((card, i) => {
      if (!card || !card.isConnected) return;

      gsap.set(card, { opacity: 0, filter: "blur(6px)", y: 14 });

      const cleanup = observeOnce(
        card,
        () => {
          const tl: gsap.core.Timeline = gsap.timeline({
            defaults: { ease: "power2.out" },
          });
          tl.to(card, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.5 });

          const plate = card.querySelector<HTMLElement>(".s-plate");
          const icon = card.querySelector<HTMLElement>(".s-icon");
          const verified = card.querySelector<HTMLElement>(".s-verified");

          if (plate)
            tl.from(plate, { y: 10, rotate: "+=0.6", duration: 0.5 }, "-=0.28");
          if (icon)
            tl.fromTo(
              icon,
              { autoAlpha: 0, scale: 0.9, rotate: -2 },
              {
                autoAlpha: 1,
                scale: 1,
                rotate: 0,
                duration: 0.38,
                ease: "back.out(2)",
              },
              "-=0.3"
            );
          if (verified)
            tl.fromTo(
              verified,
              { autoAlpha: 0, scale: 0.6 },
              { autoAlpha: 1, scale: 1, duration: 0.28, ease: "back.out(2)" },
              "-=0.22"
            );

          tl.timeScale(1 + (i % 3) * 0.04);
        },
        { rootMargin: "0px 0px -12% 0px" }
      );

      cleanups.push(cleanup);
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="mx-auto w-[min(1400px,94vw)] py-12 md:py-16"
    >
      <div className="s-hdr mx-auto mb-8 text-center md:w-3/4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
          Safety & qualifications
        </h2>
        <p className="mt-2 text-neutral-600">
          Proven standards so you can focus on the adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BADGES.map((b, i) => (
          <SafetyCard
            key={b.title}
            data={b}
            tiltDeg={i % 2 === 0 ? -0.7 : 0.7}
          />
        ))}
      </div>

      <p className="mt-7 text-center text-sm text-neutral-500">
        Full policy details are available on request and at check-in.
      </p>
    </section>
  );
}
