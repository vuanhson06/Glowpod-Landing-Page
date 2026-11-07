import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Returns" };

const RULES = [
  {
    item: "GlowPod Blend dispenser",
    window: "12 months",
    condition: "1-to-1 replacement if an electrical part or sensor stops working",
  },
  {
    item: "GlowPod Blend dispenser",
    window: "30 days",
    condition: "Return if the nozzle keeps blocking even though you follow the guided cleaning steps in the app",
  },
  { item: "Unopened cartridges", window: "30 days", condition: "Factory seal intact" },
  {
    item: "Opened cartridges",
    window: "7 days",
    condition: "Only if you have an allergic reaction, confirmed by a dermatologist’s report. You get 100% store credit.",
  },
];

const STEPS = [
  "Contact our support team with your order number and the reason for the return.",
  "We'll send you a return label and arrange a courier pickup in HCMC or Hanoi.",
  "Once the item arrives and is checked, we send a replacement, refund you or add store credit within 7 working days.",
];

export default function ReturnsPage() {
  return (
    <Container>
      <PageHeader eyebrow="Help" title="Returns" intro="What you can return, how long you have, and how refunds work." />
      <div className="max-w-3xl space-y-10">
        <section>
          <h2 className="text-xl font-semibold">What can be returned</h2>
          <div className="mt-4 overflow-x-auto rounded-3xl bg-white/60 ring-1 ring-charcoal/5">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b border-charcoal/10">
                  <th scope="col" className="px-5 py-3 font-semibold">Item</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Return window</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {RULES.map((r) => (
                  <tr key={r.item + r.window}>
                    <th scope="row" className="px-5 py-4 font-medium">{r.item}</th>
                    <td className="px-5 py-4">{r.window}</td>
                    <td className="px-5 py-4 text-charcoal/75">{r.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-charcoal/75">
            <strong className="font-semibold">Hygiene rule:</strong> opened cartridges can’t be returned, because cosmetic
            products can’t be resold once the seal is broken. The only exception is a confirmed allergic reaction within
            7 days, which we refund as store credit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">How to return an item</h2>
          <ol className="mt-4 space-y-4">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose text-sm font-semibold">
                  {i + 1}
                </span>
                <p className="pt-1 leading-relaxed text-charcoal/80">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <p className="text-sm text-charcoal/70">
          Refunds go back to the original payment method. Cash-on-delivery orders are refunded by bank transfer. See also{" "}
          <Link href="/shipping" className="underline">shipping information</Link> and the{" "}
          <Link href="/faq" className="underline">FAQ</Link>.
        </p>
      </div>
    </Container>
  );
}
