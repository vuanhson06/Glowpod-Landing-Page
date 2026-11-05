export type Post = {
  slug: string;
  title: string;
  pillar: "Shade education" | "How the technology works" | "Ownership and maintenance";
  date: string; // ISO date, shown as written
  readMinutes: number;
  excerpt: string;
  sections: { heading?: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "foundation-and-lighting",
    title: "Why foundation looks different under different lighting",
    pillar: "Shade education",
    date: "2026-10-20",
    readMinutes: 4,
    excerpt:
      "The shade that matched in the shop can look too grey at your desk or too orange in photos. Here is why, and what it means for choosing a foundation.",
    sections: [
      {
        paragraphs: [
          "Most of us have had it happen: a foundation that looked perfect under shop lights looks slightly off once we get home. The product hasn't changed. The light has.",
        ],
      },
      {
        heading: "Light has a colour",
        paragraphs: [
          "Every light source has a colour temperature. Warm indoor bulbs add yellow and orange, office lighting is often cooler and bluer, and daylight changes through the day. Skin and foundation reflect that light differently, so a close match in one setting can drift in another.",
          "Phone cameras add another layer. They adjust white balance automatically, which can make the same face look warmer or cooler from one photo to the next.",
        ],
      },
      {
        heading: "What helps",
        paragraphs: [
          "Check a shade in indirect daylight near a window, along the jawline, and give it a few minutes to settle. Compare it with your neck and chest as well as your face.",
          "GlowPod's scan asks you to stand in even light and checks image quality before suggesting anything. If the light is too dim or too uneven, the app asks you to try again rather than guess. You can still adjust the suggested blend by hand.",
        ],
      },
    ],
  },
  {
    slug: "how-glowpod-works",
    title: "How GlowPod turns a face scan into a suggested blend",
    pillar: "How the technology works",
    date: "2026-10-27",
    readMinutes: 5,
    excerpt:
      "A plain-language walk through the scan-to-dispense process: what the app looks at, what it doesn't do, and where you stay in control.",
    sections: [
      {
        paragraphs: [
          "GlowPod Blend is built around one job: helping you choose and dispense a foundation shade at home. This is how the process works, step by step.",
        ],
      },
      {
        heading: "1. A guided scan",
        paragraphs: [
          "The app guides you to even lighting and a neutral background, then takes a few photos with your phone camera. It checks each image for quality, for example blur, shadows and strong colour casts, before using it.",
        ],
      },
      {
        heading: "2. A suggestion within a tested range",
        paragraphs: [
          "The app estimates your skin tone and undertone and suggests a blend of the four base cartridges. It only suggests blends within the shade and formula range the cartridges have been tested for. It does not invent new ingredients and it does not diagnose skin conditions.",
        ],
      },
      {
        heading: "3. You confirm, then the device dispenses",
        paragraphs: [
          "You see the suggested shade and can make it lighter, deeper, warmer or cooler within the tested limits. Nothing is dispensed until you confirm. The device then mixes and dispenses a measured portion.",
          "You can save the result as a profile and reuse it, or create separate profiles for different seasons.",
        ],
      },
      {
        heading: "Your images",
        paragraphs: [
          "The app asks for your consent before scanning, explains how long images are kept, and lets you delete them. We plan to test the system across a wide range of skin tones and lighting conditions before launch.",
        ],
      },
    ],
  },
  {
    slug: "device-and-refill-costs",
    title: "What to check before buying a refill-based beauty device",
    pillar: "Ownership and maintenance",
    date: "2026-11-03",
    readMinutes: 4,
    excerpt:
      "The device price is only part of the story. A short checklist for judging the real cost and effort of owning any refill-based device, including ours.",
    sections: [
      {
        paragraphs: [
          "Refill-based devices are convenient, but the price on the box isn't the whole cost. Before you buy one, from us or anyone else, it's worth checking a few things.",
        ],
      },
      {
        heading: "1. Cost per use",
        paragraphs: [
          "Divide the refill price by the number of uses it gives. Our current estimate for the GlowPod Base Refill Set is about 9,800₫ per use. That figure will be confirmed in testing, and we publish the device price, the refill price and the cost per use side by side.",
        ],
      },
      {
        heading: "2. Cartridge lock-in",
        paragraphs: [
          "Find out whether the device only accepts the brand's own cartridges. GlowPod Blend does, because dispensing accuracy and hygiene depend on the cartridge design. That makes it more important that refill prices stay transparent.",
        ],
      },
      {
        heading: "3. Cleaning and maintenance",
        paragraphs: [
          "Ask how long cleaning takes and whether any parts need replacing. For GlowPod, that means a quick wipe after each use and a weekly clean, with step-by-step guides in the app.",
        ],
      },
      {
        heading: "4. Support and returns",
        paragraphs: [
          "Check the warranty, whether there is local support in your language, and what can be returned. For hygiene reasons, opened cartridges usually can't be returned. Our policy is on the Returns page.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[m - 1]} ${y}`;
}
