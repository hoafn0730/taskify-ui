import { createSlice } from '@reduxjs/toolkit';
import { fetchCardDetail } from '../actions/cardAction';

const initialState = {
    activeCard: null,
    isLoading: false,
    isError: false,
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        updateCardData: (state, action) => {
            state.activeCard = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCardDetail.fulfilled, (state, action) => {
            state.activeCard = action.payload;
            state.isLoading = false;
            state.isError = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { updateCardData } = cardSlice.actions;

export default cardSlice.reducer;
