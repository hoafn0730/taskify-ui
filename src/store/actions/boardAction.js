import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardService } from '~/services/boardService';
import { columnService } from '~/services/columnService';

export const fetchBoardDetail = createAsyncThunk('board/fetchBoardDetail', async (boardId) => {
    const res = await boardService.getBoard(boardId);

    return res.data;
});

export const moveColumns = createAsyncThunk('board/moveColumns', async ({ columnOrderIds }, thunkAPI) => {
    const state = thunkAPI.getState();
    const boardId = state?.board?.boardData?.id;
    boardService.updateBoard(boardId, { columnOrderIds });

    return { columnOrderIds };
});

export const moveCardInSameColumn = createAsyncThunk(
    'board/moveCardInSameColumn',
    async ({ columnId, orderedCards, orderedCardIds }) => {
        columnService.updateColumn(columnId, { cardOrderIds: orderedCardIds });

        return { columnId, orderedCards, orderedCardIds };
    },
);

export const moveCardDifferentColumn = createAsyncThunk(
    'board/moveCardDifferentColumn',
    async ({ currentCardId, prevColumnId, nextColumnId, orderedColumns }) => {
        let prevCardOrderIds = orderedColumns.find((c) => c.id === prevColumnId)?.cardOrderIds;

        if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = [];

        boardService.moveCardToDifferentColumn({
            currentCardId,
            prevColumnId,
            prevCardOrderIds: prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: orderedColumns.find((c) => c.id === nextColumnId)?.cardOrderIds,
        });

        return { orderedColumns };
    },
);
