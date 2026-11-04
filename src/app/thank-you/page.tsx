import type { Metadata } from "next";
import { ThankYouView } from "@/components/ThankYouView";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function ThankYouPage() {
  return (
    <Container className="pt-12 sm:pt-16">
      <ThankYouView />
    </Container>
  );
}
