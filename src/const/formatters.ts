export const numberFrmt = new Intl.NumberFormat('en-US', {
  notation: 'compact',
});

export const datetimeFrmt = new Intl.DateTimeFormat('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});
