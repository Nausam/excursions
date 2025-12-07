// components/Faq.tsx
"use client";

import { gsap } from "gsap";
import { ChevronDown, HelpCircle, Mail, Phone } from "lucide-react";
import { useId, useLayoutEffect, useRef, useState } from "react";
import PrimaryButton from "./PrimaryButton";

type FaqItem = { q: string; a: string };

const FAQS: FaqItem[] = [
  {
    q: "How can I book?",
    a: "Choose your trip and dates, then send us a WhatsApp with your full name (and your group’s names if any). We’ll confirm availability within 24 hours and send you a link to pay the deposit.",
  },
  {
    q: "Do I need to be a diver or swimmer?",
    a: "You don’t need to be a certified diver, but you must be comfortable swimming in the ocean. This is an ocean safari and time in the water is a big part of the experience.",
  },
  {
    q: "What are the sleeping arrangements?",
    a: "All rooms are shared between 2 people. Couples or friends stay together, and solo travellers are paired with another guest of the same gender. Private rooms can be requested at an extra cost.",
  },
  {
    q: "How does payment work?",
    a: "You pay 50% to secure your spot. The remaining 50% is due at least 15 days before arrival. We’ll send a secure payment link with all the details.",
  },
  {
    q: "Can I change or cancel my booking?",
    a: "Date changes and cancellations are possible up to 30 days before departure, subject to availability and our cancellation policy. Just message us on WhatsApp and we’ll do our best to help.",
  },
  {
    q: "What should I bring?",
    a: "Swimwear, reef-safe sunscreen, sunglasses, a hat, light clothing, and any personal medication. We’ll provide the essentials on board and share a detailed packing list after you book.",
  },
];

// playful tilts
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
    stamp: "border-amber-600 text-amber-700",
  },
  {
    iconBg: "bg-sky-50 ring-sky-100 text-sky-700",
    stamp: "border-sky-700 text-sky-800",
  },
  {
    iconBg: "bg-emerald-50 ring-emerald-100 text-emerald-700",
    stamp: "border-emerald-700 text-emerald-800",
  },
  {
    iconBg: "bg-rose-50 ring-rose-100 text-rose-700",
    stamp: "border-rose-700 text-rose-800",
  },
  {
    iconBg: "bg-violet-50 ring-violet-100 text-violet-700",
    stamp: "border-violet-700 text-violet-800",
  },
  {
    iconBg: "bg-lime-50 ring-lime-100 text-lime-700",
    stamp: "border-lime-700 text-lime-800",
  },
];

/* ---- tiny observer util (fires once) ---- */
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

function FaqCard({ item, i }: { item: FaqItem; i: number }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLLIElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const chevronRef = useRef<SVGSVGElement | null>(null);
  const panelId = useId();
  const triggerId = `${panelId}-trigger`;
  const labelId = `${panelId}-label`;

  // In-view entrance (IO instead of ScrollTrigger)
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { y: 18, opacity: 0 });

    return observeOnce(
      card,
      () => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.05,
          clearProps: "transform,opacity",
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
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
            { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
          );
          gsap.to(chev, { rotate: 180, duration: 0.3, ease: "power2.out" });
        } else {
          gsap.killTweensOf(content);
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
              // return void
              gsap.set(content, { display: "none" });
              // or: content.style.display = "none";
            },
          });

          gsap.to(chev, { rotate: 0, duration: 0.25, ease: "power2.out" });
        }
      }

      return next;
    });
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const tilt = TILTS[i % TILTS.length];
  const acc = ACCENTS[i % ACCENTS.length];

  return (
    <li ref={cardRef} className="list-none">
      <article
        role="button"
        tabIndex={0}
        aria-controls={panelId}
        aria-expanded={open}
        aria-labelledby={labelId}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className={[
          "relative isolate rounded-2xl bg-[#fffdf8] p-5 cursor-pointer",
          "ring-1 ring-black/10 shadow-[0_26px_80px_-34px_rgba(0,0,0,.28)]",
          "transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 focus:outline-none focus:ring-2 focus:ring-neutral-300",
          "before:absolute before:inset-0 before:pointer-events-none before:opacity-[.03] before:[background-image:radial-gradient(rgba(0,0,0,.8)_1px,transparent_1px)] before:[background-size:6px_6px]",
          tilt,
        ].join(" ")}
      >
        {/* micro-dot texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(black,transparent_75%)]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* header row */}
        <div id={triggerId} className="relative z-10 group w-full text-left">
          <div className="flex items-start gap-3">
            <span
              className={[
                "grid h-10 w-10 place-items-center rounded-xl ring-1",
                acc.iconBg,
              ].join(" ")}
            >
              <HelpCircle className="size-4" />
            </span>
            <h3
              id={labelId}
              className="flex-1 pr-6 text-[15px] md:text-[16px] font-extrabold text-neutral-900"
            >
              {item.q}
            </h3>
            <span className="shrink-0 text-neutral-400" aria-hidden>
              <ChevronDown ref={chevronRef} className="size-5" />
            </span>
          </div>
        </div>

        {/* content */}
        <div className="relative z-10">
          <div
            id={panelId}
            ref={contentRef}
            role="region"
            aria-labelledby={triggerId}
            style={{
              display: "none",
              height: 0,
              overflow: "hidden",
              opacity: 0,
            }}
            className="pt-2 text-neutral-700"
          >
            {item.a}
          </div>
        </div>

        {/* corner stamp */}
        <div
          className={[
            "pointer-events-none absolute bottom-3 right-4 rounded-full border px-2 py-[2px] text-[11px] font-semibold",
            "tracking-wide uppercase",
            acc.stamp,
          ].join(" ")}
        >
          Answer
        </div>

        {/* torn-edge hint */}
        <div className="pointer-events-none absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-[#fffdf8] shadow-[6px_6px_0_-2px_rgba(0,0,0,.08)]" />
      </article>
    </li>
  );
}

export default function Faq() {
  const shellRef = useRef<HTMLDivElement | null>(null);

  // subtle container fade/slide on mount
  useLayoutEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    gsap.from(el, { y: 12, opacity: 0, duration: 0.6, ease: "power3.out" });
  }, []);

  return (
    <section id="faq" className="mx-auto w-[min(1400px,94vw)] py-10 md:py-14">
      <div ref={shellRef} className="mx-auto w-[min(1400px,94vw)]">
        {/* Header */}
        <div className="mx-auto mb-8 text-center md:w-3/4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-neutral-600">
            Quick answers about reservations, what to bring, and how the day
            runs.
          </p>
        </div>

        {/* Card stack */}
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FAQS.map((item, i) => (
            <FaqCard key={item.q} item={item} i={i} />
          ))}
        </ul>

        {/* Contact footer */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center text-sm text-neutral-500 sm:text-left">
            Still unsure? We’re happy to help with dates, group sizes, and gear.
          </p>
          <div className="flex flex-wrap items-center gap-2">
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
