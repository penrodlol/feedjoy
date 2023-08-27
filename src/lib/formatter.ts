export function formatNumber(number: number) {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(number);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}
