'use client';

import * as Radix from '@radix-ui/react-tabs';

export const Root = Radix.Root;
export const Content = Radix.TabsContent;

export function Triggers({ children, ...props }: Radix.TabsListProps) {
  return (
    <div className="mb-8">
      <Radix.TabsList {...props} className="flex justify-between gap-1">
        {children}
      </Radix.TabsList>
      <div className="h-0.5 w-full rounded bg-3" />
    </div>
  );
}

export function Trigger({ children, ...props }: Radix.TabsTriggerProps) {
  return (
    <Radix.TabsTrigger
      {...props}
      className="flex-1 rounded p-1 text-2 transition-colors hover:bg-2 
                 hover:text-1 data-[state='active']:bg-2 
                 data-[state='active']:text-1"
    >
      {children}
    </Radix.TabsTrigger>
  );
}
