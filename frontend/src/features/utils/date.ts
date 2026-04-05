export function getDayLabelFromIsoDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  const labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  return labels[date.getDay()];
}
