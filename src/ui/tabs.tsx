'use client';

import * as Radix from '@radix-ui/react-tabs';
import { forwardRef, type ComponentPropsWithRef, type ComponentRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type RootElement = ComponentRef<typeof Radix.Root>;
export type RootProps = ComponentPropsWithRef<typeof Radix.Root>;
export type ListElement = ComponentRef<typeof Radix.List>;
export type ListProps = ComponentPropsWithRef<typeof Radix.List>;
export type TriggerElement = ComponentRef<typeof Radix.Trigger>;
export type TriggerProps = ComponentPropsWithRef<typeof Radix.Trigger>;
export type ContentElement = ComponentRef<typeof Radix.Content>;
export type ContentProps = ComponentPropsWithRef<typeof Radix.Content>;

export const Root = forwardRef<RootElement, RootProps>(({ className, children, ...props }, ref) => (
  <Radix.Root {...props} ref={ref} className={twMerge('rounded bg-gradient p-px', className)}>
    <div className="rounded bg-black">{children}</div>
  </Radix.Root>
));

export const List = forwardRef<ListElement, ListProps>(({ className, ...props }, ref) => (
  <Radix.List
    {...props}
    ref={ref}
    className={twMerge('flex justify-between rounded-t border-b p-1.5', className)}
  />
));

export const Trigger = forwardRef<TriggerElement, TriggerProps>(({ className, ...props }, ref) => (
  <Radix.Trigger
    {...props}
    ref={ref}
    className={twMerge(
      'flex-1 select-none rounded border p-0.5 transition-colors hover:text-emphasis',
      'data-[state="inactive"]:border-transparent data-[state="active"]:bg-1',
      'data-[state="active"]:text-emphasis focus-visible:outline-none',
      'focus-visible:ring-1 focus-visible:ring-offset-2',
      className,
    )}
  />
));

export const Content = forwardRef<ContentElement, ContentProps>(({ className, ...props }, ref) => (
  <Radix.Content
    {...props}
    ref={ref}
    className={twMerge(
      'rounded px-5 py-3 focus-visible:outline-none',
      'focus-visible:ring-1 focus-visible:ring-offset-2',
      className,
    )}
  />
));

Root.displayName = Radix.Root.displayName;
List.displayName = Radix.List.displayName;
Trigger.displayName = Radix.Trigger.displayName;
Content.displayName = Radix.Content.displayName;
