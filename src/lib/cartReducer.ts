import { getProduct } from "@/data/products";

export type CartLine = { slug: string; qty: number };

export type CartAction =
  | { type: "add"; slug: string; qty?: number }
  | { type: "setQty"; slug: string; qty: number }
  | { type: "remove"; slug: string }
  | { type: "clear" };

export const MAX_QTY = 10;

function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.floor(qty)));
}

export function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "add": {
      if (!getProduct(action.slug)) return lines;
      const addQty = clampQty(action.qty ?? 1);
      const existing = lines.find((l) => l.slug === action.slug);
      if (!existing) return [...lines, { slug: action.slug, qty: addQty }];
      return lines.map((l) => (l.slug === action.slug ? { ...l, qty: clampQty(l.qty + addQty) } : l));
    }
    case "setQty":
      if (action.qty <= 0) return lines.filter((l) => l.slug !== action.slug);
      return lines.map((l) => (l.slug === action.slug ? { ...l, qty: clampQty(action.qty) } : l));
    case "remove":
      return lines.filter((l) => l.slug !== action.slug);
    case "clear":
      return [];
  }
}

/** Drops unknown products and bad quantities from data read back from storage. */
export function sanitizeLines(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  const result: CartLine[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const { slug, qty } = item as Record<string, unknown>;
    if (typeof slug !== "string" || typeof qty !== "number" || !getProduct(slug)) continue;
    if (result.some((l) => l.slug === slug)) continue;
    result.push({ slug, qty: clampQty(qty) });
  }
  return result;
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
}
