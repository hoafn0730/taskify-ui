import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mutate } from 'swr';

import { useParams } from '~/routes/hooks';
import { fetchBoardDetail } from '~/store/actions/kanbanAction';

import axios, { endpoints } from '~/utils/axios';

const enableServer = false;

const BOARD_ENDPOINT = endpoints.board;

export function useGetBoard() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { activeBoard: board, isLoading, isError } = useSelector((state) => state.kanban);

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
