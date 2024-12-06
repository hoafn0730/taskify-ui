import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, logout } from '../actions/userAction';

const initialState = {
    userInfo: null,
    isLoading: false,
    isError: false,
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserData: (state, action) => {
            state.userData = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state, action) => {
                state.userInfo = null;
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.isLoading = false;
                state.isLoggedIn = true;
                state.isError = false;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.userInfo = null;
                state.isLoading = false;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.userInfo = null;
                state.isLoading = false;
                state.isLoggedIn = false;
                state.isError = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { addUserData } = userSlice.actions;

export default userSlice.reducer;
