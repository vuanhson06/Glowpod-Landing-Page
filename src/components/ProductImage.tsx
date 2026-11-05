import Image from "next/image";
import type { Product } from "@/data/products";

export function ProductImage({
  product,
  sizes,
  className = "",
  eager = false,
}: {
  product: Product;
  sizes: string;
  className?: string;
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
    </div>
  );
}
