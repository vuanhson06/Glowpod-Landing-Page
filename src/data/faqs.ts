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
        a: "The scan gives a suggestion, not a final answer. The app checks image quality and lighting first, and you can always adjust the shade by hand before dispensing. If the light isn't good enough, it asks you to rescan.",
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
        a: "The Starter Kit is 3,490,000₫ and a Base Refill Set is 590,000₫, which we estimate at about 60 uses (roughly 9,800₫ per use). These are prototype prices and will be confirmed before launch.",
      },
      {
        q: "Do I need a subscription?",
        a: "No. Basic operation doesn't need a paid subscription. Refill reminders and automatic reordering are optional, and you control them.",
      },
      {
        q: "How do I clean it?",
        a: "Wipe the nozzle after each use and do a full clean once a week with the Care & Cleaning Kit. Replace a nozzle about every two months. The app has step-by-step guides.",
      },
    ],
  },
  {
    title: "Orders, delivery and returns",
    items: [
      {
        q: "Can I order now?",
        a: "Not yet. This site is a student prototype, and checkout is a demonstration only: no order is placed and no payment is taken.",
      },
      {
        q: "Where do you deliver?",
        a: "Our draft plan covers Ho Chi Minh City and Hanoi first, with other provinces after that. Delivery times and fees are on the Shipping page.",
      },
      {
        q: "Can I return my order?",
        a: "Our draft policy accepts unused devices within 14 days and unopened cartridges within 30 days. Opened cartridges can't be returned for hygiene reasons. See the Returns page for details.",
      },
    ],
  },
];
