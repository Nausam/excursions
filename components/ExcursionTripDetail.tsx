"use client";

import PrimaryButton from "@/components/PrimaryButton";
import gsap from "gsap";
import {
  CalendarDays,
  ChevronDown,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

export type AvailabilityConfig = {
  yearLabel: string;
  description: string;
  months: string[];
};

export type ItineraryDay = {
  day: number;
  title: string;
  description: string[];
};

export type QuickFactsConfig = {
  price: string;
  duration: string;
  groupSize: string;
  location: string;
};

export type HeroConfig = {
  badgeLabel: string;
  badgeMeta: string;
  titleHighlight: string;
  titleRest: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  routeChipLabel: string;
  routeChipTitle: string;
  routeChipSubtitle: string;
};

export type BookingConfig = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type ExcursionTripDetailProps = {
  hero: HeroConfig;
  quickFacts: QuickFactsConfig;
  overview: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  booking: BookingConfig;
  availability?: AvailabilityConfig;
};

/* ---------- Per-day color accents (no tilt) ---------- */
const DAY_ACCENTS = [
  {
    bg: "bg-sky-50/20",
    ring: "ring-sky-200",
    label: "text-sky-700",
    stampBg: "bg-sky-50/90",
    stampBorder: "border-sky-700/80",
    stampText: "text-sky-800",
    bullet: "bg-sky-400",
  },
  {
    bg: "bg-emerald-50/20",
    ring: "ring-emerald-200",
    label: "text-emerald-700",
    stampBg: "bg-emerald-50/90",
    stampBorder: "border-emerald-700/80",
    stampText: "text-emerald-800",
    bullet: "bg-emerald-400",
  },
  {
    bg: "bg-amber-50/20",
    ring: "ring-amber-200",
    label: "text-amber-700",
    stampBg: "bg-amber-50/90",
    stampBorder: "border-amber-700/80",
    stampText: "text-amber-800",
    bullet: "bg-amber-400",
  },
  {
    bg: "bg-violet-50/20",
    ring: "ring-violet-200",
    label: "text-violet-700",
    stampBg: "bg-violet-50/90",
    stampBorder: "border-violet-700/80",
    stampText: "text-violet-800",
    bullet: "bg-violet-400",
  },
  {
    bg: "bg-lime-50/20",
    ring: "ring-lime-200",
    label: "text-lime-700",
    stampBg: "bg-lime-50/90",
    stampBorder: "border-lime-700/80",
    stampText: "text-lime-800",
    bullet: "bg-lime-400",
  },
  {
    bg: "bg-cyan-50/20",
    ring: "ring-cyan-200",
    label: "text-cyan-700",
    stampBg: "bg-cyan-50/90",
    stampBorder: "border-cyan-700/80",
    stampText: "text-cyan-800",
    bullet: "bg-cyan-400",
  },
  {
    bg: "bg-rose-50/20",
    ring: "ring-rose-200",
    label: "text-rose-700",
    stampBg: "bg-rose-50/90",
    stampBorder: "border-rose-700/80",
    stampText: "text-rose-800",
    bullet: "bg-rose-400",
  },
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

function ItineraryCard({ item, i }: { item: ItineraryDay; i: number }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const chevronRef = useRef<SVGSVGElement | null>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { y: 20, opacity: 0 });

    return observeOnce(
      card,
      () => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.06,
          clearProps: "transform,opacity",
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
  }, [i]);

  const toggle = () => {
    const content = contentRef.current;
    const chev = chevronRef.current;

    setOpen((prev) => {
      const next = !prev;

      if (content && chev) {
        if (next) {
          gsap.killTweensOf(content);
          gsap.set(content, { display: "block" });
          gsap.fromTo(
            content,
            { height: 0, opacity: 0 },
            {
              height: "auto",
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
              clearProps: "height",
            }
          );
          gsap.to(chev, { rotate: 180, duration: 0.25, ease: "power2.out" });
        } else {
          gsap.killTweensOf(content);
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(content, { display: "none" });
            },
          });
          gsap.to(chev, { rotate: 0, duration: 0.2, ease: "power2.out" });
        }
      }

      return next;
    });
  };

  const acc = DAY_ACCENTS[i % DAY_ACCENTS.length];

  return (
    <div ref={cardRef}>
      <article
        className={[
          "relative isolate cursor-pointer rounded-2xl p-5 md:p-6",
          acc.bg,
          "ring-1 shadow-md",
          acc.ring,
          "transition-transform duration-250 hover:-translate-y-[3px] focus:outline-none focus:ring-2 focus:ring-sky-300",
          "before:absolute before:inset-0 before:pointer-events-none before:opacity-[.04] before:[background-image:radial-gradient(rgba(15,23,42,.6)_1px,transparent_1px)] before:[background-size:6px_6px]",
        ].join(" ")}
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(circle_at_top,black,transparent_70%)]" />

        <div className="relative z-10 flex w-full items-center justify-between gap-4 text-left">
          <div>
            <p
              className={[
                "text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.22em]",
                acc.label,
              ].join(" ")}
            >
              Day {item.day}
            </p>
            <p className="mt-1 text-sm md:text-base font-bold text-slate-900">
              {item.title}
            </p>
          </div>
          <ChevronDown
            ref={chevronRef}
            className="h-5 w-5 shrink-0 text-slate-500"
          />
        </div>

        <div className="relative z-10 pt-2 text-sm text-slate-800">
          <div
            ref={contentRef}
            style={{
              display: "none",
              height: 0,
              overflow: "hidden",
              opacity: 0,
            }}
          >
            <div className="mt-1 leading-relaxed">
              <ul className="space-y-1.5">
                {item.description.map((line, idx) => (
                  <li key={idx} className="relative pl-4 text-slate-800">
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full",
                        acc.bullet,
                      ].join(" ")}
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className={[
            "pointer-events-none absolute bottom-3 right-4 rounded-full px-2 py-[2px] text-[11px] font-semibold uppercase tracking-wide border",
            acc.stampBg,
            acc.stampBorder,
            acc.stampText,
          ].join(" ")}
        >
          Day plan
        </div>
        <div className="pointer-events-none absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-white/70 shadow-[6px_6px_0_-2px_rgba(0,0,0,.08)]" />
      </article>
    </div>
  );
}

export default function ExcursionTripDetail({
  hero,
  quickFacts,
  overview,
  inclusions,
  exclusions,
  itinerary,
  booking,
  availability,
}: ExcursionTripDetailProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const listsRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const availabilityRef = useRef<HTMLElement | null>(null);
  const bookingRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    const cleanups: Array<() => void> = [];

    gsap.set(el, { opacity: 1 });

    const shellTween = gsap.fromTo(
      el,
      { y: 18 },
      { y: 0, duration: 0.7, ease: "power3.out", clearProps: "transform" }
    );

    if (summaryRef.current) {
      const section = summaryRef.current;
      const cleanup = observeOnce(
        section,
        () => {
          const cards = section.querySelectorAll<HTMLElement>(
            "[data-summary-card]"
          );
          gsap.from(cards, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          });
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      cleanups.push(cleanup);
    }

    if (overviewRef.current) {
      const section = overviewRef.current;
      const cleanup = observeOnce(
        section,
        () => {
          const paras = section.querySelectorAll<HTMLElement>(
            "[data-overview-paragraph]"
          );
          gsap.from(paras, {
            opacity: 0,
            x: 24,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          });
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      cleanups.push(cleanup);
    }

    if (listsRef.current) {
      const section = listsRef.current;
      const cleanup = observeOnce(
        section,
        () => {
          const cards =
            section.querySelectorAll<HTMLElement>("[data-list-card]");
          const [included, excluded] = Array.from(cards);
          if (included) {
            gsap.from(included, {
              opacity: 0,
              x: -24,
              duration: 0.6,
              ease: "power3.out",
            });
          }
          if (excluded) {
            gsap.from(excluded, {
              opacity: 0,
              x: 24,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.05,
            });
          }
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      cleanups.push(cleanup);
    }

    if (availabilityRef.current) {
      const section = availabilityRef.current;
      const banner = section.querySelector<HTMLElement>(
        "[data-availability-banner]"
      );
      if (banner) {
        const cleanup = observeOnce(
          section,
          () => {
            gsap.from(banner, {
              opacity: 0,
              y: 18,
              scale: 0.97,
              duration: 0.6,
              ease: "power3.out",
            });
          },
          { rootMargin: "0px 0px -12% 0px" }
        );
        cleanups.push(cleanup);
      }
    }

    if (bookingRef.current) {
      const section = bookingRef.current;
      const panel = section.querySelector<HTMLElement>("[data-booking-panel]");
      if (panel) {
        const cleanup = observeOnce(
          section,
          () => {
            gsap.from(panel, {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: "power3.out",
            });
          },
          { rootMargin: "0px 0px -12% 0px" }
        );
        cleanups.push(cleanup);
      }
    }

    return () => {
      cleanups.forEach((fn) => fn());
      shellTween.kill();
    };
  }, []);

  return (
    <main className="mx-auto w-[min(1100px,94vw)] py-10 md:py-16 mt-10">
      <div
        ref={shellRef}
        className="space-y-12 rounded-[32px] bg-gradient-to-b from-sky-50/80 via-white to-sky-50/60 p-6 shadow-xl ring-1 ring-sky-100/60 md:p-10"
      >
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[1.15fr,0.85fr] items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-900 ring-1 ring-sky-200 shadow-sm">
              <span>{hero.badgeLabel}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {hero.titleHighlight}
              </span>
              <br />
              <span className="text-slate-900">{hero.titleRest}</span>
            </h1>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed max-w-full">
              {hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton href={booking.ctaHref} variant="emerald" size="lg">
                {booking.ctaLabel}
              </PrimaryButton>
            </div>
          </div>

          <div className="relative h-[260px] md:h-[320px] lg:h-[360px]">
            <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-sky-400/40 via-cyan-500/40 to-emerald-400/35 blur-2" />
            <div className="relative h-full rounded-md overflow-hidden bg-slate-900/80 ring-1 ring-sky-200/80 shadow-md">
              <Image
                src={hero.imageSrc}
                alt={hero.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                unoptimized
              />

              <div className="absolute left-4 bottom-4">
                <div className="inline-flex rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 p-[2px] shadow-xl shadow-sky-900/30">
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs md:text-sm font-medium text-white ring-1 ring-white/40 backdrop-blur-md">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/40">
                      <MapPin className="h-4 w-4" />
                    </span>

                    <div className="leading-tight">
                      <p className="text-[11px] md:text-xs font-semibold">
                        {hero.routeChipTitle}
                      </p>
                      <p className="text-[10px] text-sky-50/80">
                        {hero.routeChipSubtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick facts & overview */}
        <section className="grid gap-10 md:grid-cols-[1.2fr,0.9fr] items-start">
          <div ref={summaryRef} className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Trip summary
            </h2>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div
                data-summary-card
                className="relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-sky-100 shadow-sm"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400" />
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Price
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">
                      {quickFacts.price}
                    </dd>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Shared rooms • single room extra
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-summary-card
                className="relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-sky-100 shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400" />
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Duration
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">
                      {quickFacts.duration}
                    </dd>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Ideal for a one-week escape
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-summary-card
                className="relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-sky-100 shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-400" />
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Group size
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">
                      {quickFacts.groupSize}
                    </dd>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Small groups for better sightings
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-summary-card
                className="relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-sky-100 shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400 via-emerald-400 to-cyan-400" />
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Location
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">
                      {quickFacts.location}
                    </dd>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Domestic flights included
                    </p>
                  </div>
                </div>
              </div>
            </dl>
          </div>

          <div
            ref={overviewRef}
            className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed"
          >
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Tour overview
            </h2>
            {overview.map((para, idx) => (
              <p key={idx} data-overview-paragraph>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Inclusions / Exclusions */}
        <section ref={listsRef} className="space-y-5">
          <div
            data-list-card
            className={[
              "relative isolate rounded-2xl p-5 md:p-6 overflow-hidden",
              "bg-white",
              "ring-1 ring-emerald-100 shadow-sm md:shadow-md",
              "before:absolute before:inset-0 before:pointer-events-none before:opacity-[.04] before:[background-image:radial-gradient(rgba(15,23,42,.6)_1px,transparent_1px)] before:[background-size:6px_6px]",
            ].join(" ")}
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-emerald-300 to-sky-300" />

            <div className="relative z-10 flex w-full items-center justify-between gap-3 text-left">
              <h2 className="text-lg font-semibold text-slate-900">
                What&apos;s included
              </h2>
            </div>

            <div className="relative z-10 pt-2 text-sm text-slate-700">
              <ul className="mt-1 space-y-2">
                {inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl bg-white/90 px-3 py-2 ring-1 ring-emerald-100"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-sm" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            data-list-card
            className={[
              "relative isolate rounded-2xl p-5 md:p-6 overflow-hidden",
              "bg-white",
              "ring-1 ring-rose-100 shadow-sm md:shadow-md",
              "before:absolute before:inset-0 before:pointer-events-none before:opacity-[.04] before:[background-image:radial-gradient(rgba(15,23,42,.6)_1px,transparent_1px)] before:[background-size:6px_6px]",
            ].join(" ")}
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-rose-400 via-rose-300 to-orange-300" />

            <div className="relative z-10 flex w-full items-center justify-between gap-3 text-left">
              <h2 className="text-lg font-semibold text-slate-900">
                What&apos;s not included
              </h2>
            </div>

            <div className="relative z-10 pt-2 text-sm text-slate-700">
              <ul className="mt-1 space-y-2">
                {exclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl bg-white/90 px-3 py-2 ring-1 ring-rose-50"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-400 shadow-sm" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Itinerary */}
        <section aria-labelledby="itinerary-heading" className="space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="itinerary-heading"
              className="text-lg md:text-xl font-bold text-slate-900"
            >
              Detailed Itinerary
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              Tap a day to see the plan.
            </p>
          </div>

          <div className="space-y-6">
            {itinerary.map((item, index) => (
              <ItineraryCard key={item.day} item={item} i={index} />
            ))}
          </div>
        </section>

        {/* Availability months (optional) */}
        {availability && (
          <section ref={availabilityRef} className="mt-8">
            <div
              data-availability-banner
              className="card-ambient card-ambient-emerald ring-sky-100/70 px-6 py-6 md:px-8 md:py-7 shadow-md"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.28] [mask-image:radial-gradient(circle_at_top,black,transparent_70%)] bg-gradient-to-b from-yellow-50/80 via-transparent to-emerald-50/70" />

              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <div className="inline-flex items-center rounded-full bg-white/90 px-5 py-1.5 text-md font-bold uppercase tracking-[0.24em] text-slate-900 ring-1 ring-emerald-200 shadow-sm">
                  <span>Bookings available · {availability.yearLabel}</span>
                </div>

                <p className="max-w-2xl text-sm md:text-[15px] leading-relaxed text-slate-700">
                  {availability.description}
                </p>

                <div className="mt-1 w-full max-w-xl rounded-2xl bg-white/90 px-4 py-4 ring-1 ring-emerald-100 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">
                    Months you can join
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2.5">
                    {availability.months.map((month) => (
                      <span
                        key={month}
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-slate-900 ring-1 ring-emerald-300 shadow-sm"
                      >
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>{month}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Booking */}
        <section
          id="booking"
          ref={bookingRef}
          className="mt-4 border-t border-slate-200 pt-6"
        >
          <div
            data-booking-panel
            className="card-ambient px-5 py-5 shadow-md md:px-6 md:py-6"
          >
            <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl space-y-1">
                <h2 className="text-lg font-bold text-slate-900 md:text-2xl">
                  {booking.heading}
                </h2>
                <p className="text-sm leading-relaxed text-slate-700">
                  {booking.body}
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-1 md:items-end">
                <PrimaryButton
                  href={booking.ctaHref}
                  variant="emerald"
                  size="lg"
                >
                  {booking.ctaLabel}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
