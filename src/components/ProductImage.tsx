import Image from "next/image";
import type { Product } from "@/data/products";

export function ProductImage({
  product,
  sizes,
  className = "",
  showBadge = false,
  eager = false,
}: {
  product: Product;
  sizes: string;
  className?: string;
  showBadge?: boolean;
  eager?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-rose-light ${className}`}>
      <Image
        src={product.image.src}
        alt={product.image.alt}
        fill
        sizes={sizes}
        className="object-cover"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
      />
      {showBadge && (
        <span className="absolute top-3 left-3 rounded-full bg-ivory/85 px-2.5 py-1 text-xs font-medium text-charcoal/75 backdrop-blur">
          Concept render
        </span>
      )}
    </div>
  );
}
