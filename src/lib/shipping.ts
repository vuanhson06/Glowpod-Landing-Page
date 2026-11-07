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
  /** A city missing from `fee` and `days` can't use this method. */
  fee: Partial<Record<City, number>>;
  days: Partial<Record<City, string>>;
  freeOverThreshold: boolean;
};

export const SHIPPING_METHODS: Method[] = [
  {
    id: "standard",
    name: "Standard delivery",
    fee: { hcmc: 30_000, hanoi: 30_000, other: 45_000 },
    days: { hcmc: "2–3 days", hanoi: "2–3 days", other: "2–3 days" },
    freeOverThreshold: true,
  },
  {
    // Kept as "express" so orders saved under the old name still load.
    id: "express",
    name: "Same-day delivery",
    fee: { hcmc: 60_000, hanoi: 60_000 },
    days: { hcmc: "Same day", hanoi: "Same day" },
    freeOverThreshold: false,
  },
];

export function getShippingMethod(id: ShippingMethodId): Method {
  const method = SHIPPING_METHODS.find((m) => m.id === id);
  if (!method) throw new Error(`Unknown shipping method: ${id}`);
  return method;
}

export function isMethodAvailable(id: ShippingMethodId, city: City): boolean {
  return getShippingMethod(id).fee[city] !== undefined;
}

/** The chosen method, or standard delivery if the chosen one doesn't reach this city. */
export function effectiveMethod(id: ShippingMethodId, city: City): ShippingMethodId {
  return isMethodAvailable(id, city) ? id : "standard";
}

/** Shipping fee in VND. An empty order costs nothing to ship. */
export function shippingFee(methodId: ShippingMethodId, city: City, subtotal: number): number {
  if (subtotal <= 0) return 0;
  const method = getShippingMethod(effectiveMethod(methodId, city));
  if (method.freeOverThreshold && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return method.fee[city] ?? 0;
}
