'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Route } from 'next';
import { NextAnchor } from './anchor';

type Props<T extends string> = {
  prev: Route<T>;
  next: Route<T>;
  isFirst: boolean;
  isLast: boolean;
};

export default function Paginator<T extends string>(props: Props<T>) {
  return (
    <nav className="flex justify-between">
      {!props.isFirst && (
        <NextAnchor href={props.prev} className="group flex items-center gap-1">
          <ArrowLeft className="w-5 stroke-brand" aria-hidden />
          <span className="group-hover:text-brand">previous</span>
        </NextAnchor>
      )}
      {!props.isLast && (
        <NextAnchor
          href={props.next}
          className="group ml-auto flex items-center gap-1"
        >
          <span className="group-hover:text-brand">next</span>
          <ArrowRight className="w-5 stroke-brand" aria-hidden />
        </NextAnchor>
      )}
    </nav>
  );
}
