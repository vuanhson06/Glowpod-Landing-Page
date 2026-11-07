import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ShadeSlider } from "@/components/ShadeSlider";
import { Wave } from "@/components/Wave";
import { ButtonLink, Container } from "@/components/ui";
import { products, starterKit } from "@/data/products";

const STEPS = [
  { title: "Scan", body: "Colour Card at your jaw, photo quality checked." },
  { title: "Adjust", body: "Fine-tune the suggested shade." },
  { title: "Dispense", body: "A measured 0.25 ml portion, mixed for you." },
];

const TRUST = [
  {
    title: "You confirm every blend",
    body: "Nothing is dispensed until you say so.",
    icon: "M20 6 9 17l-5-5",
  },
  {
    title: "No subscription needed",
    body: "Basic use is free after you buy the kit.",
    icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    title: "Tested shade range only",
    body: "The app never suggests a blend outside it.",
    icon: "M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z",
  },
  {
    title: "Your photos, your call",
    body: "Delete your scan photos any time.",
    icon: "M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14",
  },
];

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
          </div>

          <div className="anim-fade-up relative mx-auto w-full max-w-md" style={{ animationDelay: "200ms" }}>
            <div aria-hidden="true" className="anim-pulse-ring absolute inset-6 rounded-[45%] border-2 border-rose/40" />
            <div className="anim-float relative overflow-hidden rounded-t-full rounded-b-[2.5rem] shadow-2xl shadow-rose/30 ring-8 ring-white/70">
              <Image
                src="/images/hero/model-cartridge.webp"
                alt="A young woman with fresh, glowing makeup holding a GlowPod foundation cartridge"
                width={1026}
                height={1392}
                sizes="(min-width: 768px) 28rem, 100vw"
                loading="eager"
                fetchPriority="high"
                className="anim-zoom h-auto w-full"
              />
            </div>
            <div
              className="anim-float absolute -bottom-6 -left-6 w-28 overflow-hidden rounded-3xl bg-white p-1.5 shadow-xl ring-1 ring-charcoal/5 sm:w-32"
              style={{ animationDelay: "-3s" }}
            >
              <Image
                src={starterKit.image.src}
                alt=""
                width={256}
                height={256}
                sizes="8rem"
                className="aspect-square rounded-2xl object-cover"
              />
            </div>
            <p
              className="anim-float absolute top-10 -right-3 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur sm:-right-6"
              style={{ animationDelay: "-1.5s" }}
            >
              <span className="h-4 w-4 rounded-full bg-[#d3a17d] ring-2 ring-white" aria-hidden="true" />
              Shade matched
            </p>
          </div>
        </Container>
      </section>

      {/* Marquee */}
      <Wave className="-mt-16 text-charcoal sm:-mt-24" />
      <div className="overflow-hidden bg-charcoal py-4 text-ivory" aria-hidden="true">
        <div className="anim-marquee flex w-max gap-10 whitespace-nowrap text-lg font-medium">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={i} className="flex items-center gap-10">
              {word}
              <span className="h-2 w-2 rounded-full bg-rose" />
            </span>
          ))}
        </div>
      </div>
      <div className="shade-band h-2" aria-hidden="true" />

      {/* Steps */}
      <section className="bg-[#f0e9e1] py-20">
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
      <Wave flip className="text-[#f0e9e1]" />

      {/* Shade slider */}
      <section className="py-20">
        <Container>
          <Reveal>
            <p className="text-center text-sm font-semibold tracking-[0.2em] text-rose-dark uppercase">Try it</p>
            <h2 className="mt-2 text-center text-3xl font-semibold tracking-tight sm:text-4xl">Play with a blend</h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-charcoal/70">
              Move the sliders and watch the four cartridges mix into a new shade.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-10">
            <ShadeSlider />
          </Reveal>
        </Container>
      </section>

      {/* Products */}
      <Wave className="text-[#f2e6e5]" />
      <section className="bg-[#f2e6e5] py-20">
        <Container>
          <Reveal>
            <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 150} className="lift rounded-3xl">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <Wave flip className="text-[#f2e6e5]" />

      {/* Trust strip */}
      <section className="py-16">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((t, i) => (
              <li key={t.title}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="flex h-full gap-4 rounded-3xl p-2">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-light text-sage-dark">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={t.icon} />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-semibold">{t.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal/65">{t.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
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
