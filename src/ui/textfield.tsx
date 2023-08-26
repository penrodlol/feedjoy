'use client';

import { X } from 'lucide-react';
import { forwardRef, type ComponentPropsWithRef, type ComponentRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type RootElement = ComponentRef<'div'>;
export type RootProps = ComponentPropsWithRef<'div'>;
export type IconElement = ComponentRef<'div'>;
export type IconProps = ComponentPropsWithRef<'div'>;
export type InputElement = ComponentRef<'input'>;
export type InputProps = ComponentPropsWithRef<'input'>;
export type ResetElement = ComponentRef<'button'>;
export type ResetProps = ComponentPropsWithRef<'button'>;

export const Root = forwardRef<RootElement, RootProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge('relative flex justify-between rounded border bg-1', className)}
      {...props}
    />
  );
});

export const Icon = forwardRef<IconElement, IconProps>(({ className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      data-icon
      className={twMerge(
        'peer absolute left-2 top-1/2 z-10 shrink-0 -translate-y-1/2 transform text-2/50',
        className,
      )}
    />
  );
});

export const Input = forwardRef<InputElement, InputProps>(
  ({ className, type, spellCheck, autoComplete, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type ?? 'text'}
        spellCheck={spellCheck ?? false}
        autoComplete={autoComplete ?? 'off'}
        className={twMerge(
          'relative z-20 flex-1 shrink-0 rounded bg-transparent px-3 py-1',
          'placeholder:text-2/80 focus-visible:outline-none focus-visible:ring-1',
          'peer-data-[icon=true]:pl-7 disabled:opacity-40',
          className,
        )}
        {...props}
      />
    );
  },
);

export const Reset = forwardRef<ResetElement, ResetProps>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={twMerge(
        'shrink-0 rounded border-l bg-2/60 px-2 transition-colors hover:bg-2',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <X size={14} aria-hidden />
    </button>
  );
});

Root.displayName = 'Root';
Icon.displayName = 'Icon';
Input.displayName = 'Input';
Reset.displayName = 'Reset';
