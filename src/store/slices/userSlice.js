import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { signIn, signOut } from '../actions/userAction';
import { endpoints } from '~/utils/axios';
import { isValidToken } from '../utils';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    status: 'unauthenticated', // authenticated or unauthenticated
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        checkUserSession: async (state) => {
            const accessToken = state.user?.accessToken;

            if (accessToken && isValidToken(accessToken)) {
                const res = await axios.get(endpoints.auth.me);

                const { user } = res.data;

                state.user = { ...user, accessToken };
                state.isLoading = false;
            } else {
                state.user = null;
                state.isLoading = false;
            }
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.user = null;
                state.isLoading = true;
                state.error = null;
                state.status = 'unauthenticated';
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
                state.status = 'authenticated';
            })
            .addCase(signIn.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.error = action.error;
                state.status = 'unauthenticated';
            });

        builder.addCase(signOut.fulfilled, (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
            state.status = 'unauthenticated';
        });
    },
});

//
//     const checkUserSession = useCallback(async () => {
//         try {
//             const accessToken = sessionStorage.getItem(STORAGE_KEY);
//
//             if (accessToken && isValidToken(accessToken)) {
//                 setSession(accessToken);
//
//                 const res = await axios.get(endpoints.auth.me);
//
//                 const { user } = res.data;
//
//                 setState({ user: { ...user, accessToken }, loading: false });
//             } else {
//                 setState({ user: null, loading: false });
//             }
//         } catch (error) {
//             console.error(error);
//             setState({ user: null, loading: false });
//         }
//     }, [setState]);

// Action creators are generated for each case reducer function
export const { checkUserSession } = userSlice.actions;

export default userSlice.reducer;
