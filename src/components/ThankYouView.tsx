"use client";

import Link from "next/link";
import { useHydrated } from "@/lib/cart";
import { readLastOrder } from "@/lib/order";
import { CITIES, effectiveMethod, getShippingMethod } from "@/lib/shipping";
import { ButtonLink, Price } from "./ui";

export function ThankYouView() {
  const hydrated = useHydrated();
  if (!hydrated) return <p className="py-10 text-charcoal/60">Loading your order…</p>;

  const order = readLastOrder();

  if (!order) {
    return (
      <div className="rounded-3xl bg-white/60 p-10 text-center ring-1 ring-charcoal/5">
        <h1 className="text-2xl font-semibold">Thank you for visiting GlowPod</h1>
        <p className="mt-2 text-charcoal/70">We couldn’t find a recent order in this browser tab.</p>
        <ButtonLink href="/shop" className="mt-6">
          Go to the shop
        </ButtonLink>
      </div>
    );
  }

  const method = getShippingMethod(effectiveMethod(order.customer.shipping, order.customer.city));
  const city = CITIES.find((c) => c.id === order.customer.city)?.name ?? "";

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
      <div>
        <p className="text-sm font-semibold tracking-wide text-rose-dark uppercase">Order {order.id}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Thank you, {order.customer.fullName.split(" ").at(-1)}!
        </h1>
        <p className="mt-4 text-lg text-charcoal/75">
          Online ordering isn’t open yet, so this order won’t be shipped and no payment was taken. Once it opens, we’ll
          send confirmations to <strong className="font-semibold">{order.customer.email}</strong>.
        </p>

        <h2 className="mt-10 text-lg font-semibold">What happens next</h2>
        <ol className="mt-4 space-y-4">
          {[
            ["Confirmation", "Once ordering opens, you’ll get an email and SMS with your order details."],
            ["Delivery", `${method.name} to ${order.customer.district}, ${city}: ${method.days[order.customer.city]}.`],
            ["Setup", "Charge the device, download the GlowPod app and follow the guided first scan."],
          ].map(([title, body], i) => (
            <li key={title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose text-sm font-semibold">
                {i + 1}
              </span>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-charcoal/70">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/shop">Continue shopping</ButtonLink>
          <ButtonLink href="/blog/how-glowpod-works" variant="outline">
            Read how GlowPod works
          </ButtonLink>
        </div>
      </div>

      <aside className="h-fit rounded-3xl bg-white/60 p-6 ring-1 ring-charcoal/5">
        <h2 className="font-semibold">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {order.items.map((item) => (
            <li key={item.slug} className="flex justify-between gap-4">
              <span>
                {item.name} <span className="text-charcoal/60">× {item.qty}</span>
              </span>
              <Price amount={item.price * item.qty} />
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-charcoal/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>
              <Price amount={order.subtotal} />
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>{order.shippingFee === 0 ? "Free" : <Price amount={order.shippingFee} />}</dd>
          </div>
          <div className="flex justify-between border-t border-charcoal/10 pt-2 text-base font-semibold">
            <dt>Total</dt>
            <dd>
              <Price amount={order.total} />
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-charcoal/60">
          Questions? See the <Link href="/faq" className="underline">FAQ</Link> or our{" "}
          <Link href="/returns" className="underline">returns policy</Link>.
        </p>
      </aside>
    </div>
  );
}
