import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <Container>
      <PageHeader title="Your cart" />
      <CartView />
    </Container>
  );
}
