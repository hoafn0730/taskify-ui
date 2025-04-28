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
