import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints, fetcher1 } from '~/utils/axios';

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

export function useGetList() {
    const url = import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.cards + '/up-next';

    const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher1, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            list: data?.data?.data || [],
            meta: data?.data?.meta,
            listLoading: isLoading,
            listError: error,
            listValidating: isValidating,
            listEmpty: !isLoading && !data?.data?.data?.length, // Sửa lại path
            mutateList: mutate, // Thêm mutate function
        }),
        [data?.data, error, isLoading, isValidating, mutate],
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchList(query) {
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
