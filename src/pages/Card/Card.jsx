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
import Section from './Section';
import AttachmentAction from './Actions/AttachmentAction';
import Activity from './Section/Activity';
import Attachment from './Section/Attachment';
import Checklist from './Section/Checklist';
import Description from './Section/Description';
import TaskDetailHeader from './TaskDetailHeader';
import LoadingSpinner from '~/components/LoadingSpinner';
import Modal from '~/components/Modal';
import socket from '~/utils/socket';
import { checklistService } from '~/services/checklistService';
import { fetchCardDetail } from '~/store/actions/cardAction';
import { updateCardOnBoard } from '~/store/slices/boardSlice';
import { updateCardData } from '~/store/slices/cardSlice';

function Card() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { slug } = useParams();
    const dispatch = useDispatch();
    const card = useSelector((state) => state.card.activeCard);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        dispatch(fetchCardDetail(slug));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket.on('receiveComment', (data) => {
            console.log(data);
        });

        return () =>
            socket.off('receiveComment', (arg) => {
                console.log(arg);
            });
    }, []);

    const handleDeleteChecklist = (checklistId) => {
        checklistService.deleteChecklist(checklistId);
        const newCard = cloneDeep(card);
        const newChecklists = newCard.checklists.filter((item) => item.id !== checklistId);
        newCard.checklists = newChecklists;

        dispatch(updateCardOnBoard(newCard));
        dispatch(updateCardData(newCard));
    };

    function handleDismiss() {
        navigate(-1);
    }

    return (
        <Modal open={!!state} onClose={handleDismiss}>
            {!card && <LoadingSpinner caption="Card Loading..." />}
            {card && (
                <>
                    {/* Header card */}
                    <Header card={card} />

                    {/* Content */}
                    <Box>
                        <TaskDetailHeader card={card} />

                        <Section
                            title={'Description'}
                            icon={<NotesIcon />}
                            button={<Button onClick={() => setIsEditingDesc(true)}>Edit</Button>}
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
                                button={<Button onClick={(e) => setAnchorEl(e.currentTarget)}>Add</Button>}
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
                                    button={<Button onClick={() => handleDeleteChecklist(checklist.id)}>Delete</Button>}
                                >
                                    <Checklist checklistId={checklist.id} checkItems={checklist.checkItems} />
                                </Section>
                            ))}

                        {/* Activity */}
                        <Section
                            title={'Activity'}
                            icon={<FormatListBulletedIcon />}
                            button={<Button>Show Details</Button>}
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
