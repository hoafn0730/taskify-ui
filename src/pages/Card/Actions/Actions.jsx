import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import Dates from './Dates';
import ChecklistAction from './ChecklistAction';
import AttachmentAction from './AttachmentAction';
import { cardService } from '~/services/cardService';
import { updateCardData } from '~/store/slices/cardSlice';
import { updateCardOnBoard } from '~/store/slices/boardSlice';
import Menu from '~/components/Menu';

function Actions({ card }) {
    const { t } = useTranslation('card');
    const dispatch = useDispatch();
    const board = useSelector((state) => state.board.activeBoard);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorButtonActions, setAnchorButtonActions] = useState(null);
    const [actionButton, setActionButton] = useState(null);
    const timeDifference = dayjs(card?.dueDate).valueOf() - dayjs().valueOf();

    const actionsMenu = [
        {
            title: 'Join',
            icon: <PersonAddAltOutlinedIcon fontSize="small" />,
            type: 'join',
        },
        {
            title: t('actions.menu.members'),
            icon: <PersonOutlineIcon fontSize="small" />,
            type: 'members',
        },
        {
            title: t('actions.menu.dates'),
            icon: <AccessTimeIcon fontSize="small" />,
            type: 'dates',
        },
        {
            title: t('actions.menu.labels'),
            icon: <LocalOfferOutlinedIcon fontSize="small" />,
            type: 'labels',
        },
        {
            title: t('actions.menu.checklist'),
            icon: <CheckBoxOutlinedIcon fontSize="small" />,
            type: 'checklist',
        },
        {
            title: t('actions.menu.attachments'),
            icon: <AttachmentIcon fontSize="small" />,
            type: 'attachments',
        },
        {
            title: t('actions.menu.cover'),
            icon: <AddPhotoAlternateOutlinedIcon fontSize="small" />,
            type: 'cover',
        },
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCheckDueComplete = (e) => {
        const updateData = {
            dueComplete: e.target.checked,
        };

        const newCard = cloneDeep(card);
        newCard.dueComplete = e.target.checked;

        dispatch(updateCardData(newCard));
        board && dispatch(updateCardOnBoard(newCard));

        cardService.updateCard(card.id, updateData);
    };

    const handleMenuChange = (menuItem, e) => {
        setAnchorButtonActions(e.currentTarget);
        switch (menuItem.type) {
            case 'dates':
                setActionButton('Dates');
                break;
            case 'checklist':
                setActionButton('Checklist');
                break;
            case 'attachment':
                setActionButton('Attachment');
                break;
            case 'cover':
                setActionButton('Cover');
                break;
            default:
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pl: '40px',
                }}
            >
                <Box
                    sx={{
                        mb: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        columnGap: 1,
                        rowGap: 1,
                    }}
                >
                    {/* Members, Labels, Notifications, Due date */}

                    {/* Notifications */}
                    <Box component={'section'}>
                        <Typography variant="span" sx={{ fontSize: '12px', fontWeight: '600' }}>
                            {t('actions.notifications')}
                        </Typography>
                        <Box sx={{ mt: 1.5 }}>
                            <Button startIcon={<RemoveRedEyeOutlinedIcon fontSize="small" />}>
                                {t('actions.watch')}
                            </Button>
                        </Box>
                    </Box>
                    {/* Members */}
                    <Box component={'section'}>
                        <Typography
                            variant="span"
                            sx={{
                                fontSize: '12px',
                                fontWeight: '600',
                                alignItems: 'flex-start',
                            }}
                        >
                            {t('actions.members')}
                        </Typography>
                        <Box sx={{ mt: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar
                                    sx={{ width: 38, height: 38 }}
                                    alt="Remy Sharp"
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                                <Button
                                    sx={{
                                        p: 0.5,
                                        width: 38,
                                        height: 38,
                                        minWidth: 'auto',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <AddIcon />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    {/* Due date */}
                    {card?.dueDate && (
                        <Box component={'section'}>
                            <Typography variant="span" sx={{ fontSize: '12px', fontWeight: '600' }}>
                                {t('actions.dueDate')}
                            </Typography>
                            <Box
                                sx={{
                                    mt: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    height: '36px',
                                }}
                            >
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
                                        {t('actions.complete')}
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
                                        {t('actions.dueSoon')}
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
                                        {t('actions.overdue')}
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
                items={actionsMenu}
                onClose={() => setAnchorEl(null)}
                onChange={handleMenuChange}
            />

            <Dates
                title={actionButton}
                anchorEl={anchorButtonActions}
                card={card}
                onClose={() => setAnchorButtonActions(null)}
            />

            <AttachmentAction
                isCover={actionButton === 'Cover'}
                title={actionButton}
                anchorEl={anchorButtonActions}
                card={card}
                onClose={() => setAnchorButtonActions(null)}
            />
            <ChecklistAction
                title={actionButton}
                anchorEl={anchorButtonActions}
                card={card}
                onClose={() => setAnchorButtonActions(null)}
            />
        </>
    );
}

Actions.propTypes = {
    card: PropTypes.object,
    setUrl: PropTypes.func,
};

export default Actions;
