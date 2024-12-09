import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

import LinkTab from './LinkTab';
import Modal from '../Modal';
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators';
import { boardService } from '~/services/boardService';

function samePageLinkNavigation(event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

function NavTabs() {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let page;
        if (location.pathname === '/') {
            page = 0;
        } else if (location.pathname === '/boards') {
            page = 1;
        } else if (location.pathname === '/templates') {
            page = 2;
        }
        setValue(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (event.type !== 'click' || (event.type === 'click' && samePageLinkNavigation(event))) {
            setValue(newValue);
        }
    };

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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Tabs
                value={value}
                sx={{
                    '& .MuiTab-root': {
                        justifyContent: 'flex-start',
                        minHeight: 'auto',
                        textTransform: 'none',
                        fontWeight: '500',
                    },
                }}
                orientation="vertical"
                aria-label="nav tabs"
                role="navigation"
                onChange={handleChange}
            >
                <LinkTab icon={<HomeRoundedIcon fontSize="small" />} iconPosition="start" label="Home" to="/" />
                <LinkTab
                    icon={<DashboardRoundedIcon fontSize="small" />}
                    iconPosition="start"
                    label="Boards"
                    to="/boards"
                />
                <LinkTab
                    icon={<DashboardCustomizeRoundedIcon fontSize="small" />}
                    label="Templates"
                    iconPosition="start"
                    to="/templates"
                />
            </Tabs>
            <Divider />

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
                        </form>
                    </Fade>
                </Modal>
            </Box>
        </Box>
    );
}

export default NavTabs;
