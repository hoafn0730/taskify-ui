import useSWR from 'swr';
import { useMemo } from 'react';

import { keyBy } from '~/utils/helper';
import { endpoints, fetcher1 } from '~/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetLabels() {
    const url = import.meta.env.VITE_SERVER_BE_URL + endpoints.mail.labels;

    const { data, isLoading, error, isValidating } = useSWR(url, fetcher1, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            labels: data?.data || [],
            labelsLoading: isLoading,
            labelsError: error,
            labelsValidating: isValidating,
            labelsEmpty: !isLoading && !data?.data.length,
        }),
        [data?.data, error, isLoading, isValidating],
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMails(labelId) {
    const url = labelId
        ? [import.meta.env.VITE_SERVER_BE_URL + endpoints.mail.list, { params: { label: labelId } }]
        : '';

    const { data, isLoading, error, isValidating } = useSWR(url, fetcher1, swrOptions);

    const memoizedValue = useMemo(() => {
        const byId = data?.data.length ? keyBy(data?.data, 'id') : {};
        const allIds = Object.keys(byId);

        return {
            mails: { byId, allIds },
            mailsLoading: isLoading,
            mailsError: error,
            mailsValidating: isValidating,
            mailsEmpty: !isLoading && !allIds.length,
        };
    }, [data?.data, error, isLoading, isValidating]);

    return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMail(mailId) {
    const url = mailId ? [import.meta.env.VITE_SERVER_BE_URL + endpoints.mail.details + '/' + mailId] : '';

    const { data, isLoading, error, isValidating } = useSWR(url, fetcher1, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            mail: data?.data,
            mailLoading: isLoading,
            mailError: error,
            mailValidating: isValidating,
        }),
        [data?.data, error, isLoading, isValidating],
    );

    return memoizedValue;
}
