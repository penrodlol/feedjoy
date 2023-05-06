import { action, atom } from 'nanostores';
import { searchPosts, type SearchPosts } from './action';

type Status = 'idle' | 'loading' | 'success' | 'empty';
type State = { status: Status; posts: SearchPosts };

const initial: State = { status: 'idle', posts: undefined };
export const store = atom<State>(initial);

export const reset = action(store, 'reset', (state) => state.set(initial));

export const search = action(store, 'search', async (state, form: FormData) => {
  state.set({ status: 'loading', posts: undefined });
  const posts = await searchPosts(form);
  state.set({ status: posts?.length ? 'success' : 'empty', posts });
});
