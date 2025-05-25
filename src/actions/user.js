import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints, fetcher1 } from '~/utils/axios';

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

export function useGetUsers() {
    const url = import.meta.env.VITE_SERVER_BE_URL + endpoints.admin.users;

    const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher1, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            users: data?.data || [],
            meta: data?.data?.meta,
            usersLoading: isLoading,
            usersError: error,
            usersValidating: isValidating,
            usersEmpty: !isLoading && !data?.data?.data?.length, // Sửa lại path
            mutateUsers: mutate, // Thêm mutate function
        }),
        [data?.data, error, isLoading, isValidating, mutate],
    );

    return memoizedValue;
}
