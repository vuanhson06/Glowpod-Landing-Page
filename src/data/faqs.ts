export type FaqGroup = { title: string; items: { q: string; a: string }[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "The device and cartridges",
    items: [
      {
        q: "What does GlowPod Blend actually do?",
        a: "It mixes a foundation shade from four base cartridges and dispenses a measured amount. Your phone scans your face, the app suggests a blend, you confirm or adjust it, and the device dispenses it.",
      },
      {
        q: "Can I use other brands' foundation in it?",
        a: "No. GlowPod Blend only works with GlowPod cartridges. Dispensing accuracy, shade range and hygiene all depend on the cartridge design, so we can't support other products.",
      },
      {
        q: "Which shades are supported?",
        a: "The four bases (light, medium, deep and a tone adjuster) combine into a range of shades. The exact range is still being tested across skin tones, and we'll publish it before sales start. The app won't suggest a shade outside the tested range.",
      },
      {
        q: "What’s in the foundation?",
        a: "A semi-matte formula with medium, buildable coverage. It contains niacinamide and hyaluronic acid, and it’s paraben-free and fragrance-free. We’ll publish the full ingredient list before sales start.",
      },
      {
        q: "Does it do skincare too?",
        a: "Not at launch. The first release is foundation only. Personalised skincare would need its own cartridges and separate testing.",
      },
    ],
  },
  {
    title: "The AI and your images",
    items: [
      {
        q: "Can I trust a phone scan to pick my shade?",
        a: "The scan gives a suggestion, not a final answer. You hold the GlowPod Colour Card at your jawline so the app can correct for your phone camera’s colour, and it checks image quality and lighting first, and you can always adjust the shade by hand before dispensing. If the light isn't good enough, it asks you to rescan.",
      },
      {
        q: "Does the AI diagnose skin conditions?",
        a: "No. It only estimates tone and undertone to suggest a foundation blend. It doesn't give medical or skincare advice.",
      },
      {
        q: "What happens to my face images?",
        a: "The app asks for consent before scanning, explains how long images are kept, and lets you delete them at any time from the settings.",
      },
    ],
  },
  {
    title: "Costs and cleaning",
    items: [
      {
        q: "What does it cost to own?",
        a: "The Starter Kit is 1,690,000₫ and a Base Refill Set is 390,000₫, which we estimate lasts about 24 weeks at 5 applications a week (roughly 2,300₫ per day).",
      },
      {
        q: "Do I need a subscription?",
        a: "No. Basic operation doesn't need a paid subscription. Refill reminders and automatic reordering are optional, and you control them.",
      },
      {
        q: "How do I clean it?",
        a: "Wipe the dispensing tip after each use and give the device a full clean once a week. The app has step-by-step cleaning and maintenance guides.",
      },
    ],
  },
  {
    title: "Orders, delivery and returns",
    items: [
      {
        q: "Can I order now?",
        a: "Not yet. Online ordering isn’t open, so checkout doesn’t place an order or take a payment.",
      },
      {
        q: "Where do you deliver?",
        a: "Standard delivery reaches every province in 2–3 days, and same-day delivery is available in Ho Chi Minh City and Hanoi. Fees are on the Shipping page.",
      },
      {
        q: "Can I return my order?",
        a: "The dispenser has a 12-month 1-to-1 replacement warranty, and you can return it within 30 days if the nozzle keeps blocking despite the guided cleaning. Unopened cartridges can be returned within 30 days. Opened cartridges can't be returned for hygiene reasons, unless you have an allergic reaction within 7 days confirmed by a dermatologist, in which case you get full store credit. See the Returns page for details.",
      },
    ],
  },
];
