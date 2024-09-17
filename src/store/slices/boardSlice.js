import { createSlice } from '@reduxjs/toolkit';
import { fetchBoardDetail, moveCardDifferentColumn, moveCardInSameColumn, moveColumns } from '../actions/boardAction';
import { mapOrder } from '~/utils/sort';
import { cloneDeep, isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/utils/formatters';

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

export const boardSlice = createSlice({
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
                action.payload.columns = mapOrder(action.payload?.columns, action.payload?.columnOrderIds, 'uuid');

                action.payload.columns.forEach((col) => {
                    if (isEmpty(col.cards)) {
                        col.cards = [generatePlaceholderCard(col)];
                        col.cardOrderIds = [generatePlaceholderCard(col).id];
                    } else {
                        col.cards = mapOrder(col?.cards, col?.cardOrderIds, 'uuid');
                    }
                });

                state.boardData = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchBoardDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });

        builder
            .addCase(moveColumns.fulfilled, (state, action) => {
                state.boardData = { ...state.boardData, ...action.payload };
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(moveCardInSameColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.boardData);
                // find column update
                const columnToUpdate = newBoard.columns.find((col) => col.id === action.payload.columnId);

                // update cards
                if (columnToUpdate) {
                    columnToUpdate.cards = action.payload.orderedCards;
                    columnToUpdate.cardOrderIds = action.payload.orderedCardIds;
                }

                state.boardData = { ...state.boardData, ...newBoard };
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(moveCardDifferentColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.boardData);
                // find column update
                const dndOrderedColumnsIds = action.payload.orderedColumns.map((c) => c.uuid);

                newBoard.columns = action.payload.orderedColumns;
                newBoard.columnOrderIds = dndOrderedColumnsIds;

                state.boardData = { ...state.boardData, ...newBoard };
                state.isLoading = false;
                state.isError = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { addBoardData } = boardSlice.actions;

export default boardSlice.reducer;
