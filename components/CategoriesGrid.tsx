"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Navigation } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import PrimaryButton from "./PrimaryButton";

type Cat = {
  slug: string;
  title: string;
  blurb: string;
  img: string; // /public path
};

const CATEGORIES: Cat[] = [
  {
    slug: "excursions-baa-atoll",
    title: "Excursion Trips in Baa Atoll",
    blurb:
      "Hanifaru Bay mantas & whale sharks • Stay with locals on Dharavandhoo.",
    img: "/images/excursion.png",
  },
  {
    slug: "dive-with-locals",
    title: "Dive with Locals",
    blurb:
      "Tiger shark dives in Fuvahmulah or manta-filled reefs of Baa Atoll.",
    img: "/images/dive.jpg",
  },
  {
    slug: "liveaboard-diving",
    title: "Dive in Liveaboard",
    blurb:
      "Week-long liveaboard routes like Best of Maldives, Deep South & North Fiesta.",
    img: "/images/liveaboard.jpg",
  },
];

const META: Record<string, { duration: string; priceLabel: string }> = {
  "excursions-baa-atoll": {
    duration: "6 nights • 7 days",
    priceLabel: "From $1400",
  },
  "dive-with-locals": {
    duration: "6 nights • 7 days",
    priceLabel: "From $1400",
  },
  "liveaboard-diving": {
    duration: "7 nights",
    priceLabel: "TBD",
  },
};

// Per-card tilt / offset to mimic the uneven layout
const TILTS = [
  "rotate-[-3deg] -translate-y-1 md:-translate-y-2",
  "rotate-[2deg] translate-y-1 md:translate-y-4",
  "rotate-[-1.5deg] -translate-y-0.5 md:-translate-y-3",
];

export default function TopExcursions() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Header fade-up
      gsap.from(".tx-header > *", {
        opacity: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Cards: fade only, no transform/vars touched
      const cards = gsap.utils.toArray<HTMLElement>('[data-card="true"]');

      gsap.set(cards, { opacity: 0 });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
            clearProps: "opacity",
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="mx-auto w-[min(1400px,94vw)] py-12 md:py-16"
    >
      <div className="text-center tx-header">
        <p className="text-sm font-semibold tracking-wide text-neutral-500">
          Top Selling
        </p>
        <h2 className="mt-1 text-3xl md:text-5xl font-extrabold text-neutral-900">
          Top Excursions
        </h2>
        <p className="mt-3 text-neutral-600">
          Reserve you next unforgettable adventure with our curated selection
        </p>
      </div>

      {/* Uneven, tilted cards */}
      <div className="mt-10 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((d, i) => {
          const meta = META[d.slug] ?? {
            duration: "Day trip",
            priceLabel: "From —",
          };

          return (
            <article
              key={d.slug}
              data-card="true"
              className={[
                "relative isolate rounded-md bg-white shadow-[0_25px_80px_-30px_rgba(0,0,0,0.25)] before:absolute before:inset-0 before:pointer-events-none before:opacity-[.03] before:[background-image:radial-gradient(rgba(0,0,0,.8)_1px,transparent_1px)] before:[background-size:6px_6px]",
                "ring-1 ring-black/10",
                "transition-transform duration-500 will-change-transform",
                TILTS[i % TILTS.length],
                "hover:rotate-0",
              ].join(" ")}
            >
              {/* Top image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-md">
                <Image
                  src={d.img}
                  alt={d.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover scale-[1.02] transition-transform duration-500 hover:scale-[1.05]"
                  priority={false}
                  unoptimized
                />
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight text-neutral-900">
                      {d.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600">{d.blurb}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-neutral-900/80">
                    {meta.priceLabel}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-700">
                    <Navigation size={16} className="opacity-90" />
                    <span>{meta.duration}</span>
                  </div>

                  <PrimaryButton
                    href={`/${d.slug}`}
                    variant="sky"
                    size="md"
                    trailingIcon={ArrowRight}
                  >
                    Explore
                  </PrimaryButton>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
