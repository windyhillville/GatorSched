const DAY_KEYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

export function isToday(isoDateString: string, todayIsoString: string): boolean {
  return isoDateString === todayIsoString;
}

export function getDayIndex(date: string | Date): number {
  const day = typeof date === 'string' ? new Date(`${date}T00:00:00`) : new Date(date);

  return day.getDay();
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

export function getDateFromWeekStartAndIndex(weekStart: string, dayIndex: number): Date {
  const base = new Date(`${weekStart}T00:00:00`);
  const result = new Date(base);
  result.setDate(base.getDate() + dayIndex);
  return result;
}

export function formatDisplayDate(date: Date) {
  return {
    dayLabel: date.toLocaleDateString('en-US', { weekday: 'long' }),
    dateLabel: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
  };
}

export function getWeekBoundsLabel(week: string | Date) {
  const startOfWeek = typeof week === 'string' ? new Date(`${week}T00:00:00`) : new Date(week);
  const endOfWeek = typeof week === 'string' ? new Date(`${week}T00:00:00`) : new Date(week);

  endOfWeek.setDate(endOfWeek.getDate() + 6);

  return `${startOfWeek.toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })}`;
}

export function getMonthAndDayLabel(currentDay: string | Date) {
  const currentDayFormatted =
    typeof currentDay === 'string' ? new Date(`${currentDay}T00:00:00`) : new Date(currentDay);

  return `${currentDayFormatted.toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })}`;
}

export function getWeekStart(currentDate: string | Date): string {
  const date =
    typeof currentDate === 'string' ? new Date(`${currentDate}T00:00:00`) : new Date(currentDate);

  date.setDate(date.getDate() - date.getDay());

  return date.toLocaleDateString('en-CA');
}

export function getNextWeekStart(currentWeek: string | Date): string {
  const nextWeek =
    typeof currentWeek === 'string' ? new Date(`${currentWeek}T00:00:00`) : new Date(currentWeek);

  nextWeek.setDate(nextWeek.getDate() + 7);

  return nextWeek.toLocaleDateString('en-CA');
}

export function getPreviousWeekStart(currentWeek: string | Date): string {
  const previousWeek =
    typeof currentWeek === 'string' ? new Date(`${currentWeek}T00:00:00`) : new Date(currentWeek);

  previousWeek.setDate(previousWeek.getDate() - 7);

  return previousWeek.toLocaleDateString('en-CA');
}

export function getPreviousDay(currentDay: string | Date) {
  const previousDay =
    typeof currentDay === 'string' ? new Date(`${currentDay}T00:00:00`) : new Date(currentDay);

  previousDay.setDate(previousDay.getDate() - 1);

  return previousDay.toLocaleDateString('en-CA');
}

export function getNextDay(currentDay: string | Date) {
  const previousDay =
    typeof currentDay === 'string' ? new Date(`${currentDay}T00:00:00`) : new Date(currentDay);

  previousDay.setDate(previousDay.getDate() + 1);

  return previousDay.toLocaleDateString('en-CA');
}

export function getPreviousDayKey(dayKey: string) {
  const index = DAY_KEYS.indexOf(dayKey);
  return DAY_KEYS[Math.max(0, index - 1)];
}

export function getNextDayKey(dayKey: string) {
  const index = DAY_KEYS.indexOf(dayKey);
  return DAY_KEYS[Math.min(DAY_KEYS.length - 1, index + 1)];
}

export function getDayIndexFromKey(dayKey: string | null): number {
  const index = DAY_KEYS.indexOf(dayKey ?? '');
  return index >= 0 ? index : 0;
}
