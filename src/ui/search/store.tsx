import type { Post, Site } from '@/lib/supabase';
import { action, atom } from 'nanostores';

type Status = 'loading' | 'pristine' | 'empty' | 'success' | 'error';
type PartialPost = Pick<Post, 'title' | 'slug' | 'pub_date'>;
type PartialSite = Pick<Site, 'name' | 'slug'>;
type Posts = Array<PartialPost & { site: PartialSite }>;

export type State = { status: Status; posts: Posts };

export const initial: State = { status: 'pristine', posts: [] };
export const store = atom<State>(initial);

export const reset = action(store, 'reset', (state) => state.set(initial));

export const search = action(store, 'search', async (state, body: FormData) => {
  state.set({ ...state.get(), status: 'loading' });

  await fetch('/api/search', { method: 'POST', body })
    .then(async (res) => {
      const { posts } = await res.json();
      const status = !posts.length ? 'empty' : 'success';
      state.set({ status, posts });
    })
    .catch(() => state.set({ ...state.get(), status: 'error' }));
});
