// This function will truncate the decimal part of a number to two decimal places without rounding it.

export function truncateDecimals(num: number, decimalPlaces = 2): number {
  if (decimalPlaces === 1) {
    return Math.floor(num * 10) / 10;
  }

  return Math.floor(num * 100) / 100;
}
