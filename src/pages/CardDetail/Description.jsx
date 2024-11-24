import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import MarkdownEditor from '~/components/MarkdownEditor';
import MarkdownParser from '~/components/MarkdownParser';
import { cloneDeep } from 'lodash';
import { cardService } from '~/services/cardService';
import { updateBoardData } from '~/store/slices/boardSlice';

function Description({ card, isEditingDesc, setIsEditingDesc }) {
    const board = useSelector((state) => state.board.activeBoard);
    const [cardDescValue, setCardDescValue] = useState(card?.desc);
    const dispatch = useDispatch();

    useEffect(() => {
        setCardDescValue(card?.desc);
    }, [card?.desc]);

    const handleSubmit = () => {
        const updateData = { title: card.title, description: cardDescValue?.trim() };

        const newBoard = cloneDeep(board);

        const column = newBoard.columns.find((col) => col.id === card.columnId);
        const activeCard = column.cards.find((c) => c.id === card.id);

        Object.assign(activeCard, updateData);

        column.cards = column.cards.filter((c) => c.id !== card.id);
        column.cardOrderIds = column.cardOrderIds.filter((cardId) => cardId !== card.uuid);

        dispatch(updateBoardData(newBoard));
        setIsEditingDesc(false);

        cardService.updateCard(card?.id, updateData);
    };

    return (
        <Box sx={{ ml: '32px' }}>
            {!isEditingDesc ? (
                <>
                    {cardDescValue ? (
                        <MarkdownParser content={cardDescValue} />
                    ) : (
                        <Button onClick={() => setIsEditingDesc(true)}>Add a more detailed description</Button>
                    )}
                </>
            ) : (
                <>
                    <MarkdownEditor
                        value={cardDescValue || ''}
                        style={{ minHeight: '275px' }}
                        onChange={({ text }) => setCardDescValue(text)}
                    />
                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button onClick={() => setIsEditingDesc(false)}>Cancel</Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

Description.propTypes = {
    card: PropTypes.object,
    isEditingDesc: PropTypes.bool,
    setIsEditingDesc: PropTypes.func,
};

export default Description;
