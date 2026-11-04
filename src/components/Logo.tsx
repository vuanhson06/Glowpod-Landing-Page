import Image from "next/image";

// Source art: public/brand/glowpod-logo.png (999×243, transparent). Swap for an SVG when a vector version exists.
export function Logo({ height = 30 }: { height?: number }) {
  return (
    <Image
      src="/brand/glowpod-logo.png"
      alt="GlowPod"
      width={Math.round((height * 999) / 243)}
      height={height}
      loading="eager"
    />
  );
}
