export function calculateAverage(times: number[]): number {
  if (times.includes(0)) {
    return 0;
  }

  const sum: number = times.reduce(
    (accumulator: number, time: number) => accumulator + time,
    0
  );

  const avg = sum / times.length;

  return avg;
}
