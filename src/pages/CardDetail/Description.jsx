import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import MarkdownEditor from '~/components/MarkdownEditor';
import MarkdownParser from '~/components/MarkdownParser';
import { updateCard } from '~/store/actions/boardAction';

function Description({ desc, isEditingDesc, setIsEditingDesc, card }) {
    const [cardDescValue, setCardDescValue] = useState(desc);
    const dispatch = useDispatch();

    useEffect(() => {
        setCardDescValue(desc);
    }, [desc]);

    const handleSubmit = () => {
        const updateData = { title: card.title, description: cardDescValue?.trim() };
        dispatch(updateCard({ columnId: card.columnId, cardId: card.id, data: updateData }));
        setIsEditingDesc(false);
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
    desc: PropTypes.string,
    isEditingDesc: PropTypes.bool,
    setIsEditingDesc: PropTypes.func,
    card: PropTypes.object,
};

export default Description;
