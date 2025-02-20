import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

import { boardService } from '~/services/boardService';
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators';
import Modal from '~/components/Modal';

function CreateBoard() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitCreateBoard = (data) => {
        const { title, description, type } = data;

        toast
            .promise(
                boardService.createNewBoard({
                    title: title.trim(),
                    description: description.trim(),
                    type,
                    image: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg',
                }),
                {
                    pending: 'Create new board is in progress...',
                },
            )
            .then((board) => navigate(`/board/${board.slug}`));
    };

    const handleGenerateBoard = () => {
        boardService.generateBoard({ content: getValues().description }).then((res) => navigate(`/board/${res.slug}`));
    };

    return (
        <Box>
            <Button
                size="small"
                sx={{
                    mt: 1,
                    px: 2,
                    py: 1,
                    color: '#444',
                    justifyContent: 'flex-start',
                }}
                fullWidth
                onClick={handleOpen}
                startIcon={<AddBoxRoundedIcon />}
            >
                Create New Board
            </Button>

            {/* Create board modal */}
            <Modal open={open} title="Create new board" onClose={handleClose} size="small">
                <Fade in={open}>
                    <form onSubmit={handleSubmit(submitCreateBoard)}>
                        <FormControl sx={{ marginTop: '1em' }} fullWidth>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Board Title"
                                type="text"
                                variant="outlined"
                                error={!!errors['title']}
                                {...register('title', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                })}
                            />
                        </FormControl>
                        <FormControl sx={{ marginTop: '1em' }} fullWidth>
                            <TextField
                                fullWidth
                                label="Description"
                                type="text"
                                variant="outlined"
                                multiline
                                rows={5}
                                error={!!errors['description']}
                                {...register('description', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                })}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ marginTop: '1em' }} error={!!errors['type']}>
                            <InputLabel id="select-label">Visibility</InputLabel>
                            <Select
                                labelId="select-label"
                                label="Visibility"
                                defaultValue={'public'}
                                {...register('type', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                })}
                            >
                                <MenuItem value={'public'}>Public</MenuItem>
                                <MenuItem value={'private'}>Private</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{ marginTop: '1em' }}
                        >
                            Create
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            size="large"
                            fullWidth
                            sx={{ marginTop: '1em' }}
                            onClick={handleGenerateBoard}
                        >
                            Generate
                        </Button>
                    </form>
                </Fade>
            </Modal>
        </Box>
    );
}

export default CreateBoard;
