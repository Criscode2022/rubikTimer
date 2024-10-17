// This function will truncate the decimal part of a number to two decimal places without rounding it.

export function truncateDecimals(num: number, decimalPlaces: number = 2) {
  if (decimalPlaces === 1) {
    return Math.floor(num * 10) / 10;
  }

  return Math.floor(num * 100) / 100;
}
