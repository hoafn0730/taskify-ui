import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '~/services/authService';

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
    const res = await authService.getCurrentUser();

    return res;
});

export const signIn = createAsyncThunk('user/signIn', async ({ email, password }) => {
    const res = await authService.signIn({ email, password });
    const { accessToken, refreshToken, ...user } = res.data;

    return { accessToken, refreshToken, ...user };
});

export const signOut = createAsyncThunk('user/signOut', async () => {
    const res = await authService.signOut();

    return res;
});
