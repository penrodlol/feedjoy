'use client';

import { ChevronRight } from 'lucide-react';
import type { Route } from 'next';
import { NextAnchor } from './anchor';

type Routes<T extends string> = Array<{ href: Route<T>; name: string }>;
type Props<T extends string> = { routes: Routes<T> };

export default function Breadcrumbs<T extends string>(props: Props<T>) {
  return (
    <nav className="text-xs">
      <ol className="flex items-center gap-2">
        <li className="flex items-center gap-1">
          <NextAnchor href="/">home</NextAnchor>
          <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
        </li>
        {props.routes.map(({ href, name }, index) => (
          <li key={name} className="flex items-center gap-1">
            <NextAnchor href={href}>{name}</NextAnchor>
            {index !== props.routes.length - 1 && (
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
