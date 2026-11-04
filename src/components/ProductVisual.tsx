import type { ProductKind } from "@/data/products";

// Illustrated placeholders until real product photography exists.

const CARTRIDGE_SHADES = ["#F1D3BE", "#D9A982", "#9C6B4E", "#C9949B"];

function Device() {
  return (
    <g>
      <ellipse cx="100" cy="168" rx="58" ry="8" fill="#252525" opacity="0.08" />
      <rect x="52" y="40" width="96" height="124" rx="40" fill="#FFFDFB" stroke="#E3D8CC" strokeWidth="2" />
      <rect x="66" y="58" width="68" height="40" rx="18" fill="#F7F3EE" />
      {CARTRIDGE_SHADES.map((c, i) => (
        <rect key={c} x={72 + i * 15} y="66" width="11" height="24" rx="5.5" fill={c} />
      ))}
      <circle cx="100" cy="122" r="14" fill="#EDE5DB" />
      <path d="M100 113c3 3.6 5.6 6.8 5.6 9.8a5.6 5.6 0 0 1-11.2 0c0-3 2.6-6.2 5.6-9.8Z" fill="#C9949B" />
    </g>
  );
}

function Cartridges() {
  return (
    <g>
      <ellipse cx="100" cy="166" rx="64" ry="7" fill="#252525" opacity="0.08" />
      {CARTRIDGE_SHADES.map((c, i) => (
        <g key={c} transform={`translate(${46 + i * 28} ${56 + (i % 2) * 8})`}>
          <rect width="24" height="96" rx="12" fill="#FFFDFB" stroke="#E3D8CC" strokeWidth="2" />
          <rect x="4" y="30" width="16" height="58" rx="8" fill={c} />
        </g>
      ))}
    </g>
  );
}

function Care() {
  return (
    <g>
      <ellipse cx="100" cy="166" rx="60" ry="7" fill="#252525" opacity="0.08" />
      <rect x="56" y="58" width="44" height="104" rx="14" fill="#FFFDFB" stroke="#E3D8CC" strokeWidth="2" />
      <rect x="68" y="44" width="20" height="18" rx="5" fill="#A6B5A0" />
      <rect x="64" y="96" width="28" height="34" rx="6" fill="#E1E7DE" />
      <rect x="116" y="70" width="10" height="92" rx="5" fill="#C9949B" />
      <rect x="112" y="46" width="18" height="30" rx="7" fill="#EDE5DB" />
    </g>
  );
}

function Nozzles() {
  return (
    <g>
      <ellipse cx="100" cy="160" rx="56" ry="7" fill="#252525" opacity="0.08" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${52 + i * 34} ${76 + (i % 2) * 10})`}>
          <path d="M4 0h24l-6 58a6 6 0 0 1-12 0Z" fill="#FFFDFB" stroke="#E3D8CC" strokeWidth="2" />
          <circle cx="16" cy="12" r="5" fill="#C9949B" opacity="0.7" />
        </g>
      ))}
    </g>
  );
}

const BACKGROUND: Record<ProductKind, string> = {
  device: "from-rose-light to-sand",
  refill: "from-sand to-rose-light",
  care: "from-sage-light to-sand",
  parts: "from-sand to-sage-light",
};

export function ProductVisual({ kind, className = "" }: { kind: ProductKind; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-3xl bg-gradient-to-br ${BACKGROUND[kind]} ${className}`}>
      <svg viewBox="0 0 200 190" className="h-full max-h-80 w-full" aria-hidden="true">
        {kind === "device" && <Device />}
        {kind === "refill" && <Cartridges />}
        {kind === "care" && <Care />}
        {kind === "parts" && <Nozzles />}
      </svg>
    </div>
  );
}
