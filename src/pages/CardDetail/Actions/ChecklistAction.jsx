import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
//
import { Button, Popover, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import { updateCardData } from '~/store/slices/boardSlice';
import { checklistService } from '~/services/checklistService';

function ChecklistAction({ title, anchorEl, card, setCard, onClose }) {
    const [checklistTitle, setChecklistTitle] = useState('');
    const dispatch = useDispatch();

    const handleSave = async () => {
        const newCard = cloneDeep(card);

        const checklist = await checklistService.createNewChecklist({
            boardId: card.boardId,
            cardId: card.id,
            title: checklistTitle,
        });

        newCard.checklists = [{ ...checklist, checkItems: [] }, ...newCard.checklists];

        dispatch(updateCardData({ newCard }));
        setCard(newCard);
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
