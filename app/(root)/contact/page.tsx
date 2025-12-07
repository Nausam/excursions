"use client";

import PrimaryButton from "@/components/PrimaryButton";
import gsap from "gsap";
import { Check, Clock, Copy, Mail, MessageCircle, Phone } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

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

/* ---------- Small copy button ---------- */
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-full bg-slate-100/80 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100 hover:ring-slate-300 transition"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

export default function ContactPage() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const methodsRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const cleanups: Array<() => void> = [];

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

    return () => {
      cleanups.forEach((fn) => fn());
      gsap.killTweensOf(shell);
    };
  }, []);

  const phoneNumber = "+960 755 7042";
  const emailAddress = "hello@laviamaldives.com";

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
              Message us with your dates and number of divers and we&apos;ll
              send you the best options for your level and budget.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 md:text-[13px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-sky-100 shadow-sm">
                <Clock className="h-3.5 w-3.5 text-sky-600" />
                <span>Typical reply within a few hours</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-slate-200 shadow-sm">
                <Phone className="h-3.5 w-3.5 text-emerald-600" />
                <span>WhatsApp preferred</span>
              </div>
            </div>
          </div>

          {/* Compact contact summary card */}
          <div className="card-ambient card-ambient-slate-sky p-5 shadow-md">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
              Main contact
            </h2>
            <div className="mt-4 space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    WhatsApp
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="font-semibold text-slate-900">
                      {phoneNumber}
                    </p>
                    <CopyButton value={phoneNumber} />
                  </div>
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
                  <div className="mt-1 flex items-center gap-2">
                    <p className="font-semibold text-slate-900">
                      {emailAddress}
                    </p>
                    <CopyButton value={emailAddress} />
                  </div>
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
                      Tap below to start a chat with us on WhatsApp.
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] ring-1 ring-[#25D366]/30">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                </header>

                <div className="rounded-2xl bg-white/95 px-4 py-3 text-sm ring-1 ring-slate-200">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Text to
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900">
                      {phoneNumber}
                    </p>
                    <CopyButton value={phoneNumber} />
                  </div>
                </div>

                <div className="pt-1">
                  <PrimaryButton
                    href="https://wa.me/9607557042?text=Hi%21%20I%20found%20your%20website%20and%20would%20love%20to%20plan%20a%20dive%20trip%20with%20you.%20Could%20you%20help%20me%20with%20options%20and%20prices%3F"
                    variant="emerald"
                    size="lg"
                  >
                    Start a WhatsApp chat
                  </PrimaryButton>
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
                      Email us
                    </h3>
                    <p className="mt-1 text-sm text-slate-700">
                      Best for full quotes and group bookings.
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
                  <div className="mt-1 flex items- justify-between gap-2">
                    <p className="font-semibold text-slate-900">
                      {emailAddress}
                    </p>
                    <CopyButton value={emailAddress} />
                  </div>
                </div>

                <div className="pt-1">
                  <PrimaryButton
                    href={`mailto:${emailAddress}?subject=Maldives%20dive%20trip%20enquiry`}
                    variant="sky"
                    size="lg"
                  >
                    Write us an email
                  </PrimaryButton>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
