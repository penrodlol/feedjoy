'use client';

import * as Radix from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type ContentProps = Radix.DialogContentProps & { title: string };
type TriggerProps = Radix.DialogTriggerProps;

export function Root({ children, ...props }: Radix.DialogProps) {
  const [open, setOpen] = useState(props.open ?? false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <Radix.Root {...props} open={open} onOpenChange={setOpen}>
      {children}
    </Radix.Root>
  );
}

export function Trigger({ children, asChild, ...props }: TriggerProps) {
  return (
    <Radix.Trigger asChild {...props}>
      {children}
    </Radix.Trigger>
  );
}

export function Content({ children, title, ...props }: ContentProps) {
  return (
    <Radix.Portal>
      <Radix.Overlay className="fixed inset-0 backdrop-blur-sm" />
      <Radix.Content
        {...props}
        className={`fixed left-1/2 top-1/2 flex h-[90vh] w-[90vw] max-w-screen-sm -translate-x-1/2
                    -translate-y-1/2 flex-col gap-4 rounded border-2 border-brand border-opacity-25
                    bg-1 px-5 py-3 shadow motion-safe:animate-fade-in md:h-[70vh] ${props.className}`}
      >
        <Radix.Title className="text-lg">{title}</Radix.Title>
        <Radix.Close asChild>
          <button className="group absolute right-3 top-3" aria-label="close">
            <X className="h-5 w-5 group-hover:opacity-75" aria-hidden />
          </button>
        </Radix.Close>
        {children}
      </Radix.Content>
    </Radix.Portal>
  );
}
