// components/HowItWorks.tsx
"use client";

import { gsap } from "gsap";
import { CalendarCheck, MailCheck, Wallet } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

type Step = {
  icon: React.ElementType;
  title: string;
  desc: string;
  bg: string;
  ring: string;
  fg: string;
};

const STEPS: Step[] = [
  {
    icon: CalendarCheck,
    title: "Choose your trip & date",
    desc: "Pick from Excursions, Diving, or Liveaboard and select an available date.",
    bg: "bg-amber-50",
    ring: "ring-amber-100",
    fg: "text-amber-700",
  },
  {
    icon: MailCheck,
    title: "Confirm your booking",
    desc: "Send us a Whatsapp or email with your details to reserve your spot.",
    bg: "bg-sky-50",
    ring: "ring-sky-100",
    fg: "text-sky-700",
  },
  {
    icon: Wallet,
    title: "Meet your guide & pay on arrival",
    desc: "Show up at the pickup point on the day. No online payments — settle in person.",
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
    fg: "text-emerald-700",
  },
];

// same playful pinned look
const TILTS = [
  "rotate-[-1.2deg] -translate-y-[2px]",
  "rotate-[1.1deg] translate-y-[4px]",
  "rotate-[-0.8deg] -translate-y-[1px]",
];

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

export default function HowItWorks() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    // Header reveal
    const hdr = root.querySelector<HTMLElement>(".hiw-header");
    if (hdr) {
      const kids = Array.from(hdr.children) as HTMLElement[];
      gsap.set(kids, { opacity: 0, y: 16, filter: "blur(6px)" });
      cleanups.push(
        observeOnce(
          hdr,
          () => {
            gsap.to(kids, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.06,
              clearProps: "opacity,transform,filter",
            });
          },
          { rootMargin: "0px 0px -10% 0px" }
        )
      );
    }

    // Cards – float from side, un-tilt, draw connector, micro pops
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>('[data-step="true"]')
    );

    cards.forEach((el) => {
      // ignore hidden duplicates (mobile/desktop)
      const cs = window.getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;

      const side = el.getAttribute("data-side") === "right" ? "right" : "left";
      const fromX = side === "left" ? -20 : 20;
      const initialRotate = side === "left" ? -2 : 2;

      // initial states
      if (!prefersReduced) {
        gsap.set(el, {
          opacity: 0,
          x: fromX,
          y: 18,
          rotate: initialRotate,
          filter: "blur(8px)",
          scale: 0.985,
          willChange: "transform,opacity,filter",
        });
      } else {
        gsap.set(el, { opacity: 0 });
      }

      const connector =
        el.querySelector<HTMLElement>(".hiw-connector") ?? undefined; // we add this class below
      const dot =
        el.querySelector<HTMLElement>(".hiw-connector-dot") ?? undefined;

      if (connector) {
        gsap.set(connector, {
          scaleX: 0,
          transformOrigin: side === "left" ? "right center" : "left center",
        });
      }
      if (dot) gsap.set(dot, { scale: 0.6, opacity: 0 });

      cleanups.push(
        observeOnce(
          el,
          () => {
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            tl.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
              scale: 1,
              duration: prefersReduced ? 0.35 : 0.6,
              clearProps: "opacity,transform,filter",
            });

            if (connector)
              tl.to(
                connector,
                { scaleX: 1, duration: 0.35, ease: "power2.out" },
                "-=0.3"
              );
            if (dot)
              tl.to(
                dot,
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.28,
                  ease: "back.out(2)",
                },
                "-=0.28"
              );

            const pinEl = el.querySelector<HTMLElement>(".hiw-pin");
            const iconEl = el.querySelector<HTMLElement>(".hiw-icon");
            const stampEl = el.querySelector<HTMLElement>(".hiw-stamp");

            if (pinEl)
              tl.fromTo(
                pinEl,
                { autoAlpha: 0, y: -8, scale: 0.6 },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.26,
                  ease: "back.out(2)",
                },
                "-=0.24"
              );
            if (iconEl)
              tl.fromTo(
                iconEl,
                { autoAlpha: 0, y: 6, scale: 0.95 },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.3,
                  ease: "back.out(2)",
                },
                "-=0.22"
              );
            if (stampEl)
              tl.fromTo(
                stampEl,
                { autoAlpha: 0, y: 8 },
                { autoAlpha: 1, y: 0, duration: 0.24 },
                "-=0.18"
              );
          },
          { rootMargin: "0px 0px -12% 0px" }
        )
      );
    });

    // CTA
    const cta = root.querySelector<HTMLElement>("[data-hiw-cta]");
    if (cta) {
      gsap.set(cta, { opacity: 0, y: 12, filter: "blur(6px)" });
      cleanups.push(
        observeOnce(
          cta,
          () => {
            gsap.to(cta, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.45,
              ease: "power2.out",
              clearProps: "opacity,transform,filter",
            });
          },
          { rootMargin: "0px 0px -8% 0px" }
        )
      );
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative mx-auto w-[min(1400px,94vw)] py-12 md:py-16"
    >
      {/* Header */}
      <div className="hiw-header text-center">
        <p className="text-sm font-semibold text-neutral-500">Easy & Fast</p>
        <h2 className="mt-1 text-[clamp(28px,4vw,44px)] font-extrabold leading-tight text-neutral-900">
          Book Your Next Adventure
        </h2>
        <p className="mx-auto mt-2 max-w-[60ch] text-neutral-600">
          Reserve online now —{" "}
          <span className="font-semibold text-neutral-800">pay on arrival</span>
          .
        </p>
      </div>

      {/* Timeline grid */}
      <div
        className={[
          "relative mx-auto mt-10 grid gap-y-8",
          "md:grid md:grid-cols-[1fr_42px_1fr] md:gap-x-4",
        ].join(" ")}
      >
        {/* Center dotted spine (desktop only) */}
        <div
          aria-hidden
          className={[
            "pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block",
            "w-[2px] text-neutral-300",
            "bg-[radial-gradient(currentColor_2px,transparent_2px)] bg-[length:2px_12px] bg-repeat-y",
          ].join(" ")}
        />

        {STEPS.map(({ icon: Icon, title, desc, bg, ring, fg }, i) => {
          const isLeft = i % 2 === 0;

          const Card = (
            <div
              data-step="true"
              data-side={isLeft ? "left" : "right"}
              className={[
                "group relative isolate rounded-2xl bg-[#fffdf8] p-4",
                "ring-1 ring-black/10 shadow-[0_20px_70px_-30px_rgba(0,0,0,.28)]",
                "transition-transform duration-300 hover:-translate-y-1 hover:rotate-0",
                "before:absolute before:inset-0 before:pointer-events-none before:opacity-[.03]",
                "before:[background-image:radial-gradient(rgba(0,0,0,.8)_1px,transparent_1px)] before:[background-size:6px_6px]",
                TILTS[i % TILTS.length],
              ].join(" ")}
            >
              {/* micro-dot texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(black,transparent_75%)]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                }}
              />

              {/* thumb-tack */}
              <span
                className="hiw-pin absolute right-3 top-3 h-3 w-3 rounded-full bg-neutral-900/80 ring-2 ring-neutral-200"
                aria-hidden
              />

              {/* content */}
              <div className="relative z-10 flex items-start gap-4">
                <span
                  className={[
                    "hiw-icon grid h-12 w-12 place-items-center rounded-xl ring-1",
                    bg,
                    ring,
                    fg,
                    "transition-transform duration-300 group-hover:scale-105",
                  ].join(" ")}
                  aria-hidden
                >
                  <Icon size={22} />
                </span>

                <div className="min-w-0">
                  <h3 className="text-[15px] font-extrabold text-neutral-900">
                    {title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-neutral-600">
                    {desc}
                  </p>
                </div>
              </div>

              {/* stamp */}
              <div className="hiw-stamp pointer-events-none absolute bottom-3 right-3 rounded-full border border-neutral-700 px-2 py-[2px] text-[10px] font-semibold tracking-wide text-neutral-800">
                Step {i + 1}
              </div>

              {/* torn-edge nib */}
              <div className="pointer-events-none absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-[#fffdf8] shadow-[6px_6px_0_-2px_rgba(0,0,0,.08)]" />

              {/* connector to spine (desktop only) */}
              <span
                aria-hidden
                className={[
                  "hiw-connector absolute top-1/2 hidden h-[2px] w-8 -translate-y-1/2 md:block",
                  isLeft ? "right-[-2rem]" : "left-[-2rem]",
                  "bg-neutral-300",
                ].join(" ")}
              />
              <span
                aria-hidden
                className={[
                  "hiw-connector-dot absolute top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full md:block",
                  isLeft ? "right-[-2.9rem]" : "left-[-2.9rem]",
                  "bg-neutral-900 ring-2 ring-white",
                ].join(" ")}
              />
            </div>
          );

          return (
            <div key={title} className="contents md:items-center">
              {/* Left column (desktop only) */}
              <div className="hidden md:block">{isLeft && Card}</div>

              {/* Center spacer (desktop only) */}
              <div className="hidden md:block" />

              {/* Right column (desktop only) */}
              <div className="hidden md:block">{!isLeft && Card}</div>

              {/* Mobile single copy */}
              <div className="md:hidden">{Card}</div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      {/* <div className="mt-10 flex justify-center" data-hiw-cta>
        <PrimaryButton
          href="/departures"
          variant="sky"
          size="xl"
          trailingIcon={ArrowRight}
        >
          See upcoming dates
        </PrimaryButton>
      </div> */}
    </section>
  );
}
