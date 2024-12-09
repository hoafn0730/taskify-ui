import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotesIcon from '@mui/icons-material/Notes';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';

import Header from './Header';
import AttachmentAction from './Actions/AttachmentAction';
import Activity from './Section/Activity';
import Attachment from './Section/Attachment';
import Checklist from './Section/Checklist';
import Description from './Section/Description';
import Actions from './Actions';
import LoadingSpinner from '~/components/LoadingSpinner';
import Modal from '~/components/Modal';
import socket from '~/utils/socket';
import { checklistService } from '~/services/checklistService';
import { fetchCardDetail } from '~/store/actions/cardAction';
import { updateCardOnBoard } from '~/store/slices/boardSlice';
import { updateCardData } from '~/store/slices/cardSlice';
import Section from '~/components/Section';

function Card() {
    const location = useLocation();
    const navigate = useNavigate();
    const { slug } = useParams();
    const dispatch = useDispatch();
    const card = useSelector((state) => state.card.activeCard);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (!location?.state?.backgroundLocation) {
            return navigate(location?.pathname, {
                state: {
                    backgroundLocation: {
                        pathname: '/',
                        search: '',
                        hash: '',
                        state: null,
                        key: 'dkl4r4gx',
                    },
                },
                replace: true,
            });
        }

        dispatch(fetchCardDetail(slug));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/');
        }
    }

    return (
        <Modal open={!!location?.state} onClose={handleDismiss}>
            {!card && <LoadingSpinner caption="Card Loading..." />}
            {card && (
                <>
                    {/* Header card */}
                    <Header card={card} />

                    {/* Content */}
                    <Box>
                        <Actions card={card} />

                        <Section
                            title={'Description'}
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
                                title={'Attachments'}
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
                            title={'Activity'}
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
