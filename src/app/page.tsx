import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ProductVisual } from "@/components/ProductVisual";
import { ButtonLink, Container, Price } from "@/components/ui";
import { faqGroups } from "@/data/faqs";
import { formatPostDate, posts } from "@/data/posts";
import { products, refillSet, starterKit } from "@/data/products";

const STEPS = [
  {
    title: "Scan under guided lighting",
    body: "The app guides you to even light and checks each photo for quality before it is used.",
  },
  {
    title: "Confirm your suggested blend",
    body: "See the suggested shade, adjust it within the tested range, and save it as a profile.",
  },
  {
    title: "Dispense a measured amount",
    body: "GlowPod Blend mixes the four base cartridges and dispenses just the portion you need.",
  },
];

const FAQ_TEASER = [faqGroups[0].items[1], faqGroups[1].items[0], faqGroups[2].items[0]];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <Container className="grid items-center gap-10 py-12 sm:py-20 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-rose-dark uppercase">GlowPod Blend</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Your foundation shade, blended at home
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal/75">
              Scan your face with your phone, check the suggested blend, and let the dispenser mix a measured portion
              from four base cartridges. You stay in control of the final shade.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/shop/${starterKit.slug}`}>See the Starter Kit</ButtonLink>
              <ButtonLink href="/blog/how-glowpod-works" variant="outline">
                How it works
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-charcoal/60">
              Starter Kit from <Price amount={starterKit.price} className="font-semibold text-charcoal" /> ·
              prototype price
            </p>
          </div>
          <ProductVisual kind="device" className="aspect-square md:aspect-[5/4]" />
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white/50 py-16">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">From scan to dispense in three steps</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-3xl bg-ivory p-6 ring-1 ring-charcoal/5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose font-semibold">{i + 1}</span>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl text-sm text-charcoal/60">
            The AI only suggests blends within the tested shade and formula range. It does not diagnose skin
            conditions, and nothing is dispensed until you confirm.
          </p>
        </Container>
      </section>

      {/* Products */}
      <section className="py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Shop GlowPod</h2>
            <Link href="/shop" className="text-sm font-semibold text-rose-dark underline">
              View all products
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((p) => p.featured)
              .map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
          </div>
        </Container>
      </section>

      {/* Cost of ownership */}
      <section className="py-4">
        <Container>
          <div className="rounded-3xl bg-charcoal p-8 text-ivory sm:p-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What it costs to own</h2>
            <p className="mt-3 max-w-2xl text-ivory/75">
              We show the device price, the refill price and the cost per use together, so you can judge the full
              cost before you buy.
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-ivory/70">Starter Kit (device + first bases)</dt>
                <dd className="mt-1 text-2xl font-semibold">
                  <Price amount={starterKit.price} />
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ivory/70">Base Refill Set (about 60 uses)</dt>
                <dd className="mt-1 text-2xl font-semibold">
                  <Price amount={refillSet.price} />
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ivory/70">Estimated cost per use</dt>
                <dd className="mt-1 text-2xl font-semibold">
                  ≈ <Price amount={9_800} />
                </dd>
              </div>
            </dl>
            <p className="mt-8 text-xs text-ivory/60">
              Prototype prices and estimates, to be confirmed through testing. No subscription is needed for basic use.
            </p>
          </div>
        </Container>
      </section>

      {/* Blog */}
      <section className="py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">From the blog</h2>
            <Link href="/blog" className="text-sm font-semibold text-rose-dark underline">
              All articles
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl bg-white/60 p-6 ring-1 ring-charcoal/5 hover:bg-white"
              >
                <p className="text-xs font-semibold tracking-wide text-sage-dark uppercase">{post.pillar}</p>
                <h3 className="mt-2 font-semibold group-hover:underline">{post.title}</h3>
                <p className="mt-2 text-sm text-charcoal/70">{post.excerpt}</p>
                <p className="mt-4 text-xs text-charcoal/60">
                  {formatPostDate(post.date)} · {post.readMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ teaser */}
      <section className="py-4">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Questions before you buy?</h2>
            <p className="mt-3 text-charcoal/70">Cartridges, cleaning, the AI’s limits and delivery, answered plainly.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/faq" variant="outline">
                Read the FAQ
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-charcoal/70">
              Also see <Link href="/shipping" className="underline">shipping</Link> and{" "}
              <Link href="/returns" className="underline">returns</Link>.
            </p>
          </div>
          <div className="divide-y divide-charcoal/10 rounded-3xl bg-white/60 px-6 ring-1 ring-charcoal/5">
            {FAQ_TEASER.map((item) => (
              <div key={item.q} className="py-5">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
