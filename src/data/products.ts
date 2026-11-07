// Prototype catalogue. Prices are placeholders (VND) until costs and willingness to pay are tested.

export type ProductKind = "device" | "refill";

export type Product = {
  slug: string;
  name: string;
  kind: ProductKind;
  price: number; // VND
  tagline: string;
  description: string[];
  inBox: string[];
  specs: { label: string; value: string }[];
  costNote?: string;
  image: { src: string; alt: string };
};

export const products: Product[] = [
  {
    slug: "glowpod-blend-starter-kit",
    name: "GlowPod Blend Starter Kit",
    kind: "device",
    price: 1_690_000,
    tagline: "The dispenser, a full set of foundation bases and app access.",
    description: [
      "GlowPod Blend is a countertop dispenser that mixes a foundation shade from four base cartridges. You hold the GlowPod Colour Card at your jawline and scan your face with your phone. The card gives the app a fixed colour reference, so it can correct for your phone camera’s white balance. You review the suggested blend, adjust it if you like, and the device dispenses a measured 0.25 ml portion.",
      "The AI suggests a blend within a tested shade and formula range. It does not invent ingredients or diagnose skin conditions, and you always confirm the shade before anything is dispensed.",
      "Basic operation does not require a paid subscription. Saved shade profiles let you repeat a blend you like or change it for the season.",
    ],
    inBox: [
      "GlowPod Blend dispenser",
      "Foundation Base Set (4 cartridges: light, medium and deep bases, plus a tone adjuster)",
      "GlowPod Colour Card (for calibrating your phone camera)",
      "USB-C charging cable",
      "Quick-start guide (English and Vietnamese)",
      "GlowPod app access (iOS and Android)",
    ],
    specs: [
      { label: "Dispensing", value: "0.25 ml per portion" },
      { label: "Shade calibration", value: "GlowPod Colour Card, included" },
      { label: "Cartridges", value: "4 slots, GlowPod cartridges only" },
      { label: "Connectivity", value: "Bluetooth to the GlowPod app" },
      { label: "Power", value: "Rechargeable battery, USB-C" },
      { label: "Warranty", value: "12-month 1-to-1 replacement" },
      { label: "Finish", value: "Semi-matte, medium buildable coverage" },
      { label: "Key ingredients", value: "Niacinamide, hyaluronic acid" },
      { label: "Free from", value: "Parabens, fragrance" },
    ],
    costNote: "The included base set is estimated to last about 24 weeks (5 applications a week) before the first refill.",
    image: {
      src: "/images/products/glowpod-blend-starter-kit.webp",
      alt: "The GlowPod Blend dispenser: a rounded ivory device with four foundation cartridges visible through a front window and a droplet button below.",
    },
  },
  {
    slug: "foundation-base-refill-set",
    name: "Foundation Base Refill Set",
    kind: "refill",
    price: 390_000,
    tagline: "Four replacement cartridges for your GlowPod Blend.",
    description: [
      "A complete set of four sealed cartridges: light, medium and deep foundation bases plus a tone adjuster. The dispenser combines them to make your saved shade.",
      "The app tracks how much is left in each cartridge. You can turn on optional refill reminders, and you decide whether to reorder.",
    ],
    inBox: ["Light base cartridge", "Medium base cartridge", "Deep base cartridge", "Tone adjuster cartridge"],
    specs: [
      { label: "Estimated supply", value: "About 24 weeks at 5 applications a week" },
      { label: "Compatibility", value: "GlowPod Blend only" },
      { label: "Seal", value: "Factory sealed for hygiene" },
      { label: "Finish", value: "Semi-matte, medium buildable coverage" },
      { label: "Key ingredients", value: "Niacinamide, hyaluronic acid" },
      { label: "Free from", value: "Parabens, fragrance" },
    ],
    costNote: "About 2,300₫ per day, or about 3,250₫ per application (estimate).",
    image: {
      src: "/images/products/foundation-base-refill-set.webp",
      alt: "Four ivory GlowPod cartridges with windows showing light, medium and deep foundation bases and a rose tone adjuster.",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const starterKit = products[0];
export const refillSet = products[1];
