import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <Container>
      <PageHeader title="Checkout" />
      <CheckoutForm />
    </Container>
  );
}
