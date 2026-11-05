"use client";

import { useState } from "react";
import { BASES, mixShade } from "@/lib/shade";

const SLIDERS = [
  { id: "depth", label: "Depth", ends: ["Lighter", "Deeper"], track: "linear-gradient(90deg, #f1d6c2, #d4a17c, #8f5f42)" },
  { id: "warmth", label: "Undertone", ends: ["Cooler", "Warmer"], track: "linear-gradient(90deg, #d9a5a8, #e3b58f)" },
] as const;

export function ShadeSlider() {
  const [values, setValues] = useState({ depth: 35, warmth: 60 });
  const mix = mixShade(values.depth, values.warmth);

  return (
    <div className="grid items-center gap-10 rounded-[2.5rem] bg-white/70 p-6 shadow-xl shadow-rose/10 ring-1 ring-charcoal/5 sm:p-10 md:grid-cols-2">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <span aria-hidden="true" className="anim-pulse-ring absolute inset-0 rounded-full" style={{ backgroundColor: mix.hex }} />
          <span
            aria-hidden="true"
            className="relative block h-44 w-44 rounded-full shadow-inner ring-8 ring-white transition-colors duration-300 sm:h-52 sm:w-52"
            style={{ backgroundColor: mix.hex }}
          />
        </div>
        <p className="mt-6 text-2xl font-semibold" aria-live="polite">
          {mix.label}
        </p>
        <p className="mt-1 text-sm text-charcoal/55">Example blend, not a match for your skin</p>
      </div>

      <div>
        <div className="space-y-7">
          {SLIDERS.map((s) => (
            <div key={s.id}>
              <div className="flex items-baseline justify-between">
                <label htmlFor={`shade-${s.id}`} className="font-semibold">
                  {s.label}
                </label>
                <span className="text-xs text-charcoal/50">
                  {s.ends[0]} · {s.ends[1]}
                </span>
              </div>
              <input
                id={`shade-${s.id}`}
                type="range"
                min={0}
                max={100}
                value={values[s.id]}
                onChange={(e) => setValues((v) => ({ ...v, [s.id]: Number(e.target.value) }))}
                aria-valuetext={`${values[s.id]}% ${values[s.id] < 50 ? s.ends[0].toLowerCase() : s.ends[1].toLowerCase()}`}
                className="shade-range mt-3 w-full"
                style={{ background: s.track }}
              />
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm font-semibold">What the dispenser would mix</p>
        <ul className="mt-3 space-y-2.5">
          {BASES.map((b, i) => (
            <li key={b.name} className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3 text-sm">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: b.hex }} aria-hidden="true" />
                {b.name}
              </span>
              <span className="h-2 overflow-hidden rounded-full bg-sand">
                <span
                  className="block h-full rounded-full transition-[width] duration-300"
                  style={{ width: `${mix.parts[i]}%`, backgroundColor: b.hex }}
                />
              </span>
              <span className="text-right tabular-nums text-charcoal/70">{mix.parts[i]}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
