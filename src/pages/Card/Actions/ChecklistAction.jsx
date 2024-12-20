import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
//
import { Button, Popover, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { checklistService } from '~/services/checklistService';
import { updateCardOnBoard } from '~/store/slices/boardSlice';
import { updateCardData } from '~/store/slices/cardSlice';

function ChecklistAction({ title, anchorEl, onClose }) {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.board.activeBoard);
    const [checklistTitle, setChecklistTitle] = useState('');
    const card = useSelector((state) => state.card.activeCard);

    const handleSave = async () => {
        const checklist = await checklistService.createNewChecklist({
            boardId: card.boardId,
            cardId: card.id,
            title: checklistTitle,
        });

        const newCard = cloneDeep(card);
        newCard.checklists = [...newCard.checklists, { ...checklist, checkItems: [] }];

        board && dispatch(updateCardOnBoard(newCard));
        dispatch(updateCardData(newCard));
        onClose();
    };

    return (
        <Popover
            open={Boolean(anchorEl) && title === 'Checklist'}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box component={'header'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                <Typography variant="h2" sx={{ fontSize: '14px', fontWeight: 600, color: '#44546f' }}>
                    {title}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    px: 2,
                    py: 1,
                }}
            >
                <TextField
                    variant="outlined"
                    label={'Title'}
                    value={checklistTitle}
                    size="small"
                    sx={{
                        mb: 1,
                    }}
                    onChange={(e) => setChecklistTitle(e.target.value)}
                />
                <Button variant="contained" sx={{ width: '100%' }} onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </Popover>
    );
}

ChecklistAction.propTypes = {
    title: PropTypes.string,
    card: PropTypes.object,
    anchorEl: PropTypes.any,
    setCard: PropTypes.func,
    onClose: PropTypes.func,
};

export default ChecklistAction;
