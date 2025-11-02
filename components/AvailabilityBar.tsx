"use client";

import gsap from "gsap";
import { CalendarDays, Search, Users } from "lucide-react";
import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import PrimaryButton from "./PrimaryButton";

type Category = "SAFARI" | "EXCURSION" | "DIVING";

export default function AvailabilityBar() {
  const [category, setCategory] = useState<Category>("SAFARI");
  const [month, setMonth] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [party, setParty] = useState<number>(2);

  // ---------- Refs for animation ----------
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const fieldRefs = useRef<HTMLLabelElement[]>([]);
  const helperTextRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const inputRefs = useRef<(HTMLSelectElement | HTMLInputElement)[]>([]);

  const setFieldRef = (i: number) => (el: HTMLLabelElement | null) => {
    if (el) fieldRefs.current[i] = el;
  };

  const setInputRef =
    (i: number) => (el: HTMLSelectElement | HTMLInputElement | null) => {
      if (el) inputRefs.current[i] = el;
    };

  // ---------- Mount / Entrance animation ----------
  useLayoutEffect(() => {
    const motionOK =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    const sec = sectionRef.current;
    const form = formRef.current;
    const fields = fieldRefs.current.filter(Boolean);
    const helper = helperTextRef.current;
    const cta = ctaRef.current;

    let tl: gsap.core.Timeline | null = null;

    if (sec && form && fields.length && cta) {
      if (!motionOK) {
        // Reduced motion: just ensure visible
        gsap.set(
          [sec, form, ...fields, cta, helper].filter(Boolean) as Element[],
          {
            clearProps: "all",
            opacity: 1,
            y: 0,
          }
        );
        return;
      }

      tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Bar drop
      gsap.set(form, { y: -10, opacity: 0 });
      tl.to(form, { y: 0, opacity: 1, duration: 0.35 }, 0);

      // Fields + CTA stagger
      gsap.set(fields, { y: 10, opacity: 0 });
      gsap.set(cta, { y: 10, opacity: 0 });

      tl.to(
        fields,
        { y: 0, opacity: 1, duration: 0.32, stagger: 0.06 },
        0.05
      ).to(
        cta,
        { y: 0, opacity: 1, duration: 0.3 },
        0.05 + Math.min(fields.length * 0.06, 0.36)
      );

      // Helper text
      if (helper) {
        gsap.set(helper, { y: 6, opacity: 0 });
        tl.to(helper, { y: 0, opacity: 1, duration: 0.28 }, ">-0.05");
      }
    }

    return () => {
      tl?.kill();
    };
  }, []);

  // ---------- Focus micro-interactions ----------
  useLayoutEffect(() => {
    const motionOK =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    if (!motionOK) return;

    const inputs = inputRefs.current.filter(Boolean);
    const enter = (el: Element) =>
      gsap.to(el, {
        y: -2,
        boxShadow: "0 8px 26px -18px rgba(0,0,0,.25)",
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    const leave = (el: Element) =>
      gsap.to(el, {
        y: 0,
        boxShadow: "0 10px 60px rgba(0,0,0,0)", // clear
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });

    const listeners: Array<() => void> = [];

    inputs.forEach((input) => {
      const label = input.closest("label") as HTMLElement | null;
      if (!label) return;

      const onFocus = () => enter(label);
      const onBlur = () => leave(label);

      input.addEventListener("focus", onFocus);
      input.addEventListener("blur", onBlur);
      listeners.push(() => {
        input.removeEventListener("focus", onFocus);
        input.removeEventListener("blur", onBlur);
      });
    });

    return () => listeners.forEach((off) => off());
  }, []);

  // ---------- Submit ----------
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.98 },
        { scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
    console.log({ category, month, party });
    alert(`Find dates → ${category} • ${month} • ${party} guests`);
  };

  return (
    <section ref={sectionRef} className="grid place-items-center z-50 ">
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="
          mx-auto -mt-10 w-[min(1300px,92vw)]
          rounded-md bg-white p-4 md:p-5
          shadow-[0_10px_60px_rgba(0,0,0,.1)]
        "
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5 before:absolute before:inset-0 before:pointer-events-none before:opacity-[.03] before:[background-image:radial-gradient(rgba(0,0,0,.8)_1px,transparent_1px)] before:[background-size:6px_6px]">
          {/* Category */}
          <label ref={setFieldRef(0)} className="md:col-span-2">
            <span className="mb-1 block text-[11px] font-semibold text-neutral-500">
              Category
            </span>
            <div className="relative">
              <select
                ref={setInputRef(0)}
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="
                  w-full appearance-none rounded-[12px] border border-neutral-200/90
                  bg-white px-4 py-3 pr-8 text-[15px] text-neutral-800 outline-none
                  focus:border-sky-300 focus:ring-2 focus:ring-sky-200
                "
              >
                <option value="SAFARI">Safari Trips</option>
                <option value="EXCURSION">Excursions</option>
                <option value="DIVING">Local Diving</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sky-500">
                ▾
              </span>
            </div>
          </label>

          {/* Month */}
          <label ref={setFieldRef(1)}>
            <span className="mb-1 block text-[11px] font-semibold text-neutral-500">
              Month
            </span>
            <div className="relative">
              <input
                ref={setInputRef(1)}
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="
                  w-full rounded-[12px] border border-neutral-200/90
                  bg-white px-4 py-3 pr-10 text-[15px] text-neutral-800 outline-none
                  focus:border-sky-300 focus:ring-2 focus:ring-sky-200
                "
              />
              <CalendarDays
                size={18}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
            </div>
          </label>

          {/* Party size */}
          <label ref={setFieldRef(2)}>
            <span className="mb-1 block text-[11px] font-semibold text-neutral-500">
              Party Size
            </span>
            <div className="relative">
              <input
                ref={setInputRef(2)}
                type="number"
                min={1}
                max={12}
                value={party}
                onChange={(e) => setParty(Number(e.target.value))}
                className="
                  w-full rounded-[12px] border border-neutral-200/90
                  bg-white px-4 py-3 pr-10 text-[15px] text-neutral-800 outline-none
                  focus:border-sky-300 focus:ring-2 focus:ring-sky-200
                "
              />
              <Users
                size={18}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
            </div>
          </label>

          {/* CTA */}
          <div className="flex items-end">
            {/* <button
              ref={ctaRef}
              type="submit"
              className="
                inline-flex w-full items-center justify-center gap-2
                rounded-full bg-sky-500 px-4 py-3
                text-[15px] font-semibold text-white
                shadow-[0_10px_24px_rgba(14,165,233,.35)]
                hover:bg-sky-600 transition-colors
              "
              aria-label="Find available dates"
            >
              <Search size={18} />
              Find dates
            </button> */}

            <PrimaryButton
              ref={ctaRef}
              type="submit"
              variant="sky"
              size="lg"
              leadingIcon={Search}
              className="cursor-pointer"
            >
              Find dates
            </PrimaryButton>
          </div>
        </div>

        {/* Helper text */}
        <p
          ref={helperTextRef}
          className="mt-2 text-center text-[12px] text-neutral-500"
        >
          Reserve now,{" "}
          <span className="font-semibold text-neutral-700">pay on arrival</span>
          . Free cancellation up to 48h.
        </p>
      </form>
      <div className="h-10" />
    </section>
  );
}
