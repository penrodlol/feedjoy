'use client';

import type { Functions } from '@/lib/supabase';
import Separator from '@/ui/separator';
import * as Tabs from '@/ui/tabs';

type Props = { topics: Functions<'get_top_topics'> | undefined };

export default function Topics({ topics }: Props) {
  return (
    <form className="text-xs">
      <Tabs.Root defaultValue="all">
        <Tabs.List>
          <Tabs.Trigger value="all">all time</Tabs.Trigger>
          <Tabs.Trigger value="year">past year</Tabs.Trigger>
          <Tabs.Trigger value="month">past month</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="all">
          <TabsContentList topics={topics} />
        </Tabs.Content>
        <Tabs.Content value="year">
          <TabsContentList topics={topics} />
        </Tabs.Content>
        <Tabs.Content value="month">
          <TabsContentList topics={topics} />
        </Tabs.Content>
      </Tabs.Root>
    </form>
  );
}

function TabsContentList({ topics }: Props) {
  return (
    <ul className="flex flex-col gap-1">
      {topics?.map(({ topic, count }, index) => (
        <li key={topic} className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span>{topic}</span>
            <p className="flex items-center gap-1">
              <strong>{count}</strong>
              <span className="text-2">posts</span>
            </p>
          </div>
          {index !== 7 && <Separator />}
        </li>
      ))}
    </ul>
  );
}
