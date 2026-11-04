import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";
import { faqGroups } from "@/data/faqs";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Help"
        title="Frequently asked questions"
        intro={
          <>
            Can’t find what you need? Read our <Link href="/shipping" className="underline">shipping</Link> and{" "}
            <Link href="/returns" className="underline">returns</Link> information.
          </>
        }
      />
      <div className="max-w-3xl space-y-10">
        {faqGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-xl font-semibold">{group.title}</h2>
            <div className="mt-4 divide-y divide-charcoal/10 rounded-3xl bg-white/60 ring-1 ring-charcoal/5">
              {group.items.map((item) => (
                <details key={item.q} className="group px-6 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="text-xl leading-none text-rose-dark transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-charcoal/75">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
