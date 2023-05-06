import { action, atom } from 'nanostores';
import { searchPosts, type SearchPosts } from './action';

type Status = 'idle' | 'loading' | 'success' | 'empty';
type State = { status: Status; query: string | undefined; posts: SearchPosts };

const initial: State = { status: 'idle', query: undefined, posts: undefined };

export const store = atom<State>(initial);

export const reset = action(store, 'reset', (state) => state.set(initial));

export const search = action(store, 'search', async (state, query: string) => {
  state.set({ ...state.get(), status: 'loading' });
  const posts = await searchPosts(query);
  state.set({ status: posts?.length ? 'success' : 'empty', query, posts });
});
