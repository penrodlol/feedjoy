'use client';

import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ComponentPropsWithRef, type ElementRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonElement = ElementRef<'button'>;
export type ButtonProps = ComponentPropsWithRef<'button'> & { asChild?: boolean };

const Button = forwardRef<ButtonElement, ButtonProps>(
  ({ className, type, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        {...props}
        ref={ref}
        type={asChild ? undefined : type ?? 'button'}
        className={twMerge(
          'inline-flex items-center justify-center gap-2 rounded border bg-1 px-3 py-1',
          'transition-colors hover:bg-2/60 hover:text-emphasis focus:outline-none',
          'disabled:pointer-events-none disabled:opacity-60',
          className,
        )}
      />
    );
  },
);

Button.displayName = 'Button';
export default Button;
