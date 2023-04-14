'use client';

import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLSpanElement>;

const formatter = new Intl.NumberFormat('en', { notation: 'compact' });

export default function Number({ children, ...props }: Props) {
  return <span {...props}>{formatter.format(children as number)}</span>;
}
