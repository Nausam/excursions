"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link, { LinkProps } from "next/link";
import React from "react";

type Variant = "dark" | "sky" | "amber" | "emerald" | "violet";
type Size = "sm" | "md" | "lg" | "xl";

const ANIM_GRADIENT =
  "[background-size:200%_100%] [background-position:0%_0%] " +
  "transition-[background-position,box-shadow,transform] duration-300 " +
  "hover:[background-position:100%_0%] active:[background-position:100%_0%]";

const VARIANT: Record<Variant, string> = {
  dark: [
    "text-white ring-neutral-900/60",
    "bg-[linear-gradient(90deg,theme(colors.neutral.900),theme(colors.neutral.800),theme(colors.neutral.900))]",
    ANIM_GRADIENT,
  ].join(" "),
  sky: [
    "text-white ring-sky-700/50",
    "bg-[linear-gradient(90deg,theme(colors.sky.500),theme(colors.cyan.500),theme(colors.indigo.500))]",
    ANIM_GRADIENT,
  ].join(" "),
  amber: [
    "text-neutral-900 ring-amber-700/40",
    "bg-[linear-gradient(90deg,theme(colors.amber.500),theme(colors.orange.500),theme(colors.amber.600))]",
    ANIM_GRADIENT,
  ].join(" "),
  emerald: [
    "text-white ring-emerald-700/50",
    "bg-[linear-gradient(90deg,theme(colors.emerald.600),theme(colors.teal.500),theme(colors.emerald.700))]",
    ANIM_GRADIENT,
  ].join(" "),
  violet: [
    "text-white ring-violet-700/50",
    "bg-[linear-gradient(90deg,theme(colors.violet.600),theme(colors.fuchsia.500),theme(colors.violet.700))]",
    ANIM_GRADIENT,
  ].join(" "),
};

const SIZE: Record<Size, string> = {
  sm: "h-9 text-[13px] px-3.5 gap-2",
  md: "h-10 text-sm px-4 gap-2.5",
  lg: "h-12 text-[16px] px-16 gap-3",
  xl: "h-14 text-[16px] px-12 gap-3",
};

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  leadingIcon?: React.ElementType;
  trailingIcon?: React.ElementType;
  loading?: boolean;
};

type ButtonModeProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  };

type LinkModeProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> &
  LinkProps & {
    href: LinkProps["href"];
  };

function isLinkProps(p: ButtonModeProps | LinkModeProps): p is LinkModeProps {
  return "href" in p && typeof p.href !== "undefined";
}

const PrimaryButton = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonModeProps | LinkModeProps
>(function PrimaryButton(props, ref) {
  const {
    children,
    className,
    variant = "dark",
    size = "md",
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
    loading = false,
  } = props;

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center rounded-full font-semibold",
    "ring-1 shadow-[0_10px_30px_-12px_rgba(0,0,0,.35)] hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,.35)]",
    // smoother always-on lift – GPU + easing + tiny scale
    "transform-gpu will-change-transform transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)]",
    "hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.015] active:scale-[1]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
    VARIANT[variant],
    SIZE[size],
    className
  );

  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 rounded-full [background:radial-gradient(120%_180%_at_50%_-80%,rgba(255,255,255,.45),transparent_55%)]" />
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
      <span className="relative z-10 inline-flex items-center">
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin opacity-90" />
        ) : LeadingIcon ? (
          <LeadingIcon className="mr-2 h-4 w-4 opacity-90" />
        ) : null}
        <span>{children}</span>
        {TrailingIcon ? (
          <TrailingIcon className="ml-2 h-4 w-4 opacity-90 transition-transform group-hover:translate-x-0.5" />
        ) : null}
      </span>
    </>
  );

  if (isLinkProps(props)) {
    const {
      href,
      leadingIcon: _li,
      trailingIcon: _ti,
      loading: _loading,
      variant: _variant,
      size: _size,
      className: _className,
      children: _children,
      ...anchorDomProps
    } = props;
    void _li;
    void _ti;
    void _loading;
    void _variant;
    void _size;
    void _className;
    void _children;

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...anchorDomProps}
        className={baseClasses}
        aria-busy={loading || undefined}
      >
        {inner}
      </Link>
    );
  }

  const {
    type = "button",
    disabled,
    leadingIcon: _li,
    trailingIcon: _ti,
    loading: _loading,
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...buttonDomProps
  } = props;
  void _li;
  void _ti;
  void _loading;
  void _variant;
  void _size;
  void _className;
  void _children;

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={isDisabled}
      {...buttonDomProps}
      className={cn(
        baseClasses,
        isDisabled &&
          "opacity-90 cursor-not-allowed hover:translate-y-0 hover:scale-100"
      )}
      aria-busy={loading || undefined}
    >
      {inner}
    </button>
  );
});

export default PrimaryButton;
