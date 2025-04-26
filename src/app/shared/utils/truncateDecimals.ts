// This function truncates the decimal part of a number to the specified number of decimal places without rounding it.

export function truncateDecimals(num: number, decimalPlaces = 2): string {
  const factor = Math.pow(10, decimalPlaces);
  const truncated = Math.floor(num * factor) / factor;
  return truncated.toFixed(decimalPlaces);
}
