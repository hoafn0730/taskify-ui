import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import LoadingSpinner from '~/components/LoadingSpinner';
import { boardService } from '~/services/boardService';
import { columnService } from '~/services/columnService';
import { fetchBoardDetail } from '~/store/actions/boardAction';
import { updateBoardData } from '~/store/slices/boardSlice';
import BoardMenu from './BoardMenu';

function Board() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const board = useSelector((state) => state.board.activeBoard);
    const isLoading = useSelector((state) => state.board.isLoading);
    const [open, setOpen] = useState(false);

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

        boardService.moveCardToDifferentColumn(board.id, {
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
        <Box
            sx={{
                backgroundImage: `url(${board?.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <Box
                sx={{
                    mr: open ? '320px' : 0,
                }}
            >
                <BoardBar board={board} setOpen={setOpen} />
                <BoardContent board={board} {...{ moveColumns, moveCardInSameColumn, moveCardDifferentColumn }} />
            </Box>

            <BoardMenu
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            />
        </Box>
    );
}

export default Board;
