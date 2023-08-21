'use client';

import type { Functions } from '@/lib/supabase';
import { ActivityIcon, BookMarkedIcon, LinkIcon } from 'lucide-react';
import { cloneElement, type ReactElement } from 'react';

export default function Summary({ summary }: { summary: Functions<'get_summary'> | undefined }) {
  return (
    <ul className="flex flex-col gap-4">
      <SummaryCard header="total posts" body={summary?.totalposts} icon={<BookMarkedIcon />} />
      <SummaryCard header="total sites" body={summary?.totalsites} icon={<LinkIcon />} />
      <SummaryCard header="posts this week" body={summary?.postweek} icon={<ActivityIcon />} />
    </ul>
  );
}

type Props = { header: string; body: number | undefined; icon: ReactElement };
function SummaryCard({ header, body, icon }: Props) {
  return (
    <li className="rounded bg-gradient p-px">
      <div className="flex flex-col rounded bg-black px-5 py-2.5">
        <div className="flex justify-between">
          <span className="mb-1 text-xs">{header}</span>
          {cloneElement(icon, { className: 'text-2', size: 16, 'aria-hidden': true })}
        </div>
        <strong>{body ?? '--'}</strong>
        <em className="text-xxs text-2">last updated: 08/20/2023</em>
      </div>
    </li>
  );
}
