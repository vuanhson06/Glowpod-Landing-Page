import { describe, expect, it } from "vitest";
import { cartCount, cartReducer, cartSubtotal, MAX_QTY, sanitizeLines, type CartLine } from "./cartReducer";
import { isValidPhone, validateCheckout, type CheckoutValues } from "./checkout";
import { formatVND } from "./format";
import { FREE_SHIPPING_THRESHOLD, effectiveMethod, isMethodAvailable, shippingFee } from "./shipping";

const KIT = "glowpod-blend-starter-kit"; // 1,690,000
const REFILL = "foundation-base-refill-set"; // 390,000

describe("cartReducer", () => {
  it("adds a new line and merges repeat adds", () => {
    let lines: CartLine[] = [];
    lines = cartReducer(lines, { type: "add", slug: KIT });
    lines = cartReducer(lines, { type: "add", slug: KIT, qty: 2 });
    expect(lines).toEqual([{ slug: KIT, qty: 3 }]);
  });

  it("ignores unknown products", () => {
    expect(cartReducer([], { type: "add", slug: "nope" })).toEqual([]);
  });

  it("caps quantity at MAX_QTY", () => {
    const lines = cartReducer([{ slug: KIT, qty: MAX_QTY }], { type: "add", slug: KIT });
    expect(lines[0].qty).toBe(MAX_QTY);
  });

  it("setQty to 0 removes the line", () => {
    expect(cartReducer([{ slug: KIT, qty: 2 }], { type: "setQty", slug: KIT, qty: 0 })).toEqual([]);
  });

  it("removes and clears", () => {
    const lines = [
      { slug: KIT, qty: 1 },
      { slug: REFILL, qty: 1 },
    ];
    expect(cartReducer(lines, { type: "remove", slug: KIT })).toEqual([{ slug: REFILL, qty: 1 }]);
    expect(cartReducer(lines, { type: "clear" })).toEqual([]);
  });

  it("totals count and subtotal", () => {
    const lines = [
      { slug: KIT, qty: 1 },
      { slug: REFILL, qty: 2 },
    ];
    expect(cartCount(lines)).toBe(3);
    expect(cartSubtotal(lines)).toBe(1_690_000 + 780_000);
  });
});

describe("sanitizeLines", () => {
  it("keeps valid lines and drops junk", () => {
    expect(
      sanitizeLines([{ slug: KIT, qty: 99 }, { slug: "gone", qty: 1 }, { slug: KIT, qty: 1 }, "x", null]),
    ).toEqual([{ slug: KIT, qty: MAX_QTY }]);
    expect(sanitizeLines({})).toEqual([]);
  });
});

describe("shippingFee", () => {
  it("charges by city for standard delivery under the threshold", () => {
    expect(shippingFee("standard", "hcmc", 500_000)).toBe(30_000);
    expect(shippingFee("standard", "other", 500_000)).toBe(45_000);
  });

  it("makes standard delivery free at the threshold, but not express", () => {
    expect(shippingFee("standard", "hanoi", FREE_SHIPPING_THRESHOLD)).toBe(0);
    expect(shippingFee("express", "hanoi", FREE_SHIPPING_THRESHOLD)).toBe(60_000);
  });

  it("is free for an empty order", () => {
    expect(shippingFee("express", "hcmc", 0)).toBe(0);
  });

  it("falls back to standard where same-day delivery isn't offered", () => {
    expect(isMethodAvailable("express", "other")).toBe(false);
    expect(effectiveMethod("express", "other")).toBe("standard");
    expect(shippingFee("express", "other", 500_000)).toBe(45_000);
  });
});

describe("formatVND", () => {
  it("formats with Vietnamese separators and the dong sign", () => {
    expect(formatVND(3_490_000)).toMatch(/^3\.490\.000\s₫$/);
  });
});

describe("checkout validation", () => {
  const valid: CheckoutValues = {
    fullName: "Nguyen Linh",
    email: "linh@example.com",
    phone: "0901 234 567",
    street: "12 Le Loi",
    district: "District 1",
    city: "hcmc",
    shipping: "standard",
    payment: "cod",
    notes: "",
  };

  it("accepts a complete form", () => {
    expect(validateCheckout(valid)).toEqual({});
  });

  it("flags each missing or bad field", () => {
    const errors = validateCheckout({ ...valid, fullName: " ", email: "linh@", phone: "123", street: "", district: "" });
    expect(Object.keys(errors).sort()).toEqual(["district", "email", "fullName", "phone", "street"]);
  });

  it("accepts +84 and 0-prefixed numbers", () => {
    expect(isValidPhone("+84 901 234 567")).toBe(true);
    expect(isValidPhone("0901.234.567")).toBe(true);
    expect(isValidPhone("901234567")).toBe(false);
  });
});
