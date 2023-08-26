'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { forwardRef, type ComponentPropsWithRef, type ComponentRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type AnchorElement = ComponentRef<'a'>;
export type AnchorProps = ComponentPropsWithRef<'a'>;
export type NextAnchorElement = ComponentRef<typeof Link>;
export type NextAnchorProps = ComponentPropsWithRef<typeof Link>;

const baseClassName =
  'inline-flex items-center gap-1 rounded motion-safe:transition-colors ' +
  'hover:text-emphasis focus-visible:outline-none focus-visible:ring-1 ' +
  'focus-visible:ring-offset-2';

export const Anchor = forwardRef<AnchorElement, AnchorProps>(
  ({ className, children, target, rel, ...props }: AnchorProps, ref) => (
    <a
      {...props}
      ref={ref}
      target={target ?? '_blank'}
      rel={rel ?? 'nofollow noopener noreferrer'}
      className={twMerge(baseClassName, className)}
    >
      {children} <ArrowUpRight size={14} data-external-icon aria-hidden />
    </a>
  ),
);

export const NextAnchor = forwardRef<NextAnchorElement, NextAnchorProps>(
  ({ className, ...props }, ref) => (
    <Link {...props} ref={ref} className={twMerge(baseClassName, className)} />
  ),
);

Anchor.displayName = 'Anchor';
NextAnchor.displayName = Link.displayName;
