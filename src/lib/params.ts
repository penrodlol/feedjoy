import { useSearchParams as useNextSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useSearchParams() {
  const router = useRouter();
  const nextSearchParams = useNextSearchParams();

  const add = useCallback(
    (key: string, value: string, route: string) => {
      const params = new URLSearchParams(nextSearchParams.toString());
      if (params.has(key)) params.delete(key);
      params.append(key, value);
      router.push(`${route}?${params.toString()}`);
    },
    [nextSearchParams, router],
  );

  const remove = useCallback(
    (key: string, route: string) => {
      const params = new URLSearchParams(nextSearchParams.toString());
      params.delete(key);
      router.push(`${route}?${params.toString()}`);
    },
    [nextSearchParams, router],
  );

  const removeAll = useCallback(
    (route: string) => {
      const params = new URLSearchParams(nextSearchParams.toString());
      params.forEach((_, key) => params.delete(key));
      router.push(route);
    },
    [nextSearchParams, router],
  );

  return { add, remove, removeAll };
}
