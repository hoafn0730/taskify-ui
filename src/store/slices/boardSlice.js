import { cloneDeep, isEmpty } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import {
    createNewCard,
    createNewColumn,
    deleteCard,
    deleteColumn,
    fetchBoardDetail,
    moveCardDifferentColumn,
    moveCardInSameColumn,
    moveColumns,
    updateCard,
    updateColumn,
} from '../actions/boardAction';
import { mapOrder } from '~/utils/sort';
import { generatePlaceholderCard } from '~/utils/formatters';

const initialState = {
    boardData: null,
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
                        col.cards = mapOrder(
                            col?.cards.filter((card) => card.archived === false),
                            col?.cardOrderIds,
                            'uuid',
                        );
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
                state.isError = false;
            })
            .addCase(moveCardDifferentColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.boardData);
                // find column update
                const dndOrderedColumnsIds = action.payload.orderedColumns.map((c) => c.uuid);

                newBoard.columns = action.payload.orderedColumns;
                newBoard.columnOrderIds = dndOrderedColumnsIds;

                state.boardData = { ...state.boardData, ...newBoard };
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(moveCardDifferentColumn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            });

        builder
            .addCase(createNewColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.boardData);
                const createdColumn = action.payload.createdColumn;

                createdColumn.cards = [generatePlaceholderCard(createNewColumn)];
                createdColumn.cardOrderIds = [generatePlaceholderCard(createNewColumn).uuid];

                // find column update
                newBoard.columns.push(createdColumn);
                newBoard.columnOrderIds.push(createdColumn.uuid);

                state.boardData = { ...state.boardData, ...newBoard };
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(updateColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.boardData);

                const column = newBoard.columns.find((col) => col.id === action.payload.columnId);
                const newData = action.payload.data;
                Object.assign(column, newData);

                state.boardData = { ...state.boardData, ...newBoard };
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(deleteColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.boardData);
                const column = newBoard.columns.find((col) => col.id === action.payload.columnId);
                newBoard.columns = newBoard.columns.filter((col) => col.id !== action.payload.columnId);
                newBoard.columnOrderIds = newBoard.columnOrderIds.filter((colId) => colId !== column.uuid);

                state.boardData = { ...state.boardData, ...newBoard };
                state.isLoading = false;
                state.isError = false;
            });

        builder
            .addCase(createNewCard.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.boardData);
                const createdCard = action.payload.createdCard;
                const columnToUpdate = newBoard.columns.find((col) => col.id === createdCard.columnId);

                if (columnToUpdate) {
                    if (columnToUpdate.cards.some((c) => c.FE_PlaceholderCard)) {
                        columnToUpdate.cards = [createdCard];
                        columnToUpdate.cardOrderIds = [createdCard.uuid];
                    } else {
                        columnToUpdate.cards.push(createdCard);
                        columnToUpdate.cardOrderIds.push(createdCard.uuid);
                    }
                }

                state.boardData = { ...state.boardData, ...newBoard };
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(updateCard.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.boardData);

                const column = newBoard.columns.find((col) => col.id === action.payload.columnId);
                const card = column.cards.find((card) => card.id === action.payload.cardId);

                const newData = action.payload.data;
                Object.assign(card, newData);

                if (newData.archived) {
                    column.cards = column.cards.filter((card) => card.id !== action.payload.cardId);
                    column.cardOrderIds = column.cardOrderIds.filter((cardId) => cardId !== card.uuid);
                }

                state.boardData = { ...state.boardData, ...newBoard };
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.boardData);

                const column = newBoard.columns.find((col) => col.id === action.payload.columnId);
                const card = column.cards.find((card) => card.id === action.payload.cardId);

                column.cards = column.cards.filter((card) => card.id !== action.payload.cardId);
                column.cardOrderIds = column.cardOrderIds.filter((cardId) => cardId !== card.uuid);

                state.boardData = { ...state.boardData, ...newBoard };
                state.isLoading = false;
                state.isError = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { addBoardData } = boardSlice.actions;

export default boardSlice.reducer;
