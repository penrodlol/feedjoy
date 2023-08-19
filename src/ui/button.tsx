'use client';

import { forwardRef, type ComponentPropsWithRef, type ElementRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonElement = ElementRef<'button'>;
export type ButtonProps = ComponentPropsWithRef<'button'>;

const Button = forwardRef<ButtonElement, ButtonProps>(({ className, type, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    type={type ?? 'button'}
    className={twMerge(
      'flex items-center gap-2 rounded border bg-1 px-3 py-1',
      'transition-colors hover:bg-2/60 focus:outline-none',
      className,
    )}
  />
));

Button.displayName = 'Button';
export default Button;
