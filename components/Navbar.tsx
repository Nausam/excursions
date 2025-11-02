"use client";

import gsap from "gsap";
import { ArrowRight, CalendarRange, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PrimaryButton from "./PrimaryButton";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Safaris", href: "/safaris" },
  { label: "Excursions", href: "/excursions" },
  { label: "Diving", href: "/diving" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Desktop refs
  const navRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLAnchorElement | null>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const ctaWrapRef = useRef<HTMLSpanElement | null>(null); // wrap the CTA to avoid ref issues
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  // Mobile refs
  const mobileItemsRef = useRef<HTMLAnchorElement[]>([]);
  const mobileCtaRef = useRef<HTMLAnchorElement | null>(null);

  const setLinkRef = (i: number) => (el: HTMLAnchorElement | null) => {
    if (el) linksRef.current[i] = el;
  };

  const setMobileItemRef = (i: number) => (el: HTMLAnchorElement | null) => {
    if (el) mobileItemsRef.current[i] = el;
  };

  /* ---------------- Desktop entrance ---------------- */
  useLayoutEffect(() => {
    const motionOK =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    const navEl = navRef.current;
    const brandEl = brandRef.current;
    const linkEls = linksRef.current.filter(Boolean);
    const ctaEl = ctaWrapRef.current;
    const burgerEl = burgerRef.current;

    if (!navEl || !brandEl) return;

    let tl: gsap.core.Timeline | null = null;

    if (motionOK) {
      tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(navEl, { y: -14, opacity: 0 });
      tl.to(navEl, { y: 0, opacity: 1, duration: 0.32 }, 0);

      gsap.set(
        [brandEl, ...linkEls, ctaEl, burgerEl].filter(Boolean) as Element[],
        {
          y: 12,
          opacity: 0,
        }
      );

      tl.to(brandEl, { y: 0, opacity: 1, duration: 0.36 }, 0.02)
        .to(linkEls, { y: 0, opacity: 1, duration: 0.38, stagger: 0.06 }, 0.1)
        .to(
          [ctaEl, burgerEl].filter(Boolean) as Element[],
          { y: 0, opacity: 1, duration: 0.34 },
          0.22
        );
    } else {
      gsap.set(
        [navEl, brandEl, ...linkEls, ctaEl, burgerEl].filter(
          Boolean
        ) as Element[],
        {
          clearProps: "all",
          opacity: 1,
        }
      );
    }

    return () => {
      tl?.kill();
    };
  }, []);

  /* ---------------- Mobile sheet open/close ---------------- */
  useEffect(() => {
    const motionOK =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    const items = mobileItemsRef.current.filter(Boolean);
    const cta = mobileCtaRef.current;

    // Reset when closing
    if (!open) {
      if (items.length) gsap.set(items, { opacity: 0, y: 8 });
      if (cta) gsap.set(cta, { opacity: 0, y: 10 });
      return; // <-- cleanup not needed here
    }

    // Opening…
    let tl: gsap.core.Timeline | null = null;

    if (!motionOK) {
      if (items.length) gsap.set(items, { opacity: 1, y: 0 });
      if (cta) gsap.set(cta, { opacity: 1, y: 0 });
      return; // <-- effect returns void (OK)
    }

    tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(items, { opacity: 1, y: 0, duration: 0.26, stagger: 0.06 }, 0.02).to(
      cta,
      { opacity: 1, y: 0, duration: 0.26 },
      0.1 + Math.min(items.length * 0.06, 0.3)
    );

    // Proper cleanup: return a function, not a timeline
    return () => {
      tl?.kill();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        ref={navRef}
        className="
          relative mx-auto mt-3 w-[min(1500px,94vw)]
          rounded-md bg-[#fffdf8] text-neutral-900
          ring-1 ring-black/10 shadow-md
          px-4 sm:px-6
        "
      >
        {/* paper micro-dot texture */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.5] [mask-image:radial-gradient(black,transparent_75%)]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
          aria-hidden
        />

        <div className="relative flex h-14 items-center justify-between gap-3">
          {/* Brand chip */}
          <Link ref={brandRef} href="/" className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 ring-2 ring-white shadow" />
            <span className="text-[15px] font-extrabold tracking-wide">
              Just Trip
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-5 text-[14px] font-semibold">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <Link
                  ref={setLinkRef(i)}
                  href={l.href}
                  className="
                    relative px-1 text-neutral-700 hover:text-neutral-900
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                    after:rounded-full after:bg-neutral-900/80
                    hover:after:w-full after:transition-all after:duration-300
                  "
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA (wrapped for ref) */}
          <span ref={ctaWrapRef} className="hidden md:inline-flex">
            <PrimaryButton
              href="/departures"
              variant="sky"
              size="md"
              leadingIcon={CalendarRange}
              trailingIcon={ArrowRight}
            >
              Reserve dates
            </PrimaryButton>
          </span>

          {/* Mobile burger */}
          <button
            ref={burgerRef}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-neutral-900 ring-1 ring-black/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile sheet */}
        <div
          className={`md:hidden grid transition-[grid-template-rows] duration-300 ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="pb-3 pt-2 space-y-2">
              {LINKS.map((l, i) => (
                <li key={l.href}>
                  <Link
                    ref={setMobileItemRef(i)}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="
                      flex items-center justify-between
                      rounded-xl bg-white px-3 py-2.5
                      text-[14px] font-semibold text-neutral-800
                      ring-1 ring-black/10 hover:bg-white/95
                    "
                  >
                    {l.label}
                    <span className="text-xs text-neutral-500">Explore</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  ref={mobileCtaRef}
                  href="/departures"
                  onClick={() => setOpen(false)}
                  className="
                    flex items-center justify-center gap-2
                    rounded-xl bg-neutral-900 px-3 py-2.5
                    text-sm font-semibold text-white hover:bg-neutral-800
                  "
                >
                  <CalendarRange size={16} />
                  Reserve dates
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
