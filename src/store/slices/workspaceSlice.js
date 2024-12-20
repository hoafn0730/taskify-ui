import { createSlice } from '@reduxjs/toolkit';
import { fetchWorkspace } from '../actions/workspaceAction';

const initialState = {
    activeWorkspace: null,
    isLoading: false,
    isError: false,
};

export const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        updateWorkspaceData: (state, action) => {
            state.activeWorkspace = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
            state.activeWorkspace = action.payload;
            state.isLoading = false;
            state.isError = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { updateWorkspaceData } = workspaceSlice.actions;

export default workspaceSlice.reducer;
