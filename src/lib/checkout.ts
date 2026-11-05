import type { City, ShippingMethodId } from "./shipping";

export type PaymentMethod = "cod" | "card" | "ewallet";

export const PAYMENT_METHODS: { id: PaymentMethod; name: string; note: string }[] = [
  { id: "cod", name: "Cash on delivery", note: "Pay the courier when your order arrives." },
  { id: "card", name: "Bank card", note: "Online card payment isn’t open yet. No card details are collected." },
  { id: "ewallet", name: "E-wallet", note: "E-wallet payment isn’t open yet. No payment is taken." },
];

export type CheckoutValues = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  district: string;
  city: City;
  shipping: ShippingMethodId;
  payment: PaymentMethod;
  notes: string;
};

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL.test(email.trim());
}

/** Vietnamese mobile numbers: 0xxxxxxxxx or +84xxxxxxxxx (spaces, dots and dashes allowed). */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[\s.-]/g, "");
  return /^(0|\+84)\d{9}$/.test(digits);
}

export function validateCheckout(v: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (v.fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (!isValidEmail(v.email)) errors.email = "Enter a valid email address, like linh@example.com.";
  if (!isValidPhone(v.phone)) errors.phone = "Enter a Vietnamese phone number, like 0901 234 567.";
  if (v.street.trim().length < 3) errors.street = "Enter your street address.";
  if (!v.district.trim()) errors.district = "Enter your district.";
  return errors;
}
