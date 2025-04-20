import { cloneDeep, isEmpty } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { fetchBoardDetail } from '../actions/boardAction';
import { mapOrder } from '~/utils/sort';
import { generatePlaceholderCard } from '~/utils/formatters';

const initialState = {
    activeBoard: null,
    isLoading: false,
    isError: false,
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        updateBoardData: (state, action) => {
            state.activeBoard = action.payload;
        },
        updateCardOnBoard: (state, action) => {
            const newBoard = cloneDeep(state.activeBoard);
            const card = action.payload;

            const column = newBoard.columns.find((col) => col.id === card.columnId);
            const cardToUpdate = column.cards.find((c) => c.id === card.id);

            Object.assign(cardToUpdate, card);

            state.activeBoard = newBoard;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoardDetail.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchBoardDetail.fulfilled, (state, action) => {
                const board = action.payload;
                board.columns = mapOrder(board?.columns, board?.columnOrderIds, 'uuid');

                board.columns.forEach((col) => {
                    if (isEmpty(col.cards)) {
                        col.cards = [generatePlaceholderCard(col)];
                        col.cardOrderIds = [generatePlaceholderCard(col).id];
                    } else {
                        col.cards = mapOrder(
                            col?.cards.filter((card) => !card.archivedAt),
                            col?.cardOrderIds,
                            'uuid',
                        );
                    }
                });

                state.activeBoard = board;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchBoardDetail.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { updateBoardData, updateCardOnBoard } = boardSlice.actions;

export default boardSlice.reducer;
