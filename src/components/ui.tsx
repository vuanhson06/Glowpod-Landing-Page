import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { formatVND } from "@/lib/format";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: ReactNode }) {
  return (
    <div className="max-w-2xl pt-12 pb-8 sm:pt-16">
      {eyebrow && <p className="text-sm font-semibold tracking-wide text-rose-dark uppercase">{eyebrow}</p>}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
      {intro && <div className="mt-4 text-lg leading-relaxed text-charcoal/75">{intro}</div>}
    </div>
  );
}

const BUTTON = {
  primary: "bg-charcoal text-ivory hover:bg-charcoal/85",
  rose: "bg-rose text-charcoal hover:bg-rose/85",
  outline: "border border-charcoal/25 text-charcoal hover:border-charcoal/60 bg-transparent",
};

export function buttonClass(variant: keyof typeof BUTTON = "primary", extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${BUTTON[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof BUTTON }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

export function Price({ amount, className = "" }: { amount: number; className?: string }) {
  return <span className={`tabular-nums ${className}`}>{formatVND(amount)}</span>;
}

export function PrototypeNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-sage/60 bg-sage-light/60 px-4 py-3 text-sm text-sage-dark">{children}</p>
  );
}
