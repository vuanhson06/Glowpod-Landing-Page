import type { CheckoutValues } from "./checkout";

export type Order = {
  id: string;
  createdAt: string;
  customer: CheckoutValues;
  items: { slug: string; name: string; price: number; qty: number }[];
  subtotal: number;
  shippingFee: number;
  total: number;
};

const ORDER_KEY = "glowpod-last-order";

export function newOrderId(): string {
  return "GP-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function saveLastOrder(order: Order) {
  try {
    window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {
    // Ignore: the thank-you page falls back to a generic message.
  }
}

export function readLastOrder(): Order | null {
  try {
    const raw = window.sessionStorage.getItem(ORDER_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}
