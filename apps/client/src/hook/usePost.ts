import swr from 'swr';
import { AxiosError } from 'axios';

import { getFetcher } from '@/lib/fetch';
import { PostResponse } from '@repo/schema';

const url = 'http://localhost:8080/api/posts';

const fetcher = async (url: string) => {
  try {
    const res = await getFetcher<PostResponse>(url);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export function usePost() {
  const { data: postData, error } = swr(url, fetcher, {
    onSuccess: (data) => {
      console.log('success', data);
    },
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (retryCount > 1) return;
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) return;
      }
      if (error.response?.status === 404) return;

      console.log('retry', error);
    },
    shouldRetryOnError: true,
    // dev
    errorRetryInterval: 2000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { postData, error };
}
