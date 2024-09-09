import Box from '@mui/material/Box';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import { useSelector } from 'react-redux';

function Board() {
    const board = useSelector((state) => state.board.data);

    return (
        <Box>
            <BoardBar boardData={board} />
            <BoardContent data={board} />
        </Box>
    );
}

export default Board;
