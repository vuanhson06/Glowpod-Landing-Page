"use client";

import Link from "next/link";
import { useCart, useHydrated } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD, shippingFee } from "@/lib/shipping";
import { ProductVisual } from "./ProductVisual";
import { QuantityStepper } from "./QuantityStepper";
import { ButtonLink, Price } from "./ui";

export function CartView() {
  const hydrated = useHydrated();
  const { items, subtotal, setQty, remove } = useCart();

  if (!hydrated) return <p className="py-10 text-charcoal/60">Loading your cart…</p>;

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white/60 p-10 text-center ring-1 ring-charcoal/5">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="mt-2 text-charcoal/70">Start with the Starter Kit, or add refills for a device you already have.</p>
        <ButtonLink href="/shop" className="mt-6">
          Go to the shop
        </ButtonLink>
      </div>
    );
  }

  const estimate = shippingFee("standard", "hcmc", subtotal);
  const toFree = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <ul className="divide-y divide-charcoal/10 rounded-3xl bg-white/60 px-4 ring-1 ring-charcoal/5 sm:px-6">
        {items.map(({ product, qty }) => (
          <li key={product.slug} className="flex gap-4 py-5">
            <Link href={`/shop/${product.slug}`} className="w-20 shrink-0 sm:w-24">
              <ProductVisual kind={product.kind} className="aspect-square rounded-2xl" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link href={`/shop/${product.slug}`} className="font-semibold hover:underline">
                  {product.name}
                </Link>
                <p className="text-sm text-charcoal/60">
                  <Price amount={product.price} /> each
                </p>
              </div>
              <div className="flex items-center gap-4">
                <QuantityStepper value={qty} onChange={(q) => setQty(product.slug, q)} label={`Quantity of ${product.name}`} />
                <Price amount={product.price * qty} className="w-28 text-right font-semibold" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(product.slug)}
              className="self-start rounded-full p-1 text-charcoal/50 hover:bg-sand hover:text-charcoal"
              aria-label={`Remove ${product.name}`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-3xl bg-white/60 p-6 ring-1 ring-charcoal/5">
        <h2 className="font-semibold">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>
              <Price amount={subtotal} />
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Standard shipping (HCMC/Hanoi)</dt>
            <dd>{estimate === 0 ? "Free" : <Price amount={estimate} />}</dd>
          </div>
        </dl>
        {toFree > 0 && (
          <p className="mt-3 text-xs text-sage-dark">
            Add <Price amount={toFree} /> more for free standard shipping.
          </p>
        )}
        <p className="mt-3 text-xs text-charcoal/60">
          Final shipping is calculated at checkout. <Link href="/shipping" className="underline">Shipping details</Link>
        </p>
        <ButtonLink href="/checkout" className="mt-6 w-full">
          Go to checkout
        </ButtonLink>
        <Link href="/shop" className="mt-3 block text-center text-sm underline">
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
