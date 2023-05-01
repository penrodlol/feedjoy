'use client';

import Link, { type LinkProps } from 'next/link';

type Props<T extends string> = LinkProps<T> & { title: string };

export default function Card<T extends string>(props: Props<T>) {
  return (
    <Link
      {...props}
      className="group flex h-full flex-col gap-2 rounded bg-2 p-3 pb-4 shadow
                  transition-colors duration-150 ease-in-out text-xs hover:bg-3
                  focus-visible:bg-3"
    >
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 text-2">
        {props.children}
      </div>
      <p className="px-2">{props.title}</p>
    </Link>
  );
}
