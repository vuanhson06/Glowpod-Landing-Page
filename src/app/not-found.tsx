import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold tracking-wide text-rose-dark uppercase">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">We couldn’t find that page</h1>
      <p className="mt-3 text-charcoal/70">The link may be old, or the page may have moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Visit the shop
        </ButtonLink>
      </div>
    </Container>
  );
}
