import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints, fetcher1 } from '~/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetPosts() {
    const url = import.meta.env.VITE_SERVER_BE_URL + endpoints.post.list;

    const { data, isLoading, error, isValidating } = useSWR(url, fetcher1, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            posts: data?.data?.data || [],
            postsLoading: isLoading,
            postsError: error,
            postsValidating: isValidating,
            postsEmpty: !isLoading && !data?.data?.data.length,
        }),
        [data?.data?.data, error, isLoading, isValidating],
    );

    return memoizedValue;
}

export function useGetPost(title) {
    const url = import.meta.env.VITE_SERVER_BE_URL + endpoints.post.list + '/' + title;

    const { data, isLoading, error, isValidating } = useSWR(url, fetcher1, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            post: data?.data,
            postLoading: isLoading,
            postError: error,
            postValidating: isValidating,
        }),
        [data, error, isLoading, isValidating],
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLatestPosts(title) {
    const url = title ? [endpoints.post.latest, { params: { title } }] : '';

    const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            latestPosts: data?.latestPosts || [],
            latestPostsLoading: isLoading,
            latestPostsError: error,
            latestPostsValidating: isValidating,
            latestPostsEmpty: !isLoading && !data?.latestPosts.length,
        }),
        [data?.latestPosts, error, isLoading, isValidating],
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchPosts(query) {
    const url = query ? [endpoints.post.search, { params: { query } }] : '';

    const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
        ...swrOptions,
        keepPreviousData: true,
    });

    const memoizedValue = useMemo(
        () => ({
            searchResults: data?.results || [],
            searchLoading: isLoading,
            searchError: error,
            searchValidating: isValidating,
            searchEmpty: !isLoading && !data?.results.length,
        }),
        [data?.results, error, isLoading, isValidating],
    );

    return memoizedValue;
}
