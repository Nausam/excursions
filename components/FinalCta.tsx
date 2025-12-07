// components/FinalCta.tsx
"use client";

import { gsap } from "gsap";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import PrimaryButton from "./PrimaryButton";

/* small helper: fire gsap once when element enters viewport */
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

export default function FinalCta() {
  const root = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const card = root.current;
    if (!card) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // base initial state
    gsap.set(card, { opacity: 0, y: 20, filter: "blur(8px)" });

    const cleanups: Array<() => void> = [];

    // card entrance
    cleanups.push(
      observeOnce(
        card,
        () => {
          if (prefersReduced) {
            gsap.to(card, {
              opacity: 1,
              duration: 0.4,
              ease: "power1.out",
              clearProps: "opacity",
            });
            return;
          }

          gsap.to(card, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
            clearProps: "opacity,filter,transform",
          });

          // children (heading, copy, buttons)
          const kids = Array.from(
            card.querySelectorAll<HTMLElement>(
              "[data-cta-head], [data-cta-copy], [data-cta-actions] a"
            )
          );
          if (kids.length) {
            gsap.set(kids, { opacity: 0, y: 20, filter: "blur(8px)" });
            gsap.to(kids, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.08,
              delay: 0.05,
              clearProps: "opacity,filter,transform",
            });
          }
        },
        { rootMargin: "0px 0px -10% 0px" }
      )
    );

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="mx-auto w-[min(1400px,94vw)] py-10 md:py-14">
      <div
        ref={root}
        className={[
          "relative isolate overflow-hidden rounded-2xl p-6 md:p-10",
          "ring-1 ring-black/10 shadow-[0_26px_80px_-34px_rgba(0,0,0,.28)]",
          "bg-[#fffdf8] bg-[linear-gradient(90deg,rgba(14,165,233,.04)_0%,transparent_50%,rgba(245,158,11,.045)_100%)]",
          "before:absolute before:inset-0 before:pointer-events-none before:opacity-[.03] before:[background-image:radial-gradient(rgba(0,0,0,.8)_1px,transparent_1px)] before:[background-size:6px_6px]",
        ].join(" ")}
      >
        {/* subtle paper texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(black,transparent_75%)]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        />

        <div className="relative z-10">
          <h2
            data-cta-head
            className="text-2xl md:text-4xl font-extrabold leading-tight text-neutral-900"
          >
            Ready for your next adventure?
          </h2>

          <p data-cta-copy className="mt-2 max-w-2xl text-neutral-700">
            Limited seats each month. Lock in your dates and we’ll handle the
            rest.
          </p>

          <div
            data-cta-actions
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <PrimaryButton
              href="/contact"
              variant="sky"
              size="md"
              leadingIcon={Mail}
            >
              Email us
            </PrimaryButton>
            <PrimaryButton
              href="tel:+9601234567"
              variant="emerald"
              size="md"
              leadingIcon={Phone}
            >
              WhatsApp
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
