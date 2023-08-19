'use client';

import * as Radix from '@radix-ui/react-separator';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type SeparatorElement = ElementRef<typeof Radix.Root>;
export type SeparatorProps = ComponentPropsWithoutRef<typeof Radix.Root>;

const Separator = forwardRef<SeparatorElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <Radix.Root
      {...props}
      orientation={orientation}
      decorative={decorative}
      className={twMerge(
        'shrink-0 rounded bg-2',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className,
      )}
      ref={ref}
    />
  ),
);

Separator.displayName = Radix.Root.displayName;
export default Separator;
