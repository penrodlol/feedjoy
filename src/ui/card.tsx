'use client';

import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { forwardRef, type ComponentPropsWithRef, type ComponentRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type RootElement = ComponentRef<'a'>;
export type RootProps = LinkProps & ComponentPropsWithRef<'a'>;
export type HeaderElement = ComponentRef<'div'>;
export type HeaderProps = ComponentPropsWithRef<'div'>;
export type BodyElement = ComponentRef<'div'>;
export type BodyProps = ComponentPropsWithRef<'div'>;

export const Root = forwardRef<RootElement, RootProps>(({ className, children, ...props }, ref) => {
  return (
    <Link
      {...props}
      ref={ref}
      className={twMerge(
        'group relative block h-full rounded bg-1 p-px before:absolute before:content-[""]',
        'before:inset-0 before:rounded before:bg-gradient before:transition-opacity',
        'before:opacity-0 before:duration-150 hover:before:opacity-100 focus-visible:outline-none',
        'focus-visible:ring-1 focus-visible:ring-offset-2',
        className,
      )}
    >
      <div className="relative z-30 h-full rounded bg-1 p-3">{children}</div>
    </Link>
  );
});

export const Header = forwardRef<HeaderElement, HeaderProps>((props, ref) => {
  return (
    <div {...props} ref={ref} className="flex items-center justify-between !text-xxs text-2" />
  );
});

export const Body = forwardRef<BodyElement, BodyProps>((props, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className="px-1 py-3 text-xs transition-colors group-hover:text-emphasis"
    />
  );
});

Root.displayName = 'Root';
Header.displayName = 'Header';
Body.displayName = 'Body';
