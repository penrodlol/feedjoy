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
    if (site === selected) onClear();
    else {
      setOpen(false);
      setSelected(site);
      searchParams.add('site', site, '/posts/page/1');
    }
  };

  const onClear = () => {
    setOpen(false);
    setSelected(undefined);
    searchParams.remove('site', '/posts/page/1');
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button className="justify-between sm:w-52" role="combobox" aria-expanded={open}>
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
          <Button disabled={!selected} onClick={onClear}>
            clear
          </Button>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  );
}
