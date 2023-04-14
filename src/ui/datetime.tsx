'use client';

const formatter = new Intl.DateTimeFormat('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});

export default function Datetime({ children }: { children: string }) {
  const datetime = new Date(children);

  return (
    <time dateTime={datetime.toISOString()}>{formatter.format(datetime)}</time>
  );
}
