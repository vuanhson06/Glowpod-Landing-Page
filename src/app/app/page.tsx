import type { Metadata } from "next";
import { ButtonLink, Container, PageHeader, PrototypeNote } from "@/components/ui";

export const metadata: Metadata = { title: "The GlowPod app" };

const FEATURES = [
  {
    title: "Guided face scan",
    body: "Uses your phone camera and guides you to even light. Each photo is checked for blur, shadows and colour casts before it’s used.",
  },
  {
    title: "Shade suggestion you control",
    body: "Suggests a blend of the four base cartridges within the tested range. You can make it lighter, deeper, warmer or cooler.",
  },
  {
    title: "Saved shade profiles",
    body: "Repeat a blend you like, or adjust it for the season, without scanning again.",
  },
  {
    title: "Cartridge levels",
    body: "See how much is left in each cartridge. Refill reminders are optional, and you decide whether to reorder.",
  },
  {
    title: "Cleaning guides",
    body: "Step-by-step guides for the quick wipe after each use and the weekly clean.",
  },
  {
    title: "Privacy settings",
    body: "The app asks for consent before scanning, explains how long images are kept, and lets you delete them at any time.",
  },
];

const STEPS = [
  {
    title: "Install and connect",
    body: "Download the GlowPod app (iOS and Android), switch on your GlowPod Blend and pair it over Bluetooth.",
  },
  {
    title: "Load the cartridges",
    body: "Insert the four sealed cartridges: light, medium and deep bases plus the tone adjuster. The app confirms each one.",
  },
  {
    title: "Scan your face",
    body: "Stand in even light with a neutral background and follow the prompts. If the light isn’t good enough, the app asks you to rescan instead of guessing.",
  },
  {
    title: "Review and adjust",
    body: "Check the suggested shade and fine-tune it within the tested limits. Save it as a profile if you like it.",
  },
  {
    title: "Confirm and dispense",
    body: "Nothing is dispensed until you confirm. The device then mixes and dispenses a measured portion.",
  },
  {
    title: "Clean up",
    body: "Wipe the dispensing tip after use. The app reminds you when the weekly clean is due.",
  },
];

export default function AppPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="The app"
        title="The GlowPod app: your shade, on your phone"
        intro="GlowPod Blend works with a free companion app. It handles the scan, the shade suggestion and your saved profiles, and tells the dispenser what to mix. No paid subscription is needed for basic use."
      />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">What the app does</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-3xl bg-white/60 p-6 ring-1 ring-charcoal/5">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">How to use it</h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-2">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-3xl bg-white/60 p-6 ring-1 ring-charcoal/5">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose text-sm font-semibold text-charcoal"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal/70">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 max-w-2xl space-y-6">
        <PrototypeNote>The AI suggests shades only. It doesn’t diagnose skin.</PrototypeNote>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/shop/glowpod-blend-starter-kit">See the Starter Kit</ButtonLink>
          <ButtonLink href="/faq" variant="outline">
            Read the FAQ
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
