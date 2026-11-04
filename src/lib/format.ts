const vnd = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

/** Formats a VND amount, e.g. 3490000 → "3.490.000 ₫". */
export function formatVND(amount: number): string {
  return vnd.format(amount);
}
