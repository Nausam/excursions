"use client";

import PrimaryButton from "@/components/PrimaryButton";
import gsap from "gsap";
import { CalendarDays, DollarSign, MapPin, Ship, Waves } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type RouteDay = {
  day: number;
  title: string;
  dives: string[];
};

type LiveaboardRoute = {
  id: string;
  name: string;
  nights: string;
  atolls: string;
  summary: string;
  accentClass: string; // which ambient gradient to use
  days: RouteDay[];
};

const LIVEABOARD_FACTS = {
  price: "",
  duration: "7 nights on board",
  cabins: "11 cabins • Max ~22 guests",
  base: "Central & Southern Maldives (multiple routes)",
};

const ROUTES: LiveaboardRoute[] = [
  {
    id: "best-of-maldives",
    name: "Best of Maldives – 7 Nights",
    nights: "7 nights",
    atolls: "North Malé • South Malé • Vaavu • South Ari • North Ari",
    summary:
      "The classic central Maldives route: mix of channels, thilas, wrecks and night dives with chances for mantas, sharks and big pelagics.",
    accentClass: "card-ambient-sky-emerald",
    days: [
      {
        day: 1,
        title: "Arrival & Check Dive",
        dives: [
          "Airport pickup and check-in on board",
          "Dive 1: Maagiri – North Malé (check dive)",
        ],
      },
      {
        day: 2,
        title: "North Malé Reefs & Wreck",
        dives: [
          "Dive 2: Hulhumalé Neru – North Malé",
          "Dive 3: Lankan Manta Point – North Malé",
          "Dive 4: Kuda Giri Wreck – South Malé",
        ],
      },
      {
        day: 3,
        title: "Channels & Night Dive (Vaavu)",
        dives: [
          "Dive 5: Kandooma Thila – South Malé",
          "Dive 6: Guraidhoo Kandu – South Malé",
          "Dive 7: Dhevana Kandu – Vaavu",
          "Dive 8: Alimatha Reef – Vaavu (night dive)",
        ],
      },
      {
        day: 4,
        title: "Vaavu & South Ari",
        dives: [
          "Dive 9: Miyaru Kandu – Vaavu",
          "Dive 10: Maamigili Beyru – South Ari",
          "Dive 11: Five Rocks – South Ari",
        ],
      },
      {
        day: 5,
        title: "South Ari Highlights",
        dives: [
          "Dive 12: Kuda Rah Thila – South Ari",
          "Dive 13: Lily Rock – South Ari",
          "Dive 14: Fesdu Lagoon – North Ari",
        ],
      },
      {
        day: 6,
        title: "North Ari Thilas",
        dives: [
          "Dive 15: Fish Head – North Ari",
          "Dive 16: Maaya Thila – North Ari",
          "Dive 17: Bathalaa Thila – North Ari",
        ],
      },
      {
        day: 7,
        title: "Final Channel Dive",
        dives: ["Dive 18: Rasdhoo Madivaru – North Ari"],
      },
      {
        day: 8,
        title: "Departure",
        dives: ["Airport drop and check-out"],
      },
    ],
  },
  {
    id: "deep-south",
    name: "Deep South – 7 Nights",
    nights: "7 nights",
    atolls: "Addu • Fuvahmulah • Gaafu Dhaalu • Gaafu Alif",
    summary:
      "Shark-heavy southern route with tiger sharks in Fuvahmulah, channels full of grey reefs and pristine coral gardens.",
    accentClass: "card-ambient-cyan-emerald",
    days: [
      {
        day: 1,
        title: "Addu Arrival & Check Dive",
        dives: [
          "Airport pickup and check-in",
          "Dive 1: Gan Corner – Addu (check dive)",
        ],
      },
      {
        day: 2,
        title: "Addu Manta & Channels",
        dives: ["Dive 2: Addu Manta Point – Addu", "Dive 3: Maa Kandu – Addu"],
      },
      {
        day: 3,
        title: "Full Day in Fuvahmulah",
        dives: [
          "Dive 4: Fuvahmulah South – Fuvahmulah",
          "Dive 5: Tiger Zoo – Fuvahmulah",
          "Dive 6: Fuvahmulah North – Fuvahmulah",
        ],
      },
      {
        day: 4,
        title: "First Gaafu Alif Channels",
        dives: [
          "Dive 7: Gemanafushi Blue – Gaafu Alif",
          "Dive 8: Maarehaa Kandu – Gaafu Alif",
          "Dive 9: Gemanafushi Coral Garden – Gaafu Alif",
        ],
      },
      {
        day: 5,
        title: "Kondey Area",
        dives: [
          "Dive 10: Kondey Kandu – Gaafu Alif",
          "Dive 11: Kondey Coral Garden – Gaafu Alif",
          "Dive 12: Vodamulah Kandu – Gaafu Alif",
        ],
      },
      {
        day: 6,
        title: "Nilandhoo & Kooddoo",
        dives: [
          "Dive 13: Nilandhoo Kandu – Gaafu Alif",
          "Dive 14: Kerehdhoo Kandu – Gaafu Alif",
          "Dive 15: Kooddoo Shark Feeding – Gaafu Alif",
          "Dive 16: Maamutaa Giri – Gaafu Alif",
        ],
      },
      {
        day: 7,
        title: "Final Gaafu Alif Dives",
        dives: [
          "Dive 17: Vilingili Kandu – Gaafu Alif",
          "Dive 18: Kooddoo Kandu – Gaafu Alif",
        ],
      },
      {
        day: 8,
        title: "Departure",
        dives: ["Airport drop and check-out"],
      },
    ],
  },
  {
    id: "north-fiesta",
    name: "North Fiesta – 7 Nights",
    nights: "7 nights",
    atolls: "North Malé • Baa • Raa • Noonu • Lhaviyani",
    summary:
      "Northern adventure through UNESCO Baa Atoll, manta thilas, walls and long reef drifts with a mix of sharks and macro.",
    accentClass: "card-ambient-sky-violet",
    days: [
      {
        day: 1,
        title: "Arrival & Check Dive",
        dives: [
          "Airport pickup and check-in",
          "Dive 1: Lankan Point – North Malé (check dive)",
        ],
      },
      {
        day: 2,
        title: "North Malé Reefs",
        dives: [
          "Dive 2: Hulhumalé Nerumathi – North Malé",
          "Dive 3: Finger Point – North Malé",
        ],
      },
      {
        day: 3,
        title: "UNESCO Baa Atoll",
        dives: [
          "Dive 4: UNESCO Thila – Baa Atoll",
          "Dive 5: Dharavandhoo Thila – Baa Atoll",
          "Dive 6: Nelivaru Thila – Baa Atoll",
          "Dive 7: Kihaadhoo Thila – Baa Atoll (night dive)",
        ],
      },
      {
        day: 4,
        title: "Baa & Raa Walls",
        dives: [
          "Dive 8: Dhonfanu Thila – Baa Atoll",
          "Dive 9: Anemone Thila – Raa Atoll",
          "Dive 10: Kottafaru Wall – Raa Atoll",
        ],
      },
      {
        day: 5,
        title: "Noonu Channels",
        dives: [
          "Dive 11: Kotta Faru Thila – Raa Atoll",
          "Dive 12: Miyaru Vani – Noonu Atoll",
          "Dive 13: Raafushi Wall – Noonu Atoll",
        ],
      },
      {
        day: 6,
        title: "Noonu & Lhaviyani",
        dives: [
          "Dive 14: Christmas Rock – Noonu Atoll",
          "Dive 15: Kuredhoo Caves – Lhaviyani Atoll",
        ],
      },
      {
        day: 7,
        title: "Final North Malé Dives",
        dives: [
          "Dive 16: Helengeli Thila – North Malé",
          "Dive 17: HP Reef – North Malé (last dive)",
        ],
      },
      {
        day: 8,
        title: "Departure",
        dives: ["Airport drop and check-out"],
      },
    ],
  },
];

/* ---------- IntersectionObserver helper ---------- */
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

function RouteCard({
  route,
  index,
}: {
  route: LiveaboardRoute;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const chevRef = useRef<SVGSVGElement | null>(null);

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
          delay: index * 0.07,
          clearProps: "transform,opacity",
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
  }, [index]);

  const toggle = () => {
    const content = contentRef.current;
    const chev = chevRef.current;

    setOpen((prev) => {
      const next = !prev;
      if (!content || !chev) return next;

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

      return next;
    });
  };

  return (
    <div ref={cardRef} data-route-card>
      <article
        className={`card-ambient cursor-pointer p-6 md:p-7 shadow-sm md:shadow-md transition-transform duration-200 hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300`}
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
        {/* thin top accent */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400" />

        <div className="relative z-10 space-y-4">
          {/* HEADER */}
          <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1">
              {/* <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Liveaboard route
              </p> */}
              <h3 className="text-lg font-extrabold text-slate-900 md:text-xl">
                {route.name}
              </h3>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                Atolls visited:
                <span className="ml-1 normal-case font-medium tracking-normal text-sky-800">
                  {route.atolls}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 md:pt-1">
              <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 ring-1 ring-sky-100 shadow-[0_6px_16px_rgba(15,23,42,0.05)]">
                {route.nights}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-500 ring-1 ring-slate-200 shadow-sm">
                <svg ref={chevRef} className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </header>

          {/* SUMMARY */}
          <p className="text-sm leading-relaxed text-slate-700">
            {route.summary}
          </p>

          {/* EXPANDED DAY-BY-DAY GRID */}
          <div
            ref={contentRef}
            style={{
              display: "none",
              height: 0,
              overflow: "hidden",
              opacity: 0,
            }}
          >
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {route.days.map((day) => (
                <div
                  key={day.day}
                  className={[
                    "relative overflow-hidden rounded-2xl bg-white/98 p-4 md:p-5",
                    "ring-1 ring-sky-50 shadow-sm",
                    "before:pointer-events-none before:absolute before:inset-0",
                    "before:opacity-[.035] before:[background-image:radial-gradient(rgba(15,23,42,.7)_1px,transparent_1px)]",
                    "before:[background-size:6px_6px]",
                  ].join(" ")}
                >
                  {/* top strip */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400/70 via-cyan-400/70 to-emerald-400/70" />

                  <div className="relative z-10 flex h-full flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                        Day {day.day}
                      </p>
                      <span className="rounded-full bg-sky-50 px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 ring-1 ring-sky-100">
                        Route plan
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {day.title}
                    </p>

                    <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                      {day.dives.map((dive) => (
                        <li key={dive} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                          <span>{dive}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTNOTE */}
          {/* <p className="pt-1 text-[11px] text-slate-500">
            Tap to view (or hide) the full day-by-day plan for this route.
          </p> */}
        </div>
      </article>
    </div>
  );
}

export default function DiveInLiveaboardPage() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const factsRef = useRef<HTMLElement | null>(null);
  const routesRef = useRef<HTMLElement | null>(null);
  const bookingRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const cleanups: Array<() => void> = [];

    // Make sure the shell is never stuck transparent
    gsap.set(shell, { opacity: 1 });

    // Only animate vertical lift, not opacity
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

    // Quick facts cards + fleet card
    if (factsRef.current) {
      const sec = factsRef.current;
      const cleanup = observeOnce(
        sec,
        () => {
          const factCards =
            sec.querySelectorAll<HTMLElement>("[data-fact-card]");
          const fleet = sec.querySelector<HTMLElement>("[data-fleet-card]");

          if (factCards.length) {
            gsap.from(factCards, {
              opacity: 0,
              y: 18,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.08,
            });
          }

          if (fleet) {
            gsap.from(fleet, {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.1,
            });
          }
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      cleanups.push(cleanup);
    }

    // Routes header (cards themselves animate individually via RouteCard)
    if (routesRef.current) {
      const sec = routesRef.current;
      const cleanup = observeOnce(
        sec,
        () => {
          const header = sec.querySelector<HTMLElement>("[data-routes-header]");
          if (header) {
            gsap.from(header, {
              opacity: 0,
              y: 16,
              duration: 0.5,
              ease: "power3.out",
            });
          }
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      cleanups.push(cleanup);
    }

    // Booking CTA panel
    if (bookingRef.current) {
      const sec = bookingRef.current;
      const panel = sec.querySelector<HTMLElement>("[data-booking-panel]");
      if (panel) {
        const cleanup = observeOnce(
          sec,
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
              <span>Dive in liveaboard</span>
              <span className="h-1 w-1 rounded-full bg-sky-500" />
              <span className="normal-case text-[11px] font-medium tracking-normal text-sky-800">
                Central • Deep South • Northern routes
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Explore the Maldives
              </span>
              <br />
              <span className="text-slate-900">
                on a week-long diving liveaboard.
              </span>
            </h1>

            <p className="max-w-fll text-sm leading-relaxed text-slate-700 md:text-base">
              Dive into crystal-clear channels, manta cleaning stations and
              sharky drop-offs while living on board a comfortable Maldivian
              liveaboard. Wake up, dive, eat, repeat with sunset views from the
              sundeck and new sites every day.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton
                href="https://wa.me/9607557042?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Maldives%20liveaboard%20trip.%20We%20are%20____%20divers%20and%20our%20preferred%20dates%20are%20____."
                variant="emerald"
                size="lg"
              >
                WhatsApp us to book
              </PrimaryButton>
            </div>
          </div>

          {/* Right image */}
          <div className="relative h-[260px] md:h-[320px] lg:h-[360px]">
            <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-sky-400/40 via-cyan-500/40 to-emerald-400/35 blur-2" />
            <div className="relative h-full overflow-hidden rounded-md bg-slate-900/80 ring-1 ring-sky-200/80 shadow-md">
              <Image
                src="/images/liveaboard.jpg"
                alt="Liveaboard boat cruising over turquoise Maldivian water"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                unoptimized
              />

              <div className="absolute left-4 bottom-4">
                {/* gradient frame */}
                <div className="inline-flex rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 p-[2px] shadow-xl shadow-sky-900/30">
                  {/* glass inner pill */}
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs md:text-sm font-medium text-white ring-1 ring-white/40 backdrop-blur-md">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/40">
                      <MapPin className="h-4 w-4" />
                    </span>

                    <div className="leading-tight">
                      {/* <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-50/90">
                        Adora
                      </p> */}
                      <p className="text-[11px] md:text-xs font-semibold">
                        123 ft tri-deck liveaboard
                      </p>
                      <p className="text-[10px] text-sky-50/80">
                        11 cabins • Sundeck • Indoor lounge
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick facts & fleet */}
        <section
          ref={factsRef}
          className="grid items-start gap-10 md:grid-cols-[1.15fr,0.95fr]"
        >
          {/* Quick facts */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 md:text-xl">
              Trip summary
            </h2>
            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              {/* Price */}
              <div
                data-fact-card
                className="relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-sky-100 shadow-sm"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400" />
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Price
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {LIVEABOARD_FACTS.price}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Exact rate depends on route, season &amp; cabin type.
                    </p>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div
                data-fact-card
                className="relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-sky-100 shadow-sm"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400" />
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Duration
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {LIVEABOARD_FACTS.duration}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      3–4 dives per day depending on route and conditions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cabins */}
              <div
                data-fact-card
                className="relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-sky-100 shadow-sm"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-400" />
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <Ship className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Cabins
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {LIVEABOARD_FACTS.cabins}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Mix of lower-deck cabins and upper-deck suites.
                    </p>
                  </div>
                </div>
              </div>

              {/* Routes / base */}
              <div
                data-fact-card
                className="relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-sky-100 shadow-sm"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400 via-emerald-400 to-cyan-400" />
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Routes
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      Central, Deep South &amp; Northern Maldives
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Best of Maldives, Deep South &amp; North Fiesta
                      itineraries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet card */}
          <div
            data-fleet-card
            className="relative overflow-hidden rounded-2xl bg-white/98 p-5 ring-1 ring-slate-200 shadow-sm md:p-6"
          >
            {/* subtle dotted texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(15,23,42,0.65) 1px, transparent 1px)",
                backgroundSize: "6px 6px",
              }}
            />

            {/* top accent strip */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400" />

            <div className="relative z-10 space-y-3">
              <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                Our liveaboard – Adora
              </h2>
              <p className="text-sm leading-relaxed text-slate-700">
                Adora is a 123 ft tri-deck Maldivian liveaboard with comfortable
                cabins, indoor lounge, open sundeck and a dedicated dive dhoni.
                Onboard facilities include A/C cabins with ensuite bathrooms,
                shaded briefing area, camera rinse tanks and nitrox for
                certified divers.
              </p>

              <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>11 cabins across lower and upper decks</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Approx. 37m × 10m • Spacious dive deck</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Wi-Fi available on board (where network allows)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Nitrox &amp; rental equipment available</span>
                </div>
              </div>

              {/* note bar */}
              <div className="mt-3 flex items-center gap-3 rounded-full bg-sky-50/70 px-3 py-2 text-xs text-slate-600 ring-1 ring-sky-100">
                <Waves className="h-4 w-4 text-sky-600" />
                <span>
                  Routes and number of dives may change slightly depending on
                  conditions and marine life.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Routes / itineraries */}
        <section ref={routesRef} className="space-y-4">
          <div
            data-routes-header
            className="flex items-baseline justify-between gap-4"
          >
            <h2 className="text-lg font-bold text-slate-900 md:text-xl">
              7-Night Itineraries
            </h2>
            <p className="text-xs text-slate-500 md:text-sm">
              Tap a route to see the full day-by-day plan.
            </p>
          </div>

          <div className="space-y-6">
            {ROUTES.map((route, i) => (
              <RouteCard key={route.id} route={route} index={i} />
            ))}
          </div>
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
                  Ready for your next liveaboard adventure?
                </h2>
                <p className="text-sm leading-relaxed text-slate-700">
                  Send us your preferred month, which route you like (Best of
                  Maldives, Deep South or North Fiesta), your certification
                  level and how many divers are in your group.
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-1 md:items-end">
                <PrimaryButton
                  href="https://wa.me/9607557042?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Maldives%20liveaboard%20trip.%20We%20are%20____%20divers%20and%20our%20preferred%20dates%20are%20____."
                  variant="emerald"
                  size="lg"
                >
                  WhatsApp us to book
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
