export function currencyConversion(number: number) {
  return number.toLocaleString("us-US", {
    style: "currency",
    currency: "USD",
  })
}