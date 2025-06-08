import useSWR from 'swr';
import { useMemo } from 'react';

import { endpoints, fetcher1 } from '~/utils/axios';

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

export function useGetMembers(id, type) {
    const url = import.meta.env.VITE_SERVER_BE_URL + endpoints.members + `?id=${id}&type=${type}`;

    const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher1, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            members: data?.data?.data || [],
            meta: data?.data?.meta,
            membersLoading: isLoading,
            membersError: error,
            membersValidating: isValidating,
            membersEmpty: !isLoading && !data?.data?.data?.length, // Sửa lại path
            mutateMembers: mutate, // Thêm mutate function
        }),
        [data?.data, error, isLoading, isValidating, mutate],
    );

    return memoizedValue;
}
