import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NotesIcon from '@mui/icons-material/Notes';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';

import Header from './Header';
import Actions from './Actions';
import Activity from './Section/Activity';
import Checklist from './Section/Checklist';
import Attachment from './Section/Attachment';
import Description from './Section/Description';
import AttachmentAction from './Actions/AttachmentAction';
import Modal from '~/components/Modal';
import Section from '~/components/Section';
import LoadingSpinner from '~/components/LoadingSpinner';
import socket from '~/utils/socket';
import { checklistService } from '~/services/checklistService';
import { updateCardData } from '~/store/slices/cardSlice';
import { fetchCardDetail } from '~/store/actions/cardAction';
import { updateCardOnBoard } from '~/store/slices/boardSlice';

function Card() {
    const { t } = useTranslation('card');
    const location = useLocation();
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const card = useSelector((state) => state.card.activeCard);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        dispatch(fetchCardDetail(slug));
    }, [dispatch, slug]);

    useEffect(() => {
        if (!location?.state?.backgroundLocation || location?.state?.backgroundLocation.pathname === '/') {
            return navigate(location?.pathname, {
                state: {
                    backgroundLocation: {
                        pathname: '/board/' + card?.board?.slug,
                    },
                },
                replace: true,
            });
        }
    }, [card, location, navigate]);

    useEffect(() => {
        const newCard = cloneDeep(card);
        if (!newCard) return;

        socket.on('receiveComment', (data) => {
            newCard.comments = [data.comment, ...newCard.comments];
            dispatch(updateCardData(newCard));
        });

        return () => {
            socket.off('receiveComment');
        };
    }, [card, dispatch]);

    const handleDeleteChecklist = (checklistId) => {
        checklistService.deleteChecklist(checklistId);
        const newCard = cloneDeep(card);
        const newChecklists = newCard.checklists.filter((item) => item.id !== checklistId);
        newCard.checklists = newChecklists;

        dispatch(updateCardOnBoard(newCard));
        dispatch(updateCardData(newCard));
    };

    function handleDismiss() {
        navigate('/board/' + card.board.slug);
    }

    return (
        <Modal open={!!location?.state} onClose={handleDismiss}>
            {!card && <LoadingSpinner caption={t('cardLoading')} />}
            {card && (
                <>
                    {/* Header card */}
                    <Header card={card} />

                    {/* Content */}
                    <Box>
                        <Actions card={card} />

                        <Section
                            title={t('description')}
                            icon={<NotesIcon />}
                            action={<Button onClick={() => setIsEditingDesc(true)}>Edit</Button>}
                        >
                            <Description
                                isEditingDesc={isEditingDesc}
                                setIsEditingDesc={setIsEditingDesc}
                                card={card}
                            />
                        </Section>

                        {/* Attachment */}
                        {card?.attachments.length > 0 && (
                            <Section
                                title={t('attachments')}
                                icon={<AttachmentOutlinedIcon />}
                                action={<Button onClick={(e) => setAnchorEl(e.currentTarget)}>Add</Button>}
                            >
                                <Attachment card={card} />
                            </Section>
                        )}

                        {/* Checklist */}
                        {card?.checklists?.length > 0 &&
                            card?.checklists?.map((checklist) => (
                                <Section
                                    key={checklist.id}
                                    title={checklist.title}
                                    icon={<ChecklistIcon />}
                                    action={<Button onClick={() => handleDeleteChecklist(checklist.id)}>Delete</Button>}
                                >
                                    <Checklist checklistId={checklist.id} checkItems={checklist.checkItems} />
                                </Section>
                            ))}

                        {/* Activity */}
                        <Section
                            title={t('activity')}
                            icon={<FormatListBulletedIcon />}
                            action={<Button>Show Details</Button>}
                        >
                            <Activity />
                        </Section>
                    </Box>
                    <AttachmentAction
                        title={'Attachment'}
                        card={card}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                    />
                </>
            )}
        </Modal>
    );
}

export default Card;
