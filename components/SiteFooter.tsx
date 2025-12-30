// components/SiteFooter.tsx
"use client";

import { gsap } from "gsap";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

/* Fire a callback once when target enters the viewport */
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

export default function SiteFooter() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    // 1) Footer entrance
    gsap.set(el, { y: 6, opacity: 0, filter: "blur(6px)" });
    cleanups.push(
      observeOnce(
        el,
        () => {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: prefersReduced ? 0.35 : 0.55,
            ease: "power2.out",
            clearProps: "transform,opacity,filter",
          });
        },
        { rootMargin: "0px 0px -6% 0px" }
      )
    );

    // 2) Columns: cascade reveal
    const cols = Array.from(el.querySelectorAll<HTMLElement>(".ft-col"));
    if (cols.length) {
      cols.forEach((col, i) => {
        gsap.set(col, { opacity: 0, y: 24 });
        cleanups.push(
          observeOnce(
            col,
            () => {
              gsap.to(col, {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power3.out",
                delay: i * 0.12,
                clearProps: "transform,opacity",
              });
            },
            { rootMargin: "0px 0px -10% 0px" }
          )
        );
      });
    }

    // 3) Brand: name slides; dot pulse
    const brandName = el.querySelector<HTMLElement>(".ft-brand-name");
    if (brandName) {
      gsap.set(brandName, { opacity: 0, x: -10 });
      cleanups.push(
        observeOnce(
          brandName,
          () => {
            gsap.to(brandName, {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: "power2.out",
              clearProps: "transform,opacity",
            });
          },
          { rootMargin: "0px 0px -12% 0px" }
        )
      );
    }
    const brandDot = el.querySelector<HTMLElement>(".ft-brand-dot");
    if (brandDot) {
      gsap.set(brandDot, { scale: 0.6, opacity: 0.6 });
      cleanups.push(
        observeOnce(
          brandDot,
          () => {
            gsap.to(brandDot, {
              scale: 1,
              opacity: 1,
              duration: 0.35,
              ease: "back.out(2)",
              clearProps: "transform,opacity",
            });
          },
          { rootMargin: "0px 0px -12% 0px" }
        )
      );
    }

    // 4) Social icons: pop-in with tiny swing
    const socials = Array.from(
      el.querySelectorAll<HTMLElement>(".ft-social a")
    );
    if (socials.length) {
      socials.forEach((a, i) => {
        gsap.set(a, { opacity: 0, y: 10, rotate: i % 2 ? 4 : -4 });
      });
      cleanups.push(
        observeOnce(
          el,
          () => {
            gsap.to(socials, {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: 0.4,
              ease: "power2.out",
              stagger: 0.06,
              clearProps: "transform,opacity",
            });
          },
          { rootMargin: "0px 0px -10% 0px" }
        )
      );

      // Hover micro-motion
      socials.forEach((a) => {
        const svg = a.querySelector("svg");
        const onEnter = () => {
          gsap.to(a, { y: -2, duration: 0.15, ease: "power2.out" });
          if (svg)
            gsap.to(svg, { rotate: 3, duration: 0.15, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(a, { y: 0, duration: 0.18, ease: "power2.out" });
          if (svg)
            gsap.to(svg, { rotate: 0, duration: 0.18, ease: "power2.out" });
        };
        a.addEventListener("mouseenter", onEnter);
        a.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          a.removeEventListener("mouseenter", onEnter);
          a.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // 5) Link lists: stagger the links
    const linkLists = Array.from(el.querySelectorAll<HTMLElement>(".ft-links"));
    linkLists.forEach((ul) => {
      const links = Array.from(ul.querySelectorAll<HTMLElement>("a"));
      if (!links.length) return;
      links.forEach((l) => gsap.set(l, { opacity: 0, y: 10 }));
      cleanups.push(
        observeOnce(
          ul,
          () => {
            gsap.to(links, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
              stagger: 0.05,
              clearProps: "transform,opacity",
            });
          },
          { rootMargin: "0px 0px -8% 0px" }
        )
      );
    });

    // 6) Contact items
    const contactLis = Array.from(
      el.querySelectorAll<HTMLElement>(".ft-contact li")
    );
    contactLis.forEach((li) => {
      const icon = li.querySelector<SVGSVGElement>("svg");
      gsap.set(li, { opacity: 0, x: 8 });
      if (icon) gsap.set(icon, { opacity: 0, scale: 0.7 });

      cleanups.push(
        observeOnce(
          li,
          () => {
            const tl = gsap.timeline();
            if (icon)
              tl.to(icon, {
                opacity: 1,
                scale: 1,
                duration: 0.25,
                ease: "back.out(2)",
              });
            tl.to(
              li,
              { opacity: 1, x: 0, duration: 0.28, ease: "power2.out" },
              icon ? "-=0.15" : 0
            );
          },
          { rootMargin: "0px 0px -8% 0px" }
        )
      );
    });

    // 7) Bottom bar + year pulse
    const bottom = el.querySelector<HTMLElement>(".ft-bottom");
    if (bottom) {
      gsap.set(bottom, { opacity: 0, y: 12 });
      cleanups.push(
        observeOnce(
          bottom,
          () => {
            gsap.to(bottom, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              clearProps: "transform,opacity",
            });
            const year = bottom.querySelector<HTMLElement>(".ft-year");
            if (year) {
              gsap.fromTo(
                year,
                { scale: 0.98 },
                {
                  scale: 1,
                  duration: 0.35,
                  ease: "power2.out",
                  clearProps: "transform",
                }
              );
            }
          },
          { rootMargin: "0px 0px -6% 0px" }
        )
      );
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <footer ref={root} className="mt-8 border-t border-neutral-200/60 bg-white">
      <div className="mx-auto w-[min(1400px,94vw)] py-10">
        {/* Main grid – with dividers on mobile for neat stacking */}
        <div className="grid gap-8 divide-y divide-neutral-200 sm:divide-y-0 sm:grid-cols-2 lg:grid-cols-4 sm:gap-10">
          {/* Brand + blurb */}
          <div className="ft-col flex flex-col items-center pt-6 text-center sm:items-start sm:text-left sm:pt-0">
            <div className="ft-brand flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              <Image
                src="/images/logo.png"
                width={300}
                height={300}
                alt="La Via Maldives logo"
                priority={false}
                unoptimized
              />
            </div>
            <p className="mt-3 max-w-xs text-sm text-neutral-600">
              Ocean safaris, liveaboard trips, and local island adventures with
              licensed Maldivian guides.
            </p>

            <div className="ft-social mt-4 flex items-center gap-3 text-neutral-600">
              <a
                href="https://instagram.com/laviamaldives"
                aria-label="Instagram"
                className="rounded-full p-2 hover:bg-neutral-100"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/laviamaldives"
                aria-label="Facebook"
                className="rounded-full p-2 hover:bg-neutral-100"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://youtube.com/@laviamaldives"
                aria-label="YouTube"
                className="rounded-full p-2 hover:bg-neutral-100"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Trips */}
          <div className="ft-col pt-6 text-center sm:pt-0 sm:text-left">
            <h4 className="text-sm font-semibold text-neutral-900">Trips</h4>
            <ul className="ft-links mt-3 space-y-2 text-sm text-neutral-600">
              <li>
                <Link
                  href="/liveaboard-diving"
                  className="hover:text-neutral-900"
                >
                  Liveaboard safaris
                </Link>
              </li>
              <li>
                <Link
                  href="/excursions-baa-atoll"
                  className="hover:text-neutral-900"
                >
                  Day trips &amp; excursions
                </Link>
              </li>
              <li>
                <Link
                  href="/dive-with-locals"
                  className="hover:text-neutral-900"
                >
                  Local diving
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="ft-col pt-6 text-center sm:pt-0 sm:text-left">
            <h4 className="text-sm font-semibold text-neutral-900">Company</h4>
            <ul className="ft-links mt-3 space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="#about" className="hover:text-neutral-900">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-neutral-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#safety" className="hover:text-neutral-900">
                  Safety &amp; standards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-neutral-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="ft-col pt-6 text-center sm:pt-0 sm:text-left">
            <h4 className="text-sm font-semibold text-neutral-900">Contact</h4>
            <ul className="ft-contact mt-3 space-y-2 text-sm text-neutral-700">
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Mail size={16} /> laviamaldives@gmail.com
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Phone size={16} /> +960 755 7042
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <MapPin size={16} /> Malé, Maldives
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="ft-bottom mt-8 flex flex-col items-center justify-between gap-3 border-t border-neutral-200/60 pt-6 text-sm text-neutral-500 sm:flex-row">
          <p className="text-center sm:text-left">
            © <span className="ft-year">{new Date().getFullYear()}</span> La Via
            Maldives. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-neutral-800">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-neutral-800">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-neutral-800">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
