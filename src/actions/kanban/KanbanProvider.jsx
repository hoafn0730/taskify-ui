import { createContext, useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { endpoints, fetcher1 } from '~/utils/axios';

// Constants
const PAGESIZE = 12;
const BOARD_ENDPOINT = import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.boards;
const enableServer = false;

// SWR Options
const swrOptions = {
    revalidateIfStale: enableServer,
    revalidateOnFocus: enableServer,
    revalidateOnReconnect: enableServer,
};

// Context
export const KanbanContext = createContext();

// Provider Component
export const KanbanProvider = ({ children, initialPage = 1, initialSortBy = 'latest' }) => {
    // States
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(PAGESIZE);
    const [sortBy, setSortBy] = useState(initialSortBy);

    // Generate API key
    const key = useMemo(
        () => `${BOARD_ENDPOINT}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`,
        [page, pageSize, sortBy],
    );

    // Fetch data using SWR
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

    // Extract metadata
    const meta = data?.meta ?? null;

    // Handlers
    const refetch = useCallback(() => mutateKanban(), [mutateKanban]);

    const mutate = useCallback(
        (updater) => {
            refetch((currentData) => (typeof updater === 'function' ? updater(currentData) : updater));
        },
        [refetch],
    );

    const handleStarToggle = useCallback(
        async (boardId) => {
            const boards = data?.data ?? [];
            const updatedBoards = boards.map((board) =>
                board.id === boardId ? { ...board, starred: !board.starred } : board,
            );

            mutate({ ...data, data: updatedBoards });
        },
        [data, mutate],
    );

    // Memoized value
    const value = useMemo(() => {
        const boards = data?.data ?? [];
        const sortedBoards = [...boards].sort((a, b) => Number(b.starred) - Number(a.starred));

        return {
            boards: sortedBoards,
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
            handleStarToggle,
        };
    }, [data?.data, meta, isLoading, error, isValidating, refetch, mutate, page, pageSize, sortBy, handleStarToggle]);

    return <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>;
};
