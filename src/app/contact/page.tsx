import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Questions about GlowPod Blend, cartridges, delivery or returns? Send the GlowPod team a message.",
};

const QUICK_LINKS = [
  { href: "/faq", label: "FAQ", body: "Cartridges, cleaning, the AI’s limits and more." },
  { href: "/shipping", label: "Shipping", body: "Where we deliver, how long it takes and fees." },
  { href: "/returns", label: "Returns", body: "What you can return and how refunds work." },
  { href: "/app", label: "The app", body: "Step-by-step guide to setting up and using GlowPod." },
];

export default function ContactPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Contact us"
        title="We’d love to hear from you"
        intro="Questions about GlowPod Blend, your shade, an order or a partnership? Send us a message."
      />

      <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold">Who we are</h2>
            <p className="mt-3 leading-relaxed text-charcoal/75">
              GlowPod is a Vietnamese beauty technology team. We make GlowPod Blend, a home dispenser that helps you
              choose and mix a foundation shade that suits you.
            </p>
            <Link href="/about" className="mt-3 inline-block text-sm font-semibold text-rose-dark underline">
              More about us
            </Link>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Quick answers</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="lift block rounded-2xl bg-white/60 p-4 ring-1 ring-charcoal/5 hover:bg-white"
                  >
                    <span className="font-semibold">{l.label}</span>
                    <span className="mt-1 block text-sm text-charcoal/65">{l.body}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className="mb-4 text-xl font-semibold">
            Send a message
          </h2>
          <ContactForm />
        </section>
      </div>
    </Container>
  );
}
