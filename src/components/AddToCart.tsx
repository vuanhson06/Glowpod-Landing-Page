"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { QuantityStepper } from "./QuantityStepper";
import { buttonClass } from "./ui";

export function AddToCart({ slug, name }: { slug: string; name: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState<number | null>(null);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={qty} onChange={setQty} label={`Quantity of ${name}`} />
        <button
          type="button"
          className={buttonClass("primary", "min-w-40")}
          onClick={() => {
            add(slug, qty);
            setAdded(qty);
          }}
        >
          Add to cart
        </button>
      </div>
      <p className="mt-3 min-h-6 text-sm" role="status">
        {added !== null && (
          <>
            Added {added} to your cart.{" "}
            <Link href="/cart" className="font-semibold text-rose-dark underline">
              View cart
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
