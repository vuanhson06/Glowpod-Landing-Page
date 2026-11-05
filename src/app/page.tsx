import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Price } from "@/components/ui";
import { products, starterKit } from "@/data/products";

const STEPS = [
  { title: "Scan", body: "Guided lighting, photo quality checked." },
  { title: "Adjust", body: "Fine-tune the suggested shade." },
  { title: "Dispense", body: "A measured portion, mixed for you." },
];

// The four base cartridges, shown as dots orbiting the device.
const CARTRIDGES = ["#f1d6c2", "#d4a17c", "#8f5f42", "#c9949b"];

const MARQUEE = ["Scan", "Adjust", "Save your shade", "Dispense", "Four base cartridges", "You confirm every blend"];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="anim-blob absolute -top-24 -left-24 h-96 w-96 rounded-full bg-rose-light blur-3xl" />
          <div
            className="anim-blob absolute top-1/3 -right-20 h-[28rem] w-[28rem] rounded-full bg-sage-light blur-3xl"
            style={{ animationDelay: "-5s" }}
          />
          <div
            className="anim-blob absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-sand blur-3xl"
            style={{ animationDelay: "-9s" }}
          />
        </div>

        <Container className="grid min-h-[calc(100svh-7rem)] items-center gap-12 py-12 md:grid-cols-2">
          <div>
            <p className="anim-fade-up text-sm font-semibold tracking-[0.2em] text-rose-dark uppercase">GlowPod Blend</p>
            <h1
              className="anim-fade-up mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              Your shade, <span className="text-shimmer">blended</span> at home
            </h1>
            <p
              className="anim-fade-up mt-6 max-w-md text-lg leading-relaxed text-charcoal/75"
              style={{ animationDelay: "260ms" }}
            >
              Scan with your phone. Confirm the blend. Dispense.
            </p>
            <div className="anim-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "400ms" }}>
              <ButtonLink href={`/shop/${starterKit.slug}`} className="lift">
                See the Starter Kit
              </ButtonLink>
              <ButtonLink href="/app" variant="outline" className="lift">
                Meet the app
              </ButtonLink>
            </div>
            <p className="anim-fade-up mt-6 text-sm text-charcoal/60" style={{ animationDelay: "520ms" }}>
              From <Price amount={starterKit.price} className="font-semibold text-charcoal" />
            </p>
          </div>

          <div className="anim-fade-up relative mx-auto w-full max-w-md" style={{ animationDelay: "200ms" }}>
            <div aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-rose/40 anim-pulse-ring" />
            <div
              aria-hidden="true"
              className="anim-spin-reverse absolute -inset-6 rounded-full border border-dashed border-sage-dark/30"
            />
            <div aria-hidden="true" className="orbit anim-spin-slow absolute -inset-6">
              {CARTRIDGES.map((color, i) => (
                <span
                  key={color}
                  className="absolute h-6 w-6 rounded-full shadow-lg ring-4 ring-ivory"
                  style={{
                    backgroundColor: color,
                    top: `${50 - 50 * Math.cos((i * Math.PI) / 2)}%`,
                    left: `${50 + 50 * Math.sin((i * Math.PI) / 2)}%`,
                    translate: "-50% -50%",
                  }}
                />
              ))}
            </div>
            <div className="anim-float overflow-hidden rounded-full shadow-2xl shadow-rose/30">
              <ProductImage product={starterKit} sizes="(min-width: 768px) 28rem, 100vw" className="aspect-square" eager />
            </div>
          </div>
        </Container>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-charcoal/10 bg-charcoal py-4 text-ivory" aria-hidden="true">
        <div className="anim-marquee flex w-max gap-10 whitespace-nowrap text-lg font-medium">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={i} className="flex items-center gap-10">
              {word}
              <span className="h-2 w-2 rounded-full bg-rose" />
            </span>
          ))}
        </div>
      </div>

      {/* Steps */}
      <section className="py-20">
        <Container>
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">Three steps. That’s it.</h2>
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 150} className="h-full">
                  <div className="lift h-full rounded-3xl bg-white/60 p-8 text-center ring-1 ring-charcoal/5">
                    <span className="text-shimmer text-6xl font-semibold">{i + 1}</span>
                    <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-charcoal/70">{step.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal delay={450}>
            <p className="mt-8 text-center text-sm text-charcoal/60">
              The AI suggests shades within a tested range. It doesn’t diagnose skin.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Products */}
      <section className="pb-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 150} className="lift rounded-3xl">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="pb-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-charcoal px-8 py-16 text-center text-ivory">
              <div
                aria-hidden="true"
                className="anim-blob absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-rose/40 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="anim-blob absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-sage/30 blur-3xl"
                style={{ animationDelay: "-6s" }}
              />
              <h2 className="relative text-3xl font-semibold tracking-tight sm:text-5xl">Find your blend.</h2>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/shop" variant="rose" className="lift">
                  Shop GlowPod
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
