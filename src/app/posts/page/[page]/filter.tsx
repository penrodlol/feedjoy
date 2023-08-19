'use client';

import { useSearchParams } from '@/lib/params';
import Button from '@/ui/button';
import * as Command from '@/ui/command';
import * as Popover from '@/ui/popover';
import { FilterIcon } from 'lucide-react';
import { useState } from 'react';

type Props = { site: string | undefined; sites: Array<string> };

export default function Filter({ site, sites }: Props) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(site);

  const onSelect = (site: string) => {
    setOpen(false);

    if (site === selected) {
      setSelected(undefined);
      searchParams.remove('site', '/posts/page/1');
    } else {
      setSelected(site);
      searchParams.add('site', site, '/posts/page/1');
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button className="w-52 justify-between" role="combobox" aria-expanded={open}>
          {selected ?? 'filter by site'}
          <FilterIcon size={14} aria-hidden />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Command.Root>
          <Command.Input placeholder="search sites" />
          <Command.List>
            {sites.map((site) => (
              <Command.Item key={site} selected={selected === site} onSelect={() => onSelect(site)}>
                {site}
              </Command.Item>
            ))}
          </Command.List>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  );
}
