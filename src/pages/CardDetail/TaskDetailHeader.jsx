import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AttachmentIcon from '@mui/icons-material/Attachment';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
// import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';

import { updateCard } from '~/store/actions/boardAction';
import Dates from './Actions/Dates';
import ChecklistAction from './Actions/ChecklistAction';
import AttachmentAction from './Actions/AttachmentAction';

function TaskDetailHeader({ card, setUrl, setCard }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorButtonActions, setAnchorButtonActions] = useState(null);
    const [actionButton, setActionButton] = useState(null);
    const timeDifference = dayjs(card?.dueDate).valueOf() - dayjs().valueOf();

    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckDueComplete = (e) => {
        const newCard = cloneDeep(card);

        newCard.dueComplete = e.target.checked;
        setCard(newCard);

        dispatch(
            updateCard({
                columnId: card?.columnId,
                cardId: card?.id,
                data: {
                    title: card?.title,
                    dueComplete: e.target.checked,
                },
            }),
        );
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: '40px' }}>
                <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', columnGap: 1, rowGap: 1 }}>
                    {/* Members, Labels, Notifications, Due date */}

                    {/* Notifications */}
                    <Box component={'section'}>
                        <Typography variant="span" sx={{ fontSize: '12px', fontWeight: '600' }}>
                            Notifications
                        </Typography>
                        <Box sx={{ mt: 1.5 }}>
                            <Button startIcon={<RemoveRedEyeOutlinedIcon fontSize="small" />}>Watch</Button>
                        </Box>
                    </Box>
                    {/* Members */}
                    <Box component={'section'}>
                        <Typography
                            variant="span"
                            sx={{ fontSize: '12px', fontWeight: '600', alignItems: 'flex-start' }}
                        >
                            Members
                        </Typography>
                        <Box sx={{ mt: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar
                                    sx={{ width: 38, height: 38 }}
                                    alt="Remy Sharp"
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                                <Button sx={{ p: 0.5, width: 38, height: 38, minWidth: 'auto', borderRadius: '50%' }}>
                                    <AddIcon />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    {/* Due date */}
                    {card?.dueDate && (
                        <Box component={'section'}>
                            <Typography variant="span" sx={{ fontSize: '12px', fontWeight: '600' }}>
                                Due date
                            </Typography>
                            <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1, height: '36px' }}>
                                <Checkbox sx={{ p: 0 }} checked={card?.dueComplete} onChange={handleCheckDueComplete} />
                                <Typography variant="span">{dayjs(card?.dueDate).format('MMM D, h:mm A')}</Typography>

                                {card?.dueComplete && (
                                    <Typography
                                        variant="span"
                                        sx={{
                                            px: 1,
                                            py: 0.1,
                                            bgcolor: 'primary.main',
                                            color: 'common.white',
                                            borderRadius: 1,
                                        }}
                                    >
                                        Complete
                                    </Typography>
                                )}

                                {timeDifference > 0 && timeDifference < 300000 && !card?.dueComplete && (
                                    <Typography
                                        variant="span"
                                        sx={{
                                            px: 1,
                                            py: 0.1,
                                            bgcolor: 'orange',
                                            color: 'common.white',
                                            borderRadius: 1,
                                        }}
                                    >
                                        Due soon
                                    </Typography>
                                )}

                                {dayjs(card?.dueDate).valueOf() < dayjs(new Date()).valueOf() && !card?.dueComplete && (
                                    <Typography
                                        variant="span"
                                        sx={{
                                            px: 1,
                                            py: 0.1,
                                            bgcolor: 'red',
                                            color: 'common.white',
                                            borderRadius: 1,
                                        }}
                                    >
                                        Overdue
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
                <Button
                    sx={{
                        height: 'fit-content',
                        minWidth: 'auto',
                    }}
                    onClick={handleClick}
                >
                    Actions
                </Button>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{ ml: 1 }}
            >
                <MenuItem
                    sx={{
                        '&:hover': {
                            '& .delete-icon': {
                                color: 'warning.dark',
                            },
                        },
                    }}
                >
                    <ListItemIcon>
                        <PersonAddAltOutlinedIcon fontSize="small" />
                        {/* <PersonRemoveOutlinedIcon fontSize="small" className="delete-icon" /> */}
                    </ListItemIcon>
                    <ListItemText>Join</ListItemText>
                    {/* <ListItemText>Leave</ListItemText> */}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PersonOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Members</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={(event) => {
                        setActionButton('Dates');
                        setAnchorButtonActions(event.currentTarget);
                    }}
                >
                    <ListItemIcon>
                        <AccessTimeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Dates</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <LocalOfferOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Labels</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={(event) => {
                        setActionButton('Checklist');
                        setAnchorButtonActions(event.currentTarget);
                    }}
                >
                    <ListItemIcon>
                        <CheckBoxOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Checklist</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={(event) => {
                        setActionButton('Attachment');
                        setAnchorButtonActions(event.currentTarget);
                    }}
                >
                    <ListItemIcon>
                        <AttachmentIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Attachment</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={(event) => {
                        setActionButton('Cover');
                        setAnchorButtonActions(event.currentTarget);
                    }}
                >
                    <ListItemIcon>
                        <AddPhotoAlternateOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cover</ListItemText>
                </MenuItem>
            </Menu>
            <Dates
                title={actionButton}
                anchorEl={anchorButtonActions}
                card={card}
                setCard={setCard}
                onClose={() => setAnchorButtonActions(null)}
            />

            <AttachmentAction
                isCover={actionButton === 'Cover'}
                title={actionButton}
                anchorEl={anchorButtonActions}
                card={card}
                setUrl={setUrl}
                onClose={() => setAnchorButtonActions(null)}
            />
            <ChecklistAction
                title={actionButton}
                anchorEl={anchorButtonActions}
                card={card}
                setCard={setCard}
                onClose={() => setAnchorButtonActions(null)}
            />
        </>
    );
}

TaskDetailHeader.propTypes = {
    card: PropTypes.object,
    setUrl: PropTypes.func,
    setCard: PropTypes.func,
};

export default TaskDetailHeader;
