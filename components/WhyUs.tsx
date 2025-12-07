"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock,
  Leaf,
  MapPinned,
  Medal,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";

type Feature = { icon: React.ElementType; title: string; desc: string };

const FEATURES: Feature[] = [
  {
    icon: Medal,
    title: "Licensed Guides",
    desc: "Certified, local professionals on every trip.",
  },
  {
    icon: Users,
    title: "Small Groups",
    desc: "Intimate groups for better sightings and safety.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-First",
    desc: "Insured operations, briefings & quality equipment.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    desc: "Leave-no-trace practices and wildlife respect.",
  },
  {
    icon: MapPinned,
    title: "Local Expertise",
    desc: "True insider routes and hidden locations.",
  },
  {
    icon: Clock,
    title: "Flexible Cancel",
    desc: "Free changes up to 48 hours before departure.",
  },
];

const TILTS = [
  "rotate-[-1.2deg] -translate-y-[2px]",
  "rotate-[1.4deg] translate-y-[6px]",
  "rotate-[-0.7deg] -translate-y-[3px]",
  "rotate-[1.1deg] translate-y-[4px]",
  "rotate-[-1.6deg] -translate-y-[1px]",
  "rotate-[0.8deg] translate-y-[2px]",
];

const ACCENTS = [
  {
    iconBg: "bg-amber-50 ring-amber-100 text-amber-700",
    stripe: "from-amber-300/70 to-amber-400/70",
    stamp: "border-amber-600 text-amber-700",
  },
  {
    iconBg: "bg-sky-50 ring-sky-100 text-sky-700",
    stripe: "from-sky-300/70 to-sky-400/70",
    stamp: "border-sky-700 text-sky-800",
  },
  {
    iconBg: "bg-emerald-50 ring-emerald-100 text-emerald-700",
    stripe: "from-emerald-300/70 to-emerald-400/70",
    stamp: "border-emerald-700 text-emerald-800",
  },
  {
    iconBg: "bg-rose-50 ring-rose-100 text-rose-700",
    stripe: "from-rose-300/70 to-rose-400/70",
    stamp: "border-rose-700 text-rose-800",
  },
  {
    iconBg: "bg-violet-50 ring-violet-100 text-violet-700",
    stripe: "from-violet-300/70 to-violet-400/70",
    stamp: "border-violet-700 text-violet-800",
  },
  {
    iconBg: "bg-lime-50 ring-lime-100 text-lime-700",
    stripe: "from-lime-300/70 to-lime-400/70",
    stamp: "border-lime-700 text-lime-800",
  },
];

export default function WhyUs() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Header: clean fade
      gsap.from(".wy-header > *", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Cards: unique micro-timeline per card (no transform conflicts)

      const cards = gsap.utils.toArray<HTMLElement>('[data-feature="true"]');

      cards.forEach((card, idx) => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });

        // Initial state — border/ring untouched
        gsap.set(card, { autoAlpha: 0, filter: "blur(8px)" });

        // Reveal: fade + deblur (doesn't affect ring/border or tilt)
        tl.to(card, { autoAlpha: 1, filter: "blur(0px)", duration: 0.55 });

        // Pin pop
        tl.fromTo(
          card.querySelector(".wy-pin"),
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2)" },
          "-=0.25"
        );

        // Icon bump
        tl.fromTo(
          card.querySelector(".wy-icon"),
          { autoAlpha: 0, scale: 0.9, rotate: -2 },
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.20"
        );

        // Stamp slide-in
        tl.fromTo(
          card.querySelector(".wy-stamp"),
          { autoAlpha: 0, x: 10 },
          { autoAlpha: 1, x: 0, duration: 0.32 },
          "-=0.18"
        );

        // Tiny variance
        tl.timeScale(1 + (idx % 3) * 0.05);
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="mx-auto w-[min(1400px,94vw)] py-10 md:py-14"
    >
      <div className="mx-auto mb-8 text-center md:w-3/4 wy-header">
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
          Why travel with us
        </h2>
        <p className="mt-2 text-neutral-600">
          Real adventures, run by licensed locals. Reserve online in minutes.
        </p>
      </div>

      {/* Simple 2-col stack (no bento) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          const tilt = TILTS[i % TILTS.length];
          const acc = ACCENTS[i % ACCENTS.length];

          return (
            <article
              key={f.title}
              data-feature="true"
              className={[
                "relative isolate rounded-2xl bg-[#fffdf8] p-5",
                "ring-1 ring-black/10 shadow-[0_26px_80px_-34px_rgba(0,0,0,.28)]",
                "transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 before:absolute before:inset-0 before:pointer-events-none before:opacity-[.03] before:[background-image:radial-gradient(rgba(0,0,0,.8)_1px,transparent_1px)] before:[background-size:6px_6px]",
                tilt,
              ].join(" ")}
            >
              {/* paper micro-dot texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(black,transparent_75%)]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                }}
              />

              {/* angled header stripe */}
              {/* <div className={`pointer-events-none absolute -left-3 top-4 h-6 w-[62%] -rotate-[3deg] rounded-full bg-gradient-to-r ${acc.stripe} blur-[0.5px]`} /> */}

              {/* thumb-tack dot */}
              {/* <span
                className="wy-pin absolute right-4 top-3 h-3 w-3 rounded-full bg-neutral-900/80 ring-2 ring-neutral-200"
                aria-hidden
              /> */}

              {/* content */}
              <div className="relative z-10 flex items-start gap-4">
                <span
                  className={[
                    "wy-icon grid h-12 w-12 place-items-center rounded-xl ring-1",
                    acc.iconBg,
                    "transition-transform duration-300 group-hover:scale-105",
                  ].join(" ")}
                  aria-hidden
                >
                  <Icon size={22} />
                </span>

                <div className="min-w-0">
                  <h3 className="text-lg font-extrabold text-neutral-900">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-neutral-600">{f.desc}</p>
                </div>
              </div>

              {/* corner stamp */}
              <div
                className={[
                  "wy-stamp pointer-events-none absolute bottom-3 right-4 rounded-full border px-2 py-[2px] text-[11px] font-semibold",
                  "tracking-wide uppercase",
                  acc.stamp,
                ].join(" ")}
              >
                Trusted
              </div>

              {/* tiny torn-edge hint */}
              <div className="pointer-events-none absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-[#fffdf8] shadow-[6px_6px_0_-2px_rgba(0,0,0,.08)]" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
