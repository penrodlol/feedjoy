'use client';

import { ExternalLink } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

const className = 'inline-flex max-w-max items-center gap-1 hover:text-brand';

export function Anchor({ children, ...props }: Props) {
  return (
    <a
      {...props}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`text-brand hover:opacity-75 ${className} ${props.className}`}
    >
      {children} <ExternalLink className="h-4 w-4" aria-hidden />
    </a>
  );
}

export function NextAnchor<T extends string>(props: LinkProps<T>) {
  return <Link {...props} className={`${className} ${props.className}`} />;
}
