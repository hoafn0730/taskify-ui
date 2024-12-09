import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';

import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import LoadingSpinner from '~/components/LoadingSpinner';
import { boardService } from '~/services/boardService';
import { columnService } from '~/services/columnService';
import { fetchBoardDetail } from '~/store/actions/boardAction';
import { updateBoardData } from '~/store/slices/boardSlice';

function Board() {
    const { slug } = useParams();
    const board = useSelector((state) => state.board.activeBoard);
    const isLoading = useSelector((state) => state.board.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBoardDetail(slug)).then((res) => {
            if (res?.error) {
                navigate('/');
            }
        });
    }, [dispatch, navigate, slug]);

    const moveColumns = (orderedColumns) => {
        const dndOrderedColumnsIds = orderedColumns.map((c) => c.uuid);

        const newBoard = { ...board };
        newBoard.columns = orderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;
        dispatch(updateBoardData(newBoard));

        // fetch API update board
        boardService.updateBoard(newBoard.id, { columnOrderIds: dndOrderedColumnsIds });
    };

    const moveCardInSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
        const newBoard = cloneDeep(board);
        const columnToUpdate = newBoard.columns.find((col) => col.id === columnId);

        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards;
            columnToUpdate.cardOrderIds = dndOrderedCardIds;
        }
        dispatch(updateBoardData(newBoard));

        columnService.updateColumn(columnId, { cardOrderIds: dndOrderedCardIds });
    };

    const moveCardDifferentColumn = (currentCardId, prevColumnId, nextColumnId, orderedColumns) => {
        const dndOrderedColumnsIds = orderedColumns.map((c) => c.uuid);

        const newBoard = { ...board };
        newBoard.columns = orderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;
        dispatch(updateBoardData(newBoard));

        let prevCardOrderIds = orderedColumns.find((c) => c.id === prevColumnId)?.cardOrderIds;
        const nextCardOrderIds = orderedColumns.find((c) => c.id === nextColumnId)?.cardOrderIds;

        if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = [];

        boardService.moveCardToDifferentColumn({
            currentCardId,
            prevColumnId,
            prevCardOrderIds: prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: nextCardOrderIds,
        });
    };

    if (isLoading) {
        return <LoadingSpinner caption="Board Loading..." />;
    }

    return (
        <Box>
            <BoardBar board={board} />
            <BoardContent board={board} {...{ moveColumns, moveCardInSameColumn, moveCardDifferentColumn }} />
        </Box>
    );
}

export default Board;
