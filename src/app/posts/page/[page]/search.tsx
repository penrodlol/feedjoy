'use client';

import { useSearchParams } from '@/lib/params';
import { stringSchema } from '@/lib/schema';
import * as TextField from '@/ui/textfield';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const resolve = zodResolver(z.object({ post: stringSchema }));

export default function Search({ post }: { post: string | undefined }) {
  const searchParams = useSearchParams();
  const form = useForm({ resolver: resolve, defaultValues: { post: post ?? '' } });

  const onSubmit = form.handleSubmit((data) => {
    if (post === data.post) return;
    else if (data.post === '') searchParams.remove('post', '/posts/page/1');
    else searchParams.add('post', data.post, '/posts/page/1');
  });

  const onReset = () => {
    form.reset({ post: '' });
    searchParams.remove('post', '/posts/page/1');
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField.Root>
        <TextField.Icon>
          <SearchIcon size={12} aria-hidden />
        </TextField.Icon>
        <TextField.Input placeholder="search posts" {...form.register('post')} />
        <TextField.Reset
          type="reset"
          disabled={!post && !form.formState.isDirty}
          onClick={onReset}
        />
      </TextField.Root>
    </form>
  );
}
