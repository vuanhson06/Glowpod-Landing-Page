// Prototype catalogue. Prices are placeholders (VND) until costs and willingness to pay are tested.

export type ProductKind = "device" | "refill" | "care" | "parts";

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
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "glowpod-blend-starter-kit",
    name: "GlowPod Blend Starter Kit",
    kind: "device",
    price: 3_490_000,
    tagline: "The dispenser, a full set of foundation bases and app access.",
    description: [
      "GlowPod Blend is a countertop dispenser that mixes a foundation shade from four base cartridges. You scan your face with your phone under guided lighting, review the suggested blend, adjust it if you like, and the device dispenses a measured amount.",
      "The AI suggests a blend within a tested shade and formula range. It does not invent ingredients or diagnose skin conditions, and you always confirm the shade before anything is dispensed.",
      "Basic operation does not require a paid subscription. Saved shade profiles let you repeat a blend you like or change it for the season.",
    ],
    inBox: [
      "GlowPod Blend dispenser",
      "Foundation Base Set (4 cartridges: light, medium and deep bases, plus a tone adjuster)",
      "USB-C charging cable",
      "Cleaning brush and 2 spare nozzles",
      "Quick-start guide (English and Vietnamese)",
      "GlowPod app access (iOS and Android)",
    ],
    specs: [
      { label: "Dispensing", value: "Measured portions, adjustable in small steps" },
      { label: "Cartridges", value: "4 slots, GlowPod cartridges only" },
      { label: "Connectivity", value: "Bluetooth to the GlowPod app" },
      { label: "Power", value: "Rechargeable battery, USB-C" },
      { label: "Warranty", value: "12 months (draft terms)" },
    ],
    costNote: "The included base set is estimated at about 60 uses before the first refill.",
    featured: true,
  },
  {
    slug: "foundation-base-refill-set",
    name: "Foundation Base Refill Set",
    kind: "refill",
    price: 590_000,
    tagline: "Four replacement cartridges for your GlowPod Blend.",
    description: [
      "A complete set of four sealed cartridges: light, medium and deep foundation bases plus a tone adjuster. The dispenser combines them to make your saved shade.",
      "The app tracks how much is left in each cartridge. You can turn on optional refill reminders, and you decide whether to reorder.",
    ],
    inBox: ["Light base cartridge", "Medium base cartridge", "Deep base cartridge", "Tone adjuster cartridge"],
    specs: [
      { label: "Estimated uses", value: "About 60 full-face applications" },
      { label: "Compatibility", value: "GlowPod Blend only" },
      { label: "Seal", value: "Factory sealed for hygiene" },
    ],
    costNote: "About 9,800₫ per use (estimate, to be confirmed in testing).",
    featured: true,
  },
  {
    slug: "care-and-cleaning-kit",
    name: "Care & Cleaning Kit",
    kind: "care",
    price: 190_000,
    tagline: "Everything you need to keep the dispenser clean.",
    description: [
      "A gentle cleaning solution, a nozzle brush and lint-free cloths, matched to the materials used in GlowPod Blend.",
      "We recommend a quick clean after each use and a full clean every week. Step-by-step instructions are in the app.",
    ],
    inBox: ["Cleaning solution (100 ml)", "Nozzle brush", "10 lint-free cloths"],
    specs: [
      { label: "Lasts", value: "About 3 months with weekly cleaning" },
      { label: "Compatibility", value: "GlowPod Blend" },
    ],
    featured: true,
  },
  {
    slug: "replacement-nozzles",
    name: "Replacement Nozzles (3-pack)",
    kind: "parts",
    price: 120_000,
    tagline: "Fresh dispensing nozzles for steady, accurate portions.",
    description: [
      "Nozzles wear over time. We suggest replacing one every two months, or sooner if the flow becomes uneven.",
    ],
    inBox: ["3 dispensing nozzles"],
    specs: [
      { label: "Replace every", value: "About 2 months" },
      { label: "Compatibility", value: "GlowPod Blend" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const starterKit = products[0];
export const refillSet = products[1];
