import { createAsyncThunk } from '@reduxjs/toolkit';
import { cardService } from '~/services/cardService';

export const fetchCardDetail = createAsyncThunk('card/fetchCardDetail', async (slug) => {
    const res = await cardService.getCardDetailBySlug(slug);

    return res.data;
});
