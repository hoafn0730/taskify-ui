import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR, { mutate } from 'swr';
import { useParams } from '~/routes/hooks';
import { fetchBoardDetail } from '~/store/actions/kanbanAction';

import axios, { fetcher, endpoints } from '~/utils/axios';

// ----------------------------------------------------------------------

const enableServer = false;

const BOARD_ENDPOINT = endpoints.board;

const swrOptions = {
    revalidateIfStale: enableServer,
    revalidateOnFocus: enableServer,
    revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

export function useGetBoard() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { activeBoard: board, isLoading, isError } = useSelector((state) => state.kanban);
    // const { data: board, isLoading, isError } = useSWR(`${BOARD_ENDPOINT}/${slug}`, fetcher, swrOptions);

    useEffect(() => {
        dispatch(fetchBoardDetail(slug));
    }, [dispatch, slug]);

    const memoizedValue = useMemo(() => {
        const columns = board?.columns ?? [];

        return {
            board: board,
            boardLoading: isLoading,
            boardError: isError,
            boardValidating: false, // isValidating,
            boardEmpty: !isLoading && !columns.length,
        };
    }, [board, isError, isLoading]);

    return memoizedValue;
}

export function useGetBoardList() {
    const { data: boards, error, isValidating } = useSWR(endpoints.kanban.boards, fetcher, swrOptions);

    const memoizedValue = useMemo(() => {
        return {
            boards: boards?.sort((a, b) => b?.starred - a?.starred) || [],
            boardsLoading: !error && !boards,
            boardsError: error,
            boardsValidating: isValidating,
            boardsEmpty: !boards || boards.length === 0,
        };
    }, [boards, error, isValidating]);

    return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createColumn(columnData) {
    /**
     * Work on server
     */
    if (enableServer) {
        const data = { columnData };
        await axios.post(BOARD_ENDPOINT, data, { params: { endpoint: 'create-column' } });
    }

    /**
     * Work in local
     */
    mutate(
        BOARD_ENDPOINT,
        (currentData) => {
            const { board } = currentData;

            // add new column in board.columns
            const columns = [...board.columns, columnData];

            // add new task in board.tasks
            const tasks = { ...board.tasks, [columnData.id]: [] };

            return { ...currentData, board: { ...board, columns, tasks } };
        },
        false,
    );
}

// ----------------------------------------------------------------------

export async function updateColumn(columnId, columnName) {
    /**
     * Work on server
     */
    if (enableServer) {
        const data = { columnId, columnName };
        await axios.post(BOARD_ENDPOINT, data, { params: { endpoint: 'update-column' } });
    }

    /**
     * Work in local
     */
    mutate(
        BOARD_ENDPOINT,
        (currentData) => {
            const { board } = currentData;

            const columns = board.columns.map((column) =>
                column.id === columnId
                    ? {
                          // Update data when found
                          ...column,
                          name: columnName,
                      }
                    : column,
            );

            return { ...currentData, board: { ...board, columns } };
        },
        false,
    );
}

// ----------------------------------------------------------------------

export async function moveColumn(updateColumns) {
    /**
     * Work in local
     */
    mutate(
        BOARD_ENDPOINT,
        (currentData) => {
            const { board } = currentData;

            return { ...currentData, board: { ...board, columns: updateColumns } };
        },
        false,
    );

    /**
     * Work on server
     */
    if (enableServer) {
        const data = { updateColumns };
        await axios.post(BOARD_ENDPOINT, data, { params: { endpoint: 'move-column' } });
    }
}

// ----------------------------------------------------------------------

export async function clearColumn(columnId) {
    /**
     * Work on server
     */
    if (enableServer) {
        const data = { columnId };
        await axios.post(BOARD_ENDPOINT, data, { params: { endpoint: 'clear-column' } });
    }

    /**
     * Work in local
     */
    mutate(
        BOARD_ENDPOINT,
        (currentData) => {
            const { board } = currentData;

            // remove all tasks in column
            const tasks = { ...board.tasks, [columnId]: [] };

            return { ...currentData, board: { ...board, tasks } };
        },
        false,
    );
}

// ----------------------------------------------------------------------

export async function deleteColumn(columnId) {
    /**
     * Work on server
     */
    if (enableServer) {
        const data = { columnId };
        await axios.post(BOARD_ENDPOINT, data, { params: { endpoint: 'delete-column' } });
    }

    /**
     * Work in local
     */
    mutate(
        BOARD_ENDPOINT,
        (currentData) => {
            const { board } = currentData;

            // delete column in board.columns
            const columns = board.columns.filter((column) => column.id !== columnId);

            // delete tasks by column deleted
            const tasks = Object.keys(board.tasks)
                .filter((key) => key !== columnId)
                .reduce((obj, key) => {
                    obj[key] = board.tasks[key];
                    return obj;
                }, {});

            return { ...currentData, board: { ...board, columns, tasks } };
        },
        false,
    );
}

// ----------------------------------------------------------------------

export async function createTask(columnId, taskData) {
    /**
     * Work on server
     */
    if (enableServer) {
        const data = { columnId, taskData };
        await axios.post(BOARD_ENDPOINT, data, { params: { endpoint: 'create-task' } });
    }

    /**
     * Work in local
     */
    mutate(
        BOARD_ENDPOINT,
        (currentData) => {
            const { board } = currentData;

            // add task in board.tasks
            const tasks = { ...board.tasks, [columnId]: [taskData, ...board.tasks[columnId]] };

            return { ...currentData, board: { ...board, tasks } };
        },
        false,
    );
}

// ----------------------------------------------------------------------

export async function updateTask(columnId, taskData) {
    /**
     * Work on server
     */
    if (enableServer) {
        const data = { columnId, taskData };
        await axios.post(BOARD_ENDPOINT, data, { params: { endpoint: 'update-task' } });
    }

    /**
     * Work in local
     */
    mutate(
        BOARD_ENDPOINT,
        (currentData) => {
            const { board } = currentData;

            // tasks in column
            const tasksInColumn = board.tasks[columnId];

            // find and update task
            const updateTasks = tasksInColumn.map((task) =>
                task.id === taskData.id
                    ? {
                          // Update data when found
                          ...task,
                          ...taskData,
                      }
                    : task,
            );

            const tasks = { ...board.tasks, [columnId]: updateTasks };

            return { ...currentData, board: { ...board, tasks } };
        },
        false,
    );
}

// ----------------------------------------------------------------------

export async function moveTask(updateTasks) {
    /**
     * Work in local
     */
    mutate(
        BOARD_ENDPOINT,
        (currentData) => {
            const { board } = currentData;

            // update board.tasks
            const tasks = updateTasks;

            return { ...currentData, board: { ...board, tasks } };
        },
        false,
    );

    /**
     * Work on server
     */
    if (enableServer) {
        const data = { updateTasks };
        await axios.post(BOARD_ENDPOINT, data, { params: { endpoint: 'move-task' } });
    }
}

// ----------------------------------------------------------------------

export async function deleteTask(columnId, taskId) {
    /**
     * Work on server
     */
    if (enableServer) {
        const data = { columnId, taskId };
        await axios.post(BOARD_ENDPOINT, data, { params: { endpoint: 'delete-task' } });
    }

    /**
     * Work in local
     */
    mutate(
        BOARD_ENDPOINT,
        (currentData) => {
            const { board } = currentData;

            // delete task in column
            const tasks = {
                ...board.tasks,
                [columnId]: board.tasks[columnId].filter((task) => task.id !== taskId),
            };

            return { ...currentData, board: { ...board, tasks } };
        },
        false,
    );
}
