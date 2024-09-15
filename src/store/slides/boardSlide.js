import { createSlice } from '@reduxjs/toolkit';
import { fetchBoardDetail, moveColumns } from '../actions/boardAction';

const initialState = {
    boardData: {
        id: '',
        title: '',
        description: '',
        type: '',
        ownerIds: [],
        members: [],
        columnOrderIds: [],
        columns: [],
    },
    isLoading: false,
    isError: false,
};

export const boardSlide = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addBoardData: (state, action) => {
            state.boardData = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoardDetail.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchBoardDetail.fulfilled, (state, action) => {
                state.boardData = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchBoardDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(moveColumns.fulfilled, (state, action) => {
                console.log('🚀 ~ .addCase ~ action:', action);
                state.boardData = { ...state.boardData, ...action.payload };
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(moveColumns.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { addBoardData } = boardSlide.actions;

export default boardSlide.reducer;
