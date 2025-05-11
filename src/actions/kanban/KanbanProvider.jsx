import { createContext, useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';

import { endpoints, fetcher1 } from '~/utils/axios';

// eslint-disable-next-line react-refresh/only-export-components
export const KanbanContext = createContext();

const PAGESIZE = 12;
const BOARD_ENDPOINT = import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.boards;

const enableServer = false;

const swrOptions = {
    revalidateIfStale: enableServer,
    revalidateOnFocus: enableServer,
    revalidateOnReconnect: enableServer,
};

export const KanbanProvider = ({ children, initialPage = 1, initialSortBy = 'latest' }) => {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(PAGESIZE);
    const [sortBy, setSortBy] = useState(initialSortBy);

    const key = `${BOARD_ENDPOINT}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`;

    const {
        data,
        error,
        isValidating,
        mutate: mutateKanban,
        isLoading,
    } = useSWR(key, fetcher1, {
        ...swrOptions,
        revalidateOnFocus: false,
    });

    const meta = data?.meta ?? null;

    const refetch = useCallback(() => mutateKanban(), [mutateKanban]);

    const mutate = useCallback(
        (updater) => {
            refetch((currentData) => {
                return typeof updater === 'function' ? updater(currentData) : updater;
            }, false);
        },
        [refetch],
    );

    const value = useMemo(() => {
        const boards = data?.data ?? [];

        return {
            boards,
            meta,
            boardsLoading: isLoading,
            boardsError: error,
            boardsValidating: isValidating,
            boardsEmpty: !boards || boards.length === 0,
            refetch,
            mutate,
            page,
            pageSize,
            sortBy,
            setPage,
            setPageSize,
            setSortBy,
        };
    }, [data?.data, meta, isLoading, error, isValidating, refetch, mutate, page, pageSize, sortBy]);

    return <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>;
};
