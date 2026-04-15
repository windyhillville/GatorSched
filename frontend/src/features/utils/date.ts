export function getShortDayLabelFromIsoDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  const labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  return labels[date.getDay()];
}

export function getLongDayLabelFromIsoDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return labels[date.getDay()];
}

export function isToday(isoDateString: string, todayDate: Date): boolean {
  const todayISO = todayDate.toISOString().split('T')[0];
  return isoDateString === todayISO;
}

export function getDateFromDayKey(weekStart: string, dayKey: string): string {
  const base = new Date(weekStart); // Sunday

  const dayIndexMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const offset = dayIndexMap[dayKey] ?? 0;

  const result = new Date(base);
  result.setDate(base.getDate() + offset);

  return result.toISOString().split('T')[0]; // "YYYY-MM-DD"
}
