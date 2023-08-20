'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { forwardRef, type ComponentPropsWithRef, type ComponentRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type AnchorElement = ComponentRef<'a'>;
export type AnchorProps = ComponentPropsWithRef<'a'>;
export type NextAnchorElement = ComponentRef<typeof Link>;
export type NextAnchorProps = ComponentPropsWithRef<typeof Link>;

const baseClassName = 'flex items-center gap-1 hover:text-emphasis motion-safe:transition-colors';

export const Anchor = forwardRef<AnchorElement, AnchorProps>(
  ({ className, children, target, rel, ...props }: AnchorProps, ref) => (
    <a
      {...props}
      ref={ref}
      target={target ?? '_blank'}
      rel={rel ?? 'nofollow noopener noreferrer'}
      className={twMerge(baseClassName, className)}
    >
      {children} <ArrowUpRight size={14} aria-hidden />
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
