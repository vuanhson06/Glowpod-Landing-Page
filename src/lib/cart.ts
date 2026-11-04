"use client";

import { useSyncExternalStore } from "react";
import { getProduct, type Product } from "@/data/products";
import { cartCount, cartReducer, cartSubtotal, sanitizeLines, type CartAction, type CartLine } from "./cartReducer";

// The cart lives in localStorage and is shared through a tiny external store,
// so every component (header badge, cart page, checkout) sees the same lines
// and the server render always starts from an empty cart.

const STORAGE_KEY = "glowpod-cart-v1";
const EMPTY: CartLine[] = [];
const listeners = new Set<() => void>();
let cache: CartLine[] | null = null;

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeLines(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): CartLine[] {
  if (cache === null) cache = readStorage();
  return cache;
}

function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = null; // another tab changed the cart
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function dispatchCart(action: CartAction) {
  cache = cartReducer(getSnapshot(), action);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Storage blocked (private mode etc.): the cart still works for this page view.
  }
  listeners.forEach((l) => l());
}

export type CartItem = CartLine & { product: Product };

export function useCart() {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items: CartItem[] = lines.flatMap((l) => {
    const product = getProduct(l.slug);
    return product ? [{ ...l, product }] : [];
  });
  return {
    items,
    count: cartCount(lines),
    subtotal: cartSubtotal(lines),
    add: (slug: string, qty = 1) => dispatchCart({ type: "add", slug, qty }),
    setQty: (slug: string, qty: number) => dispatchCart({ type: "setQty", slug, qty }),
    remove: (slug: string) => dispatchCart({ type: "remove", slug }),
    clear: () => dispatchCart({ type: "clear" }),
  };
}

const noopSubscribe = () => () => {};

/** False during the server render and hydration, true afterwards. Use it to avoid flashing "empty cart". */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
