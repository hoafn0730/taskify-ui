import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardService } from '~/services/boardService';

export const fetchBoardDetail = createAsyncThunk('board/fetchBoardDetail', async (slug) => {
    const res = await boardService.getBoardBySlug(slug);

    return res.data;
});
