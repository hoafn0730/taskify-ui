import { cloneDeep } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import {
    clearColumn,
    createNewColumn,
    createTask,
    deleteColumn,
    deleteTask,
    fetchBoardDetail,
    updateColumn,
    updateTask,
} from '../actions/kanbanAction';
import { mapOrder } from '~/utils/sort';

const initialState = {
    activeBoard: null,
    isLoading: false,
    isError: false,
};

export const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        updateBoardData: (state, action) => {
            state.activeBoard = action.payload;
        },
        updateCardOnBoard: (state, action) => {
            const newBoard = cloneDeep(state.activeBoard);
            const card = action.payload;

            const column = newBoard.columns.find((col) => col.id === card.columnId);
            const cardToUpdate = column.cards.find((c) => c.id === card.id);

            Object.assign(cardToUpdate, card);

            state.activeBoard = newBoard;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoardDetail.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchBoardDetail.fulfilled, (state, action) => {
                const board = action.payload;
                board.columns = mapOrder(board?.columns, board?.columnOrderIds, 'uuid');

                state.activeBoard = board;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchBoardDetail.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // column
        builder
            .addCase(createNewColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.activeBoard);

                const createdColumn = action.payload;

                // Thêm column mới vào columns
                newBoard.columns.push(createdColumn);

                // Thêm ID của column vào columnOrderIds
                newBoard.columnOrderIds.push(createdColumn.uuid);

                newBoard.tasks = { ...newBoard.tasks, [createdColumn.uuid]: [] };

                // Cập nhật lại state với bảng mới
                state.activeBoard = newBoard;
                state.isLoading = false; // Cập nhật trạng thái loading
                state.isError = false; // Reset lỗi khi thêm thành công
            })
            .addCase(updateColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.activeBoard);

                const _column = action.payload;

                const columns = newBoard.columns.map((column) =>
                    column.id === _column.columnId
                        ? {
                              // Update data when found
                              ...column,
                              name: _column.title,
                          }
                        : column,
                );

                // Cập nhật lại state với bảng mới
                state.activeBoard = { ...newBoard, columns };
                state.isLoading = false; // Cập nhật trạng thái loading
                state.isError = false; // Reset lỗi khi thêm thành công
            })
            .addCase(deleteColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.activeBoard);

                const columnIdToDelete = action.payload.columnId;

                const columnToDelete = newBoard.columns.find((col) => col.id === columnIdToDelete);

                // Xóa column khỏi columns
                newBoard.columns = newBoard.columns.filter((col) => col.uuid !== columnToDelete.uuid);

                // Xóa id của column khỏi columnOrderIds
                newBoard.columnOrderIds = newBoard.columnOrderIds.filter((id) => id !== columnToDelete.uuid);

                // delete tasks by column deleted
                newBoard.tasks = Object.keys(newBoard.tasks)
                    .filter((key) => key !== columnToDelete.uuid)
                    .reduce((obj, key) => {
                        obj[key] = newBoard.tasks[key];
                        return obj;
                    }, {});

                state.activeBoard = newBoard;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(clearColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.activeBoard);

                const columnIdToClear = newBoard.columns.find((col) => col.id === action.payload.columnId);

                const tasks = { ...newBoard.tasks, [columnIdToClear.uuid]: [] };

                state.activeBoard = { ...newBoard, tasks };
                state.isLoading = false;
                state.isError = false;
            });

        // cARD
        builder
            .addCase(createTask.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.activeBoard);

                const column = newBoard.columns.find((col) => col.id === action.payload.columnId);
                const reporter = action.payload.reporter;
                const taskData = action.payload.taskData;

                const currentTasks = newBoard.tasks[column.uuid] || [];

                const tasks = {
                    ...newBoard.tasks,
                    [column.uuid]: [{ ...taskData, reporter: [reporter], assignees: [reporter] }, ...currentTasks],
                };

                state.activeBoard = { ...newBoard, tasks };
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.activeBoard);

                const column = newBoard.columns.find((col) => col.id === action.payload.columnId);

                const taskData = action.payload.taskData;

                // tasks in column
                const tasksInColumn = newBoard.tasks[column.uuid];

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

                const tasks = { ...newBoard.tasks, [column.uuid]: updateTasks };

                state.activeBoard = { ...newBoard, tasks };
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.activeBoard);

                const column = newBoard.columns.find((col) => col.id === action.payload.columnId);

                const taskId = action.payload.taskId;

                // delete task in column
                const tasks = {
                    ...newBoard.tasks,
                    [column.uuid]: newBoard.tasks[column.uuid].filter((task) => task.id !== taskId),
                };

                state.activeBoard = { ...newBoard, tasks };
                state.isLoading = false;
                state.isError = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { updateBoardData, updateCardOnBoard } = kanbanSlice.actions;

export default kanbanSlice.reducer;
