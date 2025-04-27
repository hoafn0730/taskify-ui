import { cloneDeep, isEmpty } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { createNewColumn, deleteColumn, fetchBoardDetail } from '../actions/kanbanAction';
import { mapOrder } from '~/utils/sort';
import { generatePlaceholderCard } from '~/utils/formatters';

const initialState = {
    activeBoard: null,
    isLoading: false,
    isError: false,
};

export const kanbanSlice = createSlice({
    name: 'kanban',
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

                state.activeBoard = board;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchBoardDetail.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // column
        builder
            .addCase(createNewColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.activeBoard);

                const createdColumn = action.payload; // Giả sử `action.payload` chứa thông tin về column mới tạo

                // Thêm column mới vào columns
                newBoard.columns.push(createdColumn);

                // Thêm ID của column vào columnOrderIds
                newBoard.columnOrderIds.push(createdColumn.uuid);

                newBoard.tasks = { ...newBoard.tasks, [createdColumn.uuid]: [] };

                // Cập nhật lại state với bảng mới
                state.activeBoard = newBoard;
                state.isLoading = false; // Cập nhật trạng thái loading
                state.isError = false; // Reset lỗi khi thêm thành công
            })
            .addCase(deleteColumn.fulfilled, (state, action) => {
                const newBoard = cloneDeep(state.activeBoard);

                const columnIdToDelete = action.payload.columnId;

                const columnToDelete = newBoard.columns.find((col) => col.id === columnIdToDelete);

                // Xóa column khỏi columns
                newBoard.columns = newBoard.columns.filter((col) => col.uuid !== columnToDelete.uuid);

                // Xóa id của column khỏi columnOrderIds
                newBoard.columnOrderIds = newBoard.columnOrderIds.filter((id) => id !== columnToDelete.uuid);

                state.activeBoard = newBoard;
                state.isLoading = false;
                state.isError = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { updateBoardData, updateCardOnBoard } = kanbanSlice.actions;

export default kanbanSlice.reducer;
