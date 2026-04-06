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
