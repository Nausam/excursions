"use client";

import PrimaryButton from "@/components/PrimaryButton";
import gsap from "gsap";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

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

export default function ContactPage() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const methodsRef = useRef<HTMLElement | null>(null);
  const infoRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const cleanups: Array<() => void> = [];

    // Main shell
    gsap.killTweensOf(shell);
    gsap.fromTo(
      shell,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "opacity,transform",
      }
    );

    // Contact methods cards
    if (methodsRef.current) {
      const sec = methodsRef.current;
      const cleanup = observeOnce(
        sec,
        () => {
          const cards = sec.querySelectorAll<HTMLElement>(
            "[data-contact-card]"
          );
          gsap.from(cards, {
            opacity: 0,
            y: 18,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.08,
          });
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      cleanups.push(cleanup);
    }

    // Info row
    if (infoRef.current) {
      const sec = infoRef.current;
      const cleanup = observeOnce(
        sec,
        () => {
          gsap.from(sec, {
            opacity: 0,
            y: 16,
            duration: 0.55,
            ease: "power3.out",
          });
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      cleanups.push(cleanup);
    }

    return () => {
      cleanups.forEach((fn) => fn());
      gsap.killTweensOf(shell);
    };
  }, []);

  return (
    <main className="mx-auto w-[min(1100px,94vw)] py-10 md:py-16 mt-10">
      <div
        ref={shellRef}
        className="space-y-10 rounded-[32px] bg-gradient-to-b from-sky-50/80 via-white to-sky-50/60 p-6 shadow-xl ring-1 ring-sky-100/60 md:space-y-12 md:p-10"
      >
        {/* Hero / intro */}
        <section className="grid items-start gap-10 md:grid-cols-[1.25fr,0.9fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-900 ring-1 ring-sky-200 shadow-sm">
              <span>Contact &amp; bookings</span>
              <span className="h-1 w-1 rounded-full bg-sky-500" />
              <span className="normal-case text-[11px] font-medium tracking-normal text-sky-800">
                WhatsApp • Email • Quick questions
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Let&apos;s plan your dives
              </span>
              <br />
              <span className="text-slate-900">
                for your next trip to the Maldives.
              </span>
            </h1>

            <p className="max-w-full text-sm leading-relaxed text-slate-700 md:text-base">
              Tell us your dates, number of divers and what kind of experience
              you&apos;re after — tiger sharks, mantas, liveaboard or local
              island diving. We&apos;ll reply with options that match your
              level, budget and travel window.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 md:text-[13px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-sky-100 shadow-sm">
                <Clock className="h-3.5 w-3.5 text-sky-600" />
                <span>Typical reply within a few hours</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-slate-200 shadow-sm">
                <Phone className="h-3.5 w-3.5 text-emerald-600" />
                <span>WhatsApp preferred for quick questions</span>
              </div>
            </div>
          </div>

          {/* Small contact summary card */}
          <div className="card-ambient card-ambient-slate-sky p-5 shadow-md">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
              Main contact details
            </h2>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    WhatsApp
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    +960 755 7042
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Best for date checks, quick availability questions and last
                    minute updates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Email
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    info@example.com
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Use email if you prefer a full written quote or you&apos;re
                    planning a group trip.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Based in
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    Malé &amp; local partner islands
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    All trips are run with licensed local operators and guides.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact methods – WhatsApp + Email */}
        <section ref={methodsRef} className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 md:text-xl">
            Choose how you&apos;d like to reach us
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* WhatsApp card */}
            <article
              data-contact-card
              className="card-ambient card-ambient-cyan-emerald p-6 shadow-md md:p-7"
            >
              <div className="relative z-10 space-y-4">
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Fastest reply
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold text-slate-900 md:text-xl">
                      WhatsApp message
                    </h3>
                    <p className="mt-1 text-sm text-slate-700">
                      Perfect for quick questions, checking dates or sending us
                      your certification cards and flight times.
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] ring-1 ring-[#25D366]/30">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                </header>

                <ul className="space-y-1.5 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                    <span>Tell us your preferred month or exact dates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                    <span>Share number of divers and certification level.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                    <span>
                      Mention if you&apos;re interested in liveaboard, local
                      diving or tiger sharks / mantas.
                    </span>
                  </li>
                </ul>

                <div className="pt-1">
                  <PrimaryButton
                    href="https://wa.me/9607557042?text=Hi%2C%20I%27d%20like%20to%20plan%20a%20dive%20trip%20in%20the%20Maldives.%20Here%20are%20my%20dates%2C%20number%20of%20divers%20and%20certification%20levels%3A"
                    variant="emerald"
                    size="lg"
                  >
                    Start a WhatsApp chat
                  </PrimaryButton>
                  <p className="mt-1 text-[11px] text-slate-500">
                    We&apos;ll reply as soon as we&apos;re back on the boat or
                    from the dive.
                  </p>
                </div>
              </div>
            </article>

            {/* Email card */}
            <article
              data-contact-card
              className="card-ambient card-ambient-slate-sky p-6 shadow-md md:p-7"
            >
              <div className="relative z-10 space-y-4">
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Detailed enquiries
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold text-slate-900 md:text-xl">
                      Email us your plan
                    </h3>
                    <p className="mt-1 text-sm text-slate-700">
                      Great if you want a written quote, you&apos;re organising
                      a group, or you prefer email over messaging apps.
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                    <Mail className="h-4 w-4" />
                  </div>
                </header>

                <div className="rounded-2xl bg-white/95 px-4 py-3 text-sm ring-1 ring-slate-200">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Send to
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    info@example.com
                  </p>
                </div>

                <div className="space-y-1.5 text-sm text-slate-700">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                    Helpful details to include
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>Exact or approximate travel dates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>
                        Number of divers and certification level for each
                        person.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>
                        Which trips you&apos;re interested in (liveaboard, tiger
                        sharks, Baa Atoll, etc.).
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-1">
                  <PrimaryButton
                    href="mailto:info@example.com?subject=Maldives%20dive%20trip%20enquiry&body=Hi%2C%0A%0AWe%27d%20like%20to%20plan%20a%20dive%20trip%20in%20the%20Maldives.%0A%0ADates%3A%20%0ANumber%20of%20divers%20and%20levels%3A%20%0ATrips%20we%27re%20interested%20in%3A%20%0ABudget%20range%3A%20%0A%0AThank%20you!"
                    variant="sky"
                    size="lg"
                  >
                    Write us an email
                  </PrimaryButton>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Opens your email app with a pre-filled subject and
                    structure.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Extra info / small row */}
        <section
          ref={infoRef}
          className="mt-4 grid gap-4 text-sm text-slate-700 md:grid-cols-3"
        >
          <div className="rounded-2xl bg-white/90 px-4 py-3 ring-1 ring-slate-200">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              When we reply
            </p>
            <p className="mt-1">
              We&apos;re often on the boat or underwater, but we check messages
              between trips and in the evenings.
            </p>
          </div>

          <div className="rounded-2xl bg-white/90 px-4 py-3 ring-1 ring-slate-200">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Groups &amp; custom trips
            </p>
            <p className="mt-1">
              Planning a group, workshop or photo trip? Email works best so we
              can send a detailed multi-option proposal.
            </p>
          </div>

          <div className="rounded-2xl bg-white/90 px-4 py-3 ring-1 ring-slate-200">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Non-divers &amp; mixed groups
            </p>
            <p className="mt-1">
              Travelling with snorkellers or non-divers? Mention this in your
              message and we&apos;ll suggest mixed itineraries.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
