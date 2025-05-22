import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

import { endpoints, fetcher1 } from '~/utils/axios';

// ----------------------------------------------------------------------

const enableServer = false;

const CALENDAR_ENDPOINT = import.meta.env.VITE_SERVER_BE_URL + endpoints.calendar;

const swrOptions = {
    revalidateIfStale: enableServer,
    revalidateOnFocus: enableServer,
    revalidateOnReconnect: enableServer,
};

export function useGetEvents() {
    const { data, isLoading, error, isValidating, mutate } = useSWR(CALENDAR_ENDPOINT, fetcher1, swrOptions);

    const events = useMemo(() => {
        return (
            data?.data.map((event) => ({
                ...event,
                textColor: event.color,
            })) || []
        );
    }, [data?.data]);

    const eventsEmpty = !isLoading && !data?.data?.length;

    // ✅ Hàm cập nhật local events trong cache (thêm, sửa, xóa)
    const mutateEvents = useCallback(
        (updater) => {
            mutate(
                (currentData) => {
                    const currentEvents = currentData?.data || [];
                    const updatedEvents = updater(currentEvents);
                    return { ...currentData, data: updatedEvents };
                },
                false, // false = không revalidate lại từ server
            );
        },
        [mutate],
    );

    return {
        events,
        eventsLoading: isLoading,
        eventsError: error,
        eventsValidating: isValidating,
        eventsEmpty,
        mutateEvents,
    };
}
