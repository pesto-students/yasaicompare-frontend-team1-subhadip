export function formatPrice(
  value = 0,
  opts = { locale: "en-IN", currency: "INR" }
) {
  const { locale, currency } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}
