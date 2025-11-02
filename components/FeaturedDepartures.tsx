"use client";

import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

type Category = "SAFARI" | "EXCURSION" | "DIVING";

type Featured = {
  category: Category;
  title: string; // e.g. “Sunset Safari”
  dateISO: string; // next highlighted date
  meet: string;
  durationHrs: number;
  price?: string; // optional
  remaining: number; // seats left
  image: string; // optional bg image path (public/)
};

const CARDS: Featured[] = [
  {
    category: "SAFARI",
    title: "Sunset Safari",
    dateISO: "2025-11-12T16:30:00Z",
    meet: "Main Gate",
    durationHrs: 4,
    price: "$129",
    remaining: 3,
    image: "/images/safari.jpg",
  },
  {
    category: "EXCURSION",
    title: "Waterfalls Circuit",
    dateISO: "2025-11-14T13:00:00Z",
    meet: "City Center",
    durationHrs: 6,
    price: "$89",
    remaining: 9,
    image: "/images/excursion.jpg",
  },
  {
    category: "DIVING",
    title: "Reef Discovery Dive",
    dateISO: "2025-11-16T12:30:00Z",
    meet: "Marina Pier B",
    durationHrs: 5,
    price: "$159",
    remaining: 0,
    image: "/images/diving.jpg",
  },
];

const LABEL: Record<Category, string> = {
  SAFARI: "Safari",
  EXCURSION: "Excursion",
  DIVING: "Diving",
};

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "2-digit",
  }).format(new Date(iso));

const fmtTime = (iso: string) =>
  new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

export default function FeaturedDepartures() {
  return (
    <section className="mx-auto w-[min(1400px,94vw)] py-10 md:py-14">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
            Featured departures
          </h2>
          <p className="mt-1 text-neutral-600">
            A top pick from each trip type. Reserve now, pay on arrival.
          </p>
        </div>

        <Link
          href="/departures"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-white text-sm hover:bg-neutral-800"
        >
          View full calendar <ArrowRight size={16} />
        </Link>
      </div>

      {/* 3 big cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {CARDS.map((c) => {
          const soldOut = c.remaining <= 0;
          const low = c.remaining > 0 && c.remaining <= 5;

          return (
            <article
              key={c.category}
              className="
                relative overflow-hidden rounded-[22px] bg-white
                shadow-[0_26px_90px_rgba(0,0,0,.12)]
              "
            >
              {/* Top visual */}
              <div
                className="
                  h-[180px] w-full bg-cover bg-center
                  md:h-[220px]
                "
                style={{ backgroundImage: `url(${c.image})` }}
                aria-hidden
              >
                {/* dark veil for legibility */}
                <div className="h-full w-full bg-[linear-gradient(to_top,rgba(0,0,0,.45),rgba(0,0,0,.15))]" />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-neutral-900/90 px-3 py-1 text-xs font-semibold text-white">
                    {LABEL[c.category]}
                  </span>

                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      soldOut
                        ? "bg-neutral-200 text-neutral-600"
                        : low
                        ? "bg-red-50 text-red-600 ring-1 ring-red-200"
                        : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
                    ].join(" ")}
                  >
                    {soldOut ? "Sold out" : `${c.remaining} left`}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold text-neutral-900">
                  {c.title}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-[15px] text-neutral-700">
                  <CalendarDays size={18} className="text-sky-500" />
                  {fmtDate(c.dateISO)} • {fmtTime(c.dateISO)} • {c.durationHrs}{" "}
                  hrs
                </p>
                <p className="mt-1 text-[13px] text-neutral-500">
                  Meet: {c.meet}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-neutral-600">
                    {c.price ? (
                      <>
                        From{" "}
                        <span className="text-lg font-extrabold text-neutral-900">
                          {c.price}
                        </span>
                      </>
                    ) : (
                      <span className="italic">Price at check-in</span>
                    )}
                  </div>

                  <button
                    disabled={soldOut}
                    onClick={() =>
                      alert(
                        `Reserve → ${c.title} on ${fmtDate(
                          c.dateISO
                        )} ${fmtTime(c.dateISO)}`
                      )
                    }
                    className={[
                      "inline-flex items-center justify-center rounded-[14px] px-5 py-3 text-sm font-semibold transition-colors",
                      soldOut
                        ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                        : "bg-sky-500 text-white hover:bg-sky-600",
                    ].join(" ")}
                  >
                    {soldOut ? "Sold out" : "Reserve seats"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-5 text-center text-[12px] text-neutral-500">
        No online payment — pay on arrival. Free cancellation up to 48h.
      </p>
    </section>
  );
}
