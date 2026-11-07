"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart, useHydrated } from "@/lib/cart";
import { PAYMENT_METHODS, validateCheckout, type CheckoutErrors, type CheckoutValues } from "@/lib/checkout";
import { newOrderId, saveLastOrder } from "@/lib/order";
import { CITIES, SHIPPING_METHODS, effectiveMethod, isMethodAvailable, shippingFee } from "@/lib/shipping";
import { ButtonLink, buttonClass, Field, INPUT, Price } from "./ui";

const INITIAL: CheckoutValues = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  district: "",
  city: "hcmc",
  shipping: "standard",
  payment: "cod",
  notes: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { items, subtotal, clear } = useCart();
  const [values, setValues] = useState<CheckoutValues>(INITIAL);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // With cacheComponents, Next keeps this route mounted (hidden) after navigating away,
  // so reset the "placing order" state when the page is hidden.
  useEffect(() => () => setSubmitting(false), []);

  if (!hydrated) return <p className="py-10 text-charcoal/60">Loading checkout…</p>;

  if (items.length === 0 && submitting) return <p className="py-10 text-charcoal/60">Placing your order…</p>;

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white/60 p-10 text-center ring-1 ring-charcoal/5">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="mt-2 text-charcoal/70">Add something to your cart before checking out.</p>
        <ButtonLink href="/shop" className="mt-6">
          Go to the shop
        </ButtonLink>
      </div>
    );
  }

  // Same-day delivery only reaches some cities, so fall back to standard elsewhere.
  const shipping = effectiveMethod(values.shipping, values.city);
  const fee = shippingFee(shipping, values.city, subtotal);
  const total = subtotal + fee;

  const set = <K extends keyof CheckoutValues>(key: K, value: CheckoutValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const text = (key: "fullName" | "email" | "phone" | "street" | "district", autoComplete: string, type = "text") => ({
    id: key,
    name: key,
    type,
    autoComplete,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(key, e.target.value),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: INPUT,
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateCheckout(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setSubmitting(true);
    saveLastOrder({
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      customer: { ...values, shipping },
      items: items.map(({ product, qty }) => ({ slug: product.slug, name: product.name, price: product.price, qty })),
      subtotal,
      shippingFee: fee,
      total,
    });
    router.push("/thank-you");
    clear();
    setValues(INITIAL);
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 lg:grid-cols-[3fr_2fr]">
      <div className="space-y-8">
        {errorCount > 0 && (
          <p role="alert" className="rounded-2xl border border-red-700/30 bg-red-50 px-4 py-3 text-sm text-red-800">
            Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} below.
          </p>
        )}

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Contact</legend>
          <Field id="fullName" label="Full name" error={errors.fullName}>
            <input {...text("fullName", "name")} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="email" label="Email" error={errors.email}>
              <input {...text("email", "email", "email")} />
            </Field>
            <Field id="phone" label="Phone" error={errors.phone}>
              <input {...text("phone", "tel", "tel")} inputMode="tel" placeholder="0901 234 567" />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Delivery address</legend>
          <Field id="street" label="Street address" error={errors.street}>
            <input {...text("street", "street-address")} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="district" label="District" error={errors.district}>
              <input {...text("district", "address-level2")} />
            </Field>
            <Field id="city" label="City">
              <select
                id="city"
                name="city"
                value={values.city}
                onChange={(e) => set("city", e.target.value as CheckoutValues["city"])}
                className={INPUT}
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field id="notes" label="Delivery notes (optional)">
            <textarea
              id="notes"
              name="notes"
              rows={2}
              value={values.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={INPUT}
            />
          </Field>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-semibold">Shipping method</legend>
          <div className="mt-3 space-y-3">
            {SHIPPING_METHODS.map((m) => {
              const available = isMethodAvailable(m.id, values.city);
              const methodFee = shippingFee(m.id, values.city, subtotal);
              return (
                <label
                  key={m.id}
                  className={`flex items-center justify-between gap-4 rounded-2xl border border-charcoal/15 bg-white/60 px-4 py-3 has-[:checked]:border-charcoal has-[:checked]:bg-white ${available ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value={m.id}
                      checked={shipping === m.id}
                      disabled={!available}
                      onChange={() => set("shipping", m.id)}
                      className="accent-charcoal"
                    />
                    <span>
                      <span className="block font-medium">{m.name}</span>
                      <span className="block text-sm text-charcoal/60">
                        {available ? m.days[values.city] : "Ho Chi Minh City and Hanoi only"}
                      </span>
                    </span>
                  </span>
                  {available && (
                    <span className="text-sm font-semibold">{methodFee === 0 ? "Free" : <Price amount={methodFee} />}</span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-semibold">Payment</legend>
          <div className="mt-3 space-y-3">
            {PAYMENT_METHODS.map((p) => (
              <label
                key={p.id}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-charcoal/15 bg-white/60 px-4 py-3 has-[:checked]:border-charcoal has-[:checked]:bg-white"
              >
                <input
                  type="radio"
                  name="payment"
                  value={p.id}
                  checked={values.payment === p.id}
                  onChange={() => set("payment", p.id)}
                  className="accent-charcoal"
                />
                <span>
                  <span className="block font-medium">{p.name}</span>
                  <span className="block text-sm text-charcoal/60">{p.note}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="h-fit rounded-3xl bg-white/60 p-6 ring-1 ring-charcoal/5 lg:sticky lg:top-24">
        <h2 className="font-semibold">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map(({ product, qty }) => (
            <li key={product.slug} className="flex justify-between gap-4">
              <span>
                {product.name} <span className="text-charcoal/60">× {qty}</span>
              </span>
              <Price amount={product.price * qty} />
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-charcoal/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>
              <Price amount={subtotal} />
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>{fee === 0 ? "Free" : <Price amount={fee} />}</dd>
          </div>
          <div className="flex justify-between border-t border-charcoal/10 pt-2 text-base font-semibold">
            <dt>Total</dt>
            <dd>
              <Price amount={total} />
            </dd>
          </div>
        </dl>
        <button type="submit" className={buttonClass("primary", "mt-6 w-full")} disabled={submitting}>
          Place order
        </button>
        <p className="mt-3 text-center text-xs text-charcoal/60">
          Online ordering isn’t open yet. No order is sent and no payment is taken.
        </p>
        <Link href="/cart" className="mt-3 block text-center text-sm underline">
          Back to cart
        </Link>
      </aside>
    </form>
  );
}
