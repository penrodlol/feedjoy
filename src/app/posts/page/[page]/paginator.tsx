'use client';

import Button from '@/ui/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type Props = { page: number; total: number };

export function Paginator({ page, total }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = useMemo(() => Math.ceil(total / 30), [total]);

  return (
    <nav className="flex items-center gap-2 text-xs">
      <span className="mr-8">
        page {page} of {totalPages}
      </span>
      <Button
        aria-label="first page"
        disabled={page === 1}
        onClick={() => router.push(`/posts/page/1?${searchParams}`)}
      >
        <ChevronsLeftIcon size={16} aria-hidden />
      </Button>
      <Button
        aria-label="previous page"
        disabled={page === 1}
        onClick={() => router.push(`/posts/page/${page - 1}?${searchParams}`)}
      >
        <ChevronLeftIcon size={16} aria-hidden />
      </Button>
      <Button
        aria-label="next page"
        disabled={page === totalPages}
        onClick={() => router.push(`/posts/page/${page + 1}?${searchParams}`)}
      >
        <ChevronRightIcon size={16} aria-hidden />
      </Button>
      <Button
        aria-label="last page"
        disabled={page === totalPages}
        onClick={() => router.push(`/posts/page/${totalPages}?${searchParams}`)}
      >
        <ChevronsRightIcon size={16} aria-hidden />
      </Button>
    </nav>
  );
}
