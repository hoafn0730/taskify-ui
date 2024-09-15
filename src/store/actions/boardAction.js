import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardService } from '~/services/boardService';

export const fetchBoardDetail = createAsyncThunk('board/fetchBoardDetail', async (boardId) => {
    const res = await boardService.getBoard(boardId);

    return res.data;
});

export const moveColumns = createAsyncThunk('board/moveColumns', async ({ prevColumnId, nextColumnId, ...payload }) => {
    await boardService.moveColumns(prevColumnId, nextColumnId);

    return payload;
});
