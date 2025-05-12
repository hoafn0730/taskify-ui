import { createAsyncThunk } from '@reduxjs/toolkit';
import { kanbanService } from '~/services/kanbanService';

export const fetchBoardDetail = createAsyncThunk('kanban/fetchBoardDetail', async (slug) => {
    const res = await kanbanService.getBoardBySlug(slug);

    return res.data;
});

// column
export const createNewColumn = createAsyncThunk('kanban/createNewColumn', async (columnData) => {
    const createdColumn = await kanbanService.createNewColumn(columnData);

    return createdColumn;
});

export const deleteColumn = createAsyncThunk('kanban/deleteColumn', async (columnId) => {
    await kanbanService.deleteColumn(columnId);

    return { columnId };
});

export const clearColumn = createAsyncThunk('kanban/clearColumn', async (columnId) => {
    await kanbanService.clearColumn(columnId);

    return { columnId };
});

// card
export const createTask = createAsyncThunk('kanban/createTask', async ({ columnUuid, columnId, taskData }) => {
    const res = await kanbanService.createTask({ columnId, title: taskData.title, boardId: taskData.boardId });

    return { columnUuid, taskData: res };
});
