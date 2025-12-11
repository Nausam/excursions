"use client";

import PrimaryButton from "@/components/PrimaryButton";
import gsap from "gsap";
import {
  CalendarDays,
  DollarSign,
  MapPin,
  PlusCircle,
  Waves,
} from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

type DivePackage = {
  id: "tiger" | "baa";
  title: string;
  locationLabel: string;
  shortLabel: string;
  price: string;
  duration: string;
  blurb: string;
  inclusions: string[];
  addOns: string[];
};

const PACKAGES: DivePackage[] = [
  {
    id: "tiger",
    title: "Dive with Tiger Sharks – Fuvahmulah",
    locationLabel: "Fuvahmulah • Southern Maldives (Equator)",
    shortLabel: "Tiger sharks & pelagic life",
    price: "From $2276 per person",
    duration: "7 nights",
    blurb:
      "Fuvahmulah is an incredibly unique equatorial island with rich pelagic life and a healthy population of resident tiger sharks. Diving here is excellent all year round, with 100% guaranteed tiger shark dives and changing pelagic encounters depending on the currents.",
    inclusions: [
      "Return domestic flight transfer Malé ↔ Fuvahmulah",
      "7 nights stay in a local hotel",
      "Full-board meals (breakfast, lunch and dinner)",
      "15 dives (3 dives per day: 1 tiger shark dive and 2 reef dives)",
      "Dive equipment provided (fins, mask, wetsuit)",
      "Underwater photography service",
      "Guided island tour",
      "Airport to hotel transfer on arrival and departure",
      "Daily hotel ↔ dive boat transfers",
    ],
    addOns: ["Motorbike rental — approx. $30 per day"],
  },
];

/* IntersectionObserver helper (same pattern as detail page) */
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

export default function DiveWithLocalsPageClient() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const noteRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const bookingRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const cleanups: Array<() => void> = [];

    // make sure shell is always fully visible
    gsap.set(shell, { opacity: 1 });

    // only animate the lift, not opacity
    const shellTween = gsap.fromTo(
      shell,
      { y: 18 },
      {
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "transform",
      }
    );

    // "Two ways to dive with locals" section – soft fade/slide in
    if (noteRef.current) {
      const section = noteRef.current;
      const cleanup = observeOnce(
        section,
        () => {
          gsap.from(section, {
            opacity: 0,
            y: 18,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      cleanups.push(cleanup);
    }

    // Package cards – staggered rise on scroll
    if (cardsRef.current) {
      const container = cardsRef.current;
      const cleanup = observeOnce(
        container,
        () => {
          const cards =
            container.querySelectorAll<HTMLElement>("[data-dive-card]");
          gsap.from(cards, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
          });
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      cleanups.push(cleanup);
    }

    // Booking CTA – fade up when user reaches the end
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
        className="space-y-10 rounded-[32px] bg-gradient-to-b from-sky-50/80 via-white to-sky-50/60 p-6 shadow-xl ring-1 ring-sky-100/60 md:space-y-12 md:p-10"
      >
        {/* Hero */}
        <section className="grid items-center gap-10 md:grid-cols-[1.15fr,0.85fr]">
          {/* Left text */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-900 ring-1 ring-sky-200 shadow-sm">
              <span>Dive with locals</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Dive the Maldives
              </span>
              <br />
              <span className="text-slate-900">
                with local guides &amp; real island life.
              </span>
            </h1>

            <p className="max-w-full text-sm leading-relaxed text-slate-700 md:text-base">
              Diving in the Maldives is the most popular way to see the
              underwater world. From manta-filled reefs in Baa Atoll to
              year-round tiger sharks in Fuvahmulah, we pair certified local
              guides with comfortable island stays so you get the best of
              Maldivian diving at your level.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton
                href="https://wa.me/9607557042?text=Hi%2C%20I%27m%20interested%20in%20the%20Dive%20with%20Locals%20packages.%20My%20name%20is%20____%20and%20we%20are%20____%20certified%20divers."
                variant="emerald"
                size="lg"
              >
                Chat on WhatsApp
              </PrimaryButton>
            </div>
          </div>

          {/* Right image */}
          <div className="relative h-[260px] md:h-[320px] lg:h-[360px]">
            <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-sky-400/40 via-cyan-500/40 to-emerald-400/35 blur-2" />
            <div className="relative h-full overflow-hidden rounded-md bg-slate-900/80 ring-1 ring-sky-200/80 shadow-md">
              <Image
                src="/images/diving.jpg"
                alt="Divers exploring a Maldivian reef"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority={false}
                unoptimized
              />

              <div className="absolute left-4 bottom-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg ring-1 ring-white/60 backdrop-blur">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/40">
                    <Waves className="h-4 w-4" />
                  </span>
                  <div className="leading-tight">
                    <p className="font-semibold">Guided fun dives</p>
                    <p className="text-[11px] text-sky-50/90">
                      Local DM &amp; small groups
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick note / who it's for */}
        <section
          ref={noteRef}
          className="space-y-3 text-sm leading-relaxed text-slate-700 md:text-[15px]"
        >
          <h2 className="text-lg font-bold text-slate-900 md:text-xl">
            Two ways to dive with locals
          </h2>
          <p>
            Whether you want close, respectful encounters with tiger sharks or
            manta-focused reef dives in a UNESCO Biosphere Reserve, these
            week-long trips are built for certified divers who want full days in
            the water and relaxed island evenings.
          </p>
        </section>

        {/* Packages */}
        <section ref={cardsRef} className="space-y-8">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              data-dive-card
              className="card-ambient  p-6 shadow-md md:p-10"
            >
              {/* top accent */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-400" />

              <div className="relative z-10 space-y-5">
                {/* Header */}
                <header className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    {pkg.shortLabel}
                  </p>
                  <h2 className="text-lg md:text-xl font-extrabold text-slate-900">
                    {pkg.title}
                  </h2>
                  <p className="text-xs font-medium text-emerald-700">
                    {pkg.locationLabel}
                  </p>
                </header>

                {/* Main body: text + info column */}
                <div className="grid gap-8 md:grid-cols-[minmax(0,1.7fr),minmax(0,1.3fr)] items-start">
                  {/* Left: blurb + lists */}
                  <div className="space-y-5">
                    <p className="text-sm md:text-[15px] leading-relaxed text-slate-700">
                      {pkg.blurb}
                    </p>

                    {/* Inclusions */}
                    <div className="space-y-2">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        Inclusions
                      </p>
                      <ul className="space-y-1.5 text-sm text-slate-700">
                        {pkg.inclusions.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Optional add-ons */}
                    <div className="space-y-2 border-t border-emerald-50 pt-4">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                        Optional add-ons
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {pkg.addOns.map((item) => (
                          <div
                            key={item}
                            className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs md:text-sm font-medium text-sky-900 ring-1 ring-sky-100 shadow-sm"
                          >
                            <PlusCircle className="h-4 w-4 text-emerald-500" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: compact info cards */}
                  <div className="space-y-3">
                    {/* Price */}
                    <div className="relative overflow-hidden rounded-2xl bg-white/96 p-4 ring-1 ring-emerald-100 shadow-sm">
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-400" />
                      <div className="relative z-10 flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Price
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            {pkg.price}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            Excludes international flights &amp; insurance.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="relative overflow-hidden rounded-2xl bg-white/96 p-4 ring-1 ring-slate-200 shadow-sm">
                      <div className="relative z-10 flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                          <CalendarDays className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Duration
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            {pkg.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Base */}
                    <div className="relative overflow-hidden rounded-2xl bg-white/96 p-4 ring-1 ring-slate-200 shadow-sm">
                      <div className="relative z-10 flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Base
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            {pkg.locationLabel}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Certification */}
                    <div className="relative overflow-hidden rounded-2xl bg-white/96 p-4 ring-1 ring-slate-200 shadow-sm">
                      <div className="relative z-10 flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                          <Waves className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Certification
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            Open Water or above recommended
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            Contact us if you&apos;re unsure whether your level
                            fits.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Booking CTA */}
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
                  Ready to book your dive week?
                </h2>
                <p className="text-sm leading-relaxed text-slate-700">
                  Send us your preferred month, which package you&apos;re
                  interested in (Tiger Sharks or Baa Atoll), your certification
                  level and how many divers are in your group.
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-1 md:items-end">
                <PrimaryButton
                  href="https://wa.me/9607557042?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Dive%20with%20Locals%20package%20in%20the%20Maldives.%20We%20are%20____%20certified%20divers%20and%20our%20dates%20are%20____"
                  variant="emerald"
                  size="lg"
                >
                  Contact Us
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
