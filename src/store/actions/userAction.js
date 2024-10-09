import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '~/services/authService';

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
    const res = await authService.getCurrentUser();

    return res.data;
});

export const logout = createAsyncThunk('user/logout', async () => {
    const res = await authService.logout();
    window.location.reload();

    return res.data;
});
