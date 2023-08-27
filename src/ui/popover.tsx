'use client';

import * as Radix from '@radix-ui/react-popover';
import { forwardRef, type ComponentPropsWithRef, type ElementRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ContentElement = ElementRef<typeof Radix.Content>;
export type ContentProps = ComponentPropsWithRef<typeof Radix.Content>;

export const Root = Radix.Root;
export const Trigger = Radix.Trigger;

export const Content = forwardRef<ContentElement, ContentProps>(
  ({ className, children, align, sideOffset, ...props }, ref) => (
    <Radix.Portal>
      <Radix.Content
        {...props}
        ref={ref}
        align={align ?? 'center'}
        sideOffset={sideOffset ?? 5}
        className={twMerge('z-50 rounded bg-gradient p-px text-xs', className)}
      >
        <div className="rounded bg-black p-3">{children}</div>
      </Radix.Content>
    </Radix.Portal>
  ),
);

Content.displayName = Radix.Content.displayName;
