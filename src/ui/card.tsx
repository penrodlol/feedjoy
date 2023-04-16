'use client';

import type { Route } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props<T extends string> = {
  href: Route<T>;
  title: string;
  children: ReactNode;
};

const className = 'flex h-full flex-col gap-2 rounded bg-2 p-3 pb-4 shadow';

export default function Card<T extends string>(props: Props<T>) {
  return (
    <Link
      href={props.href}
      className={`${className} group transition-colors duration-150 ease-in-out text-xs
                  hover:bg-3 focus-visible:bg-3`}
    >
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 text-2">
        {props.children}
      </div>
      <p className="px-2 text-sm">{props.title}</p>
    </Link>
  );
}
