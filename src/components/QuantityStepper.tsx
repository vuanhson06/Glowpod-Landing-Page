"use client";

import { MAX_QTY } from "@/lib/cartReducer";

export function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
}: {
  value: number;
  onChange: (qty: number) => void;
  label: string;
  min?: number;
}) {
  const btn = "h-9 w-9 rounded-full text-lg leading-none hover:bg-sand disabled:opacity-30 disabled:hover:bg-transparent";
  return (
    <div className="inline-flex items-center rounded-full border border-charcoal/20 p-0.5" role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}
