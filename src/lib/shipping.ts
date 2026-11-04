// Draft delivery rules, shared by checkout, the cart estimate and the Shipping page.

export type City = "hcmc" | "hanoi" | "other";
export type ShippingMethodId = "standard" | "express";

export const CITIES: { id: City; name: string }[] = [
  { id: "hcmc", name: "Ho Chi Minh City" },
  { id: "hanoi", name: "Hanoi" },
  { id: "other", name: "Other province" },
];

export const FREE_SHIPPING_THRESHOLD = 1_000_000;

type Method = {
  id: ShippingMethodId;
  name: string;
  fee: Record<City, number>;
  days: Record<City, string>;
  freeOverThreshold: boolean;
};

export const SHIPPING_METHODS: Method[] = [
  {
    id: "standard",
    name: "Standard delivery",
    fee: { hcmc: 30_000, hanoi: 30_000, other: 45_000 },
    days: { hcmc: "2–3 working days", hanoi: "2–3 working days", other: "3–5 working days" },
    freeOverThreshold: true,
  },
  {
    id: "express",
    name: "Express delivery",
    fee: { hcmc: 60_000, hanoi: 60_000, other: 90_000 },
    days: { hcmc: "Next working day", hanoi: "Next working day", other: "2–3 working days" },
    freeOverThreshold: false,
  },
];

export function getShippingMethod(id: ShippingMethodId): Method {
  const method = SHIPPING_METHODS.find((m) => m.id === id);
  if (!method) throw new Error(`Unknown shipping method: ${id}`);
  return method;
}

/** Shipping fee in VND. An empty order costs nothing to ship. */
export function shippingFee(methodId: ShippingMethodId, city: City, subtotal: number): number {
  if (subtotal <= 0) return 0;
  const method = getShippingMethod(methodId);
  if (method.freeOverThreshold && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return method.fee[city];
}
