import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader, Price } from "@/components/ui";
import { CITIES, FREE_SHIPPING_THRESHOLD, SHIPPING_METHODS } from "@/lib/shipping";

export const metadata: Metadata = { title: "Shipping information" };

export default function ShippingPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Help"
        title="Shipping information"
        intro="Where we plan to deliver, how long it takes and what it costs."
      />
      <div className="max-w-3xl space-y-10">
        <section>
          <h2 className="text-xl font-semibold">Delivery times and fees</h2>
          <div className="mt-4 overflow-x-auto rounded-3xl bg-white/60 ring-1 ring-charcoal/5">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b border-charcoal/10">
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Method
                  </th>
                  {CITIES.map((c) => (
                    <th key={c.id} scope="col" className="px-5 py-3 font-semibold">
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {SHIPPING_METHODS.map((m) => (
                  <tr key={m.id}>
                    <th scope="row" className="px-5 py-4 font-medium">
                      {m.name}
                    </th>
                    {CITIES.map((c) => (
                      <td key={c.id} className="px-5 py-4">
                        {m.fee[c.id] === undefined ? (
                          <span className="text-charcoal/60">Not available</span>
                        ) : (
                          <>
                            <Price amount={m.fee[c.id]!} className="block font-semibold" />
                            <span className="text-charcoal/60">{m.days[c.id]}</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-charcoal/75">
            <strong className="font-semibold">Free standard delivery</strong> on orders of{" "}
            <Price amount={FREE_SHIPPING_THRESHOLD} /> or more, anywhere we deliver. Same-day delivery is always charged.
          </p>
        </section>

        <section className="space-y-3 leading-relaxed text-charcoal/80">
          <h2 className="text-xl font-semibold text-charcoal">How delivery works</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Standard delivery reaches every province in 2–3 days.</li>
            <li>Same-day delivery is available in Ho Chi Minh City and Hanoi.</li>
            <li>Orders placed before 2 pm on a working day are packed the same day.</li>
            <li>You’ll get a tracking link by email and SMS once your order ships.</li>
            <li>Cash on delivery is available for all addresses.</li>
            <li>Cartridges are factory sealed. Please check the seal when your order arrives.</li>
          </ul>
        </section>

        <p className="text-sm text-charcoal/70">
          Need to send something back? See our <Link href="/returns" className="underline">returns policy</Link>.
        </p>
      </div>
    </Container>
  );
}
