import Link from "next/link";
import type { Product } from "@/data/products";
import { ProductVisual } from "./ProductVisual";
import { Price } from "./ui";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col rounded-3xl bg-white/60 p-3 ring-1 ring-charcoal/5 transition hover:bg-white hover:shadow-sm"
    >
      <ProductVisual kind={product.kind} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <h3 className="font-semibold group-hover:underline">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-charcoal/70">{product.tagline}</p>
        <Price amount={product.price} className="mt-3 font-semibold" />
      </div>
    </Link>
  );
}
