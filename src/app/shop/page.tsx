import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { Container, PageHeader, PrototypeNote } from "@/components/ui";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Shop"
        title="The GlowPod Blend system"
        intro="Start with the Starter Kit, then refill the foundation bases as you need them."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      <div className="mt-10 max-w-2xl">
        <PrototypeNote>
          All prices are placeholders for this prototype. Cartridge compatibility, shade range and dispensing accuracy
          will be proven before anything is sold.
        </PrototypeNote>
      </div>
    </Container>
  );
}
