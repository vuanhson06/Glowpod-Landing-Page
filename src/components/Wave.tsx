// Soft, slowly drifting wave that joins two home page sections.
// Colour comes from `currentColor` (pass a text-* class matching the next section's background).
// Each path is four identical 720-wide periods whose end tangent matches the start,
// so sliding it by -50% (the marquee keyframe) loops seamlessly.
// Use opaque colours: translucent layers would stack into a darker stripe.

function wavePath(top: number, bottom: number, mid: number) {
  const period = (x: number) => `C${x + 180} ${bottom} ${x + 540} ${top} ${x + 720} ${mid}`;
  return `M0 ${mid} ${[0, 720, 1440, 2160].map(period).join(" ")} V80 H0 Z`;
}

const BACK = wavePath(4, 70, 36);
const FRONT = wavePath(20, 64, 44);

export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-16 overflow-hidden sm:h-24 ${flip ? "-mt-px -scale-y-100" : "-mb-px"} ${className}`}
    >
      {[
        { d: BACK, cls: "opacity-45", style: { animationDuration: "28s" } },
        { d: FRONT, cls: "", style: { animationDuration: "19s", animationDirection: "reverse" } },
      ].map((layer) => (
        <svg
          key={layer.d}
          viewBox="0 0 2880 80"
          preserveAspectRatio="none"
          className={`anim-marquee absolute inset-y-0 left-0 h-full w-[200%] ${layer.cls}`}
          style={layer.style}
        >
          <path d={layer.d} fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
