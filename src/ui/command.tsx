'use client';

import { Command as Cmdk } from 'cmdk';
import { CheckIcon, SearchIcon } from 'lucide-react';
import { forwardRef, type ComponentPropsWithRef, type ElementRef } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

export type RootElement = ElementRef<typeof Cmdk>;
export type RootProps = ComponentPropsWithRef<typeof Cmdk>;
export type InputElement = ElementRef<typeof Cmdk.Input>;
export type InputProps = ComponentPropsWithRef<typeof Cmdk.Input>;
export type ListElement = ElementRef<typeof Cmdk.List>;
export type ListProps = ComponentPropsWithRef<typeof Cmdk.List>;
export type ItemElement = ElementRef<typeof Cmdk.Item>;
export type ItemProps = ComponentPropsWithRef<typeof Cmdk.Item> & { selected?: boolean };

export const Root = forwardRef<RootElement, RootProps>(({ className, loop, ...props }, ref) => (
  <Cmdk
    {...props}
    ref={ref}
    loop={loop ?? true}
    className={twMerge('flex flex-col gap-4', className)}
  />
));

export const Input = forwardRef<InputElement, InputProps>(({ className, ...props }, ref) => (
  <div className="relative rounded border bg-1">
    <SearchIcon
      aria-hidden
      size={14}
      className="absolute left-2 top-1/2 z-10 shrink-0 -translate-y-1/2 text-2/50"
    />
    <Cmdk.Input
      {...props}
      ref={ref}
      className={twMerge(
        'relative z-20 shrink-0 rounded bg-transparent py-0.5 pl-7 pr-2',
        'placeholder:text-2/80 focus:outline-none focus-visible:ring',
        className,
      )}
    />
  </div>
));

export const List = forwardRef<ListElement, ListProps>(({ children, ...props }, ref) => (
  <Cmdk.List {...props} ref={ref}>
    <Cmdk.Empty className="text-center">no results</Cmdk.Empty>
    {children}
  </Cmdk.List>
));

export const Item = forwardRef<ItemElement, ItemProps>(
  ({ className, children, selected, ...props }, ref) => (
    <Cmdk.Item
      {...props}
      ref={ref}
      className={twMerge(
        'group select-none  rounded p-px data-[selected=true]:bg-gradient',
        className,
      )}
    >
      <div
        className={twJoin(
          'flex items-center justify-between rounded px-1',
          'group-data-[selected=true]:text-emphasis group-data-[selected=true]:bg-1',
        )}
      >
        {children}
        {selected && <CheckIcon size={14} aria-hidden />}
      </div>
    </Cmdk.Item>
  ),
);

Root.displayName = Cmdk.displayName;
Input.displayName = Cmdk.Input.displayName;
List.displayName = Cmdk.List.displayName;
Item.displayName = Cmdk.Item.displayName;
