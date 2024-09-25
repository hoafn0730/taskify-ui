import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCard from '@mui/icons-material/AddCard';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createNewCard } from '~/store/actions/boardAction';

function Footer({ columnId, openNewCardForm, setOpenNewCardForm }) {
    const [newCardTitle, setNewCardTitle] = useState('');
    const dispatch = useDispatch();

    const toggleNewCardForm = () => setOpenNewCardForm((prev) => !prev);

    const handleAddNewCard = () => {
        if (newCardTitle.startsWith(' ')) return;
        if (!newCardTitle) {
            toast.error('Please enter card title!');
            return;
        }
        const newCardData = {
            title: newCardTitle,
            columnId: columnId,
        };

        dispatch(createNewCard(newCardData));

        toggleNewCardForm();
        setNewCardTitle('');
    };

    return (
        <Box
            sx={{
                // height: (theme) => theme.app.columnFooterHeight,
                p: 1,
            }}
        >
            {!openNewCardForm ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button startIcon={<AddCard />} onClick={toggleNewCardForm}>
                        Add new card
                    </Button>
                    <Tooltip title="drag to move">
                        <DragHandleIcon
                            sx={{
                                cursor: 'pointer',
                            }}
                        />
                    </Tooltip>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        bgcolor: '#ffffffed',
                        gap: 1,
                    }}
                >
                    <TextField
                        value={newCardTitle}
                        data-no-dnd={true}
                        label="Enter card title"
                        type="text"
                        variant="outlined"
                        size="small"
                        autoFocus
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.common.white
                                            : theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.common.white
                                            : theme.palette.primary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.common.white
                                            : theme.palette.primary.main,
                                },
                            },
                        }}
                        onChange={(e) => setNewCardTitle(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                            data-no-dnd={true}
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{
                                color: 'white',
                                boxShadow: 'none',
                                border: '0.5px solid',
                                borderColor: (theme) => theme.palette.success.main,
                                '&:hover': { bgcolor: (theme) => theme.palette.success.main },
                            }}
                            onClick={handleAddNewCard}
                        >
                            Add New Card
                        </Button>
                        <CloseIcon
                            sx={{
                                color: (theme) =>
                                    theme.palette.mode === 'dark'
                                        ? theme.palette.common.white
                                        : theme.palette.primary.main,
                                cursor: 'pointer',
                                '&:hover': { color: (theme) => theme.palette.warning.light },
                            }}
                            onClick={() => {
                                toggleNewCardForm();
                                setNewCardTitle('');
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

Footer.propTypes = {
    columnId: PropTypes.number,
    openNewCardForm: PropTypes.bool,
    setOpenNewCardForm: PropTypes.func,
};

export default Footer;
