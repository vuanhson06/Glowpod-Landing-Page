import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = { title: "You’re on the list", robots: { index: false } };

export default function SubscribedPage() {
  return (
    <Container className="pt-12 text-center sm:pt-20">
      <div className="anim-fade-up mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-light text-sage-dark">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      </div>
      <h1 className="anim-fade-up mt-6 text-4xl font-semibold tracking-tight" style={{ animationDelay: "120ms" }}>
        Thanks for signing up!
      </h1>
      <p
        className="anim-fade-up mx-auto mt-4 max-w-xl text-lg leading-relaxed text-charcoal/70"
        style={{ animationDelay: "240ms" }}
      >
        Email updates aren’t switched on yet, so you won’t get anything from us for now. Once they are, the list is
        for launch news and shade tips.
      </p>
      <div className="anim-fade-up mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: "360ms" }}>
        <ButtonLink href="/shop">Shop GlowPod</ButtonLink>
        <ButtonLink href="/blog" variant="outline">
          Read the blog
        </ButtonLink>
      </div>
    </Container>
  );
}
