import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
import { ProductVisual } from "@/components/ProductVisual";
import { Container, Price, PrototypeNote } from "@/components/ui";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product ? { title: product.name, description: product.tagline } : {};
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="pt-8 text-sm text-charcoal/60">
        <Link href="/shop" className="hover:underline">
          Shop
        </Link>{" "}
        / <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid gap-10 pt-6 md:grid-cols-2">
        <ProductVisual kind={product.kind} className="aspect-square" />

        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-lg text-charcoal/75">{product.tagline}</p>
          <p className="mt-5 text-2xl font-semibold">
            <Price amount={product.price} />
            <span className="ml-2 align-middle text-xs font-normal text-charcoal/60">prototype price</span>
          </p>
          {product.costNote && <p className="mt-2 text-sm text-sage-dark">{product.costNote}</p>}

          <div className="mt-6">
            <AddToCart slug={product.slug} name={product.name} />
          </div>

          <div className="mt-6 space-y-4 leading-relaxed text-charcoal/80">
            {product.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h2 className="mt-8 font-semibold">What’s in the box</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-charcoal/80">
            {product.inBox.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-8 font-semibold">Details</h2>
          <dl className="mt-3 divide-y divide-charcoal/10 rounded-2xl bg-white/60 px-4 ring-1 ring-charcoal/5">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-charcoal/60">{s.label}</dt>
                <dd className="text-right font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <PrototypeNote>
              Delivery in 2–5 working days. See <Link href="/shipping" className="underline">shipping</Link> and{" "}
              <Link href="/returns" className="underline">returns</Link> (draft policies).
            </PrototypeNote>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">You may also need</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </Container>
  );
}
