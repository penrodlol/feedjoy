'use client';

import { ArrowUpRight } from 'lucide-react';
import { forwardRef, type ComponentPropsWithRef, type ComponentRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type AnchorElement = ComponentRef<'a'>;
export type AnchorProps = ComponentPropsWithRef<'a'>;

const Anchor = forwardRef<AnchorElement, AnchorProps>(
  ({ className, children, target, rel, ...props }: AnchorProps, ref) => (
    <a
      {...props}
      ref={ref}
      target={target ?? '_blank'}
      rel={rel ?? 'nofollow noopener noreferrer'}
      className={twMerge(
        'hover:text-emphasis flex items-center gap-1 motion-safe:transition-colors',
        className,
      )}
    >
      {children} <ArrowUpRight size={14} aria-hidden />
    </a>
  ),
);

Anchor.displayName = 'Anchor';
export default Anchor;
