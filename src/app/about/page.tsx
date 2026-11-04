import type { Metadata } from "next";
import { ButtonLink, Container, PageHeader, PrototypeNote } from "@/components/ui";

export const metadata: Metadata = { title: "About us" };

const PRINCIPLES = [
  {
    title: "Clear about what the AI does",
    body: "It suggests a blend within a tested range. It doesn't invent ingredients or diagnose skin, and you confirm every shade.",
  },
  {
    title: "Honest running costs",
    body: "We publish the device price, refill price and estimated cost per use together. No paid subscription is needed for basic use.",
  },
  {
    title: "Local support",
    body: "Vietnamese onboarding, local shade trials and human support are part of the plan from the start.",
  },
  {
    title: "Test before we sell",
    body: "Shade range, hygiene, cartridge compatibility and dispensing accuracy must be proven before any sale.",
  },
];

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="About us"
        title="Making foundation shade matching practical at home"
        intro="GlowPod is a proposed Vietnamese beauty technology brand. We're starting with one clear job: helping you choose and dispense a suitable foundation shade."
      />

      <div className="grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold">Our story</h2>
          <div className="mt-3 space-y-4 leading-relaxed text-charcoal/80">
            <p>
              Our team kept running into the same problem: choosing a foundation shade online is uncertain, and blending
              two products by hand to get it right is a hassle. GlowPod brings shade guidance and a physical dispenser
              together in one product.
            </p>
            <p>
              The first release focuses on foundation. Personalised skincare could come later, but only with its own
              cartridges and a separate round of testing.
            </p>
          </div>
        </section>
        <section className="space-y-6">
          <div className="rounded-3xl bg-white/60 p-6 ring-1 ring-charcoal/5">
            <h2 className="text-sm font-semibold tracking-wide text-rose-dark uppercase">Mission</h2>
            <p className="mt-2 leading-relaxed">
              Help beauty users choose and dispense a suitable foundation shade at home, through guided personalisation,
              measured portions and clear product information.
            </p>
          </div>
          <div className="rounded-3xl bg-white/60 p-6 ring-1 ring-charcoal/5">
            <h2 className="text-sm font-semibold tracking-wide text-sage-dark uppercase">Vision</h2>
            <p className="mt-2 leading-relaxed">
              Build a trusted Vietnamese beauty technology brand that makes personalised cosmetic dispensing practical for
              everyday routines.
            </p>
          </div>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">What we hold ourselves to</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-3xl bg-white/60 p-6 ring-1 ring-charcoal/5">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-2xl space-y-6">
        <PrototypeNote>
          GlowPod is a student business proposal. Features, target customers and advantages still need validation. We
          don’t claim any sales, customer testing, finalised formulas or commercial partnerships.
        </PrototypeNote>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/shop">See the products</ButtonLink>
          <ButtonLink href="/faq" variant="outline">
            Read the FAQ
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
