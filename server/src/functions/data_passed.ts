export function getDaysPassed(date: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Calcula a diferença em dias
  const diffDays = Math.round(Math.abs((today.getTime() - date.getTime()) / oneDay));
  return diffDays;
}