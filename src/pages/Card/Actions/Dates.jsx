import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
//
import {
    Button,
    Checkbox,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    Typography,
} from '@mui/material';
//
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import DateCalendar from '~/components/DateCalendar';
import { DateField, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { cardService } from '~/services/cardService';

function Dates({ title, anchorEl, onClose }) {
    const board = useSelector((state) => state.board.activeBoard);
    const card = useSelector((state) => state.card.activeCard);
    const dueDate = card?.dueDate && dayjs(card?.dueDate);
    const [dateCalendarValue, setDateCalendarValue] = useState(dueDate ?? dayjs());
    const dispatch = useDispatch();

    const handleSave = () => {
        const updateData = {
            dueDate: dateCalendarValue,
            dueComplete: false,
            dueReminder: -1,
        };

        const newCard = cloneDeep(card);

        newCard.dueDate = dayjs(dateCalendarValue).toISOString();
        newCard.dueComplete = false;
        newCard.dueReminder = -1;

        onClose();
        // dispatch(updateCardData(newCard));

        cardService.updateCard(card.id, updateData);
    };

    const handleRemove = () => {
        const updateData = {
            dueDate: null,
            dueComplete: false,
            dueReminder: -1,
        };
        const newCard = cloneDeep(card);

        newCard.dueDate = null;
        newCard.dueComplete = false;
        newCard.dueReminder = -1;

        onClose();
        // dispatch(updateCardData(newCard));

        cardService.updateCard(card.id, updateData);

        // Bi lap lai nhieu
        //         const updateData = { title: card?.title, dueDate: null, dueComplete: false, dueReminder: -1 };
        //
        //         const newBoard = cloneDeep(board);
        //
        //         const column = newBoard.columns.find((col) => col.id === card.columnId);
        //         const activeCard = column.cards.find((c) => c.id === card.id);
        //
        //         Object.assign(activeCard, updateData);
        //
        //         column.cards = column.cards.filter((c) => c.id !== card.id);
        //         column.cardOrderIds = column.cardOrderIds.filter((cardId) => cardId !== card.uuid);
        //
        //         dispatch(updateBoardData(newBoard));
        //         cardService.updateCard(card?.id, updateData);
    };

    return (
        <Popover
            open={Boolean(anchorEl) && title === 'Dates'}
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
                    p: 1,
                }}
            >
                <DateCalendar value={dateCalendarValue} onChange={(value) => setDateCalendarValue(value)} />

                <FormControl fullWidth sx={{ mt: 2, flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                    <Checkbox sx={{ p: 0 }} />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                            value={dateCalendarValue}
                            sx={{ width: '116px' }}
                            size="small"
                            format="DD/MM/YYYY"
                            onChange={(value) => setDateCalendarValue(value)}
                        />
                        <TimePicker
                            defaultValue={dateCalendarValue}
                            sx={{
                                width: '125px',
                                '& .MuiOutlinedInput-input': {
                                    p: '8.5px 0px 8.5px 14px',
                                },
                            }}
                            onChange={(value) => setDateCalendarValue(value)}
                        />
                        {/* <TimePicker disablePast /> */}
                    </LocalizationProvider>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="demo-simple-select-helper-label">Set due date reminder</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label={'Set due date reminder'}
                        IconComponent={KeyboardArrowDownRoundedIcon}
                        defaultValue={'none'}
                        size="small"
                    >
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value={'owner'}>15 Minutes before</MenuItem>
                        <MenuItem value={'user'}>1 Day before</MenuItem>
                        <MenuItem value={'admin'}>2 Day before</MenuItem>
                    </Select>
                    <FormHelperText sx={{ width: '270px', m: 0, mt: 1 }}>
                        Reminders will be sent to all members and watchers of this card.
                    </FormHelperText>
                </FormControl>

                <Box
                    sx={{
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 1,
                    }}
                >
                    <Button variant="contained" sx={{ width: '100%' }} onClick={handleSave}>
                        Save
                    </Button>
                    <Button sx={{ width: '100%' }} onClick={handleRemove}>
                        Remove
                    </Button>
                </Box>
            </Box>
        </Popover>
    );
}

Dates.propTypes = {
    title: PropTypes.string,
    anchorEl: PropTypes.any,
    card: PropTypes.object,
    setCard: PropTypes.func,
    onClose: PropTypes.func,
};

export default Dates;
