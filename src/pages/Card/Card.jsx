import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotesIcon from '@mui/icons-material/Notes';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';
import Section from './Section';
import TaskDetailHeader from './TaskDetailHeader';
import Activity from './Section/Activity';
import Attachment from './Section/Attachment';
import Checklist from './Section/Checklist';
import Description from './Section/Description';
import Modal from '~/components/Modal';
import { checklistService } from '~/services/checklistService';
import AttachmentAction from './Actions/AttachmentAction';
import { fetchCardDetail } from '~/store/actions/cardAction';
import socket from '~/utils/socket';
import LoadingSpinner from '~/components/LoadingSpinner';
import { updateCardData } from '~/store/slices/cardSlice';
import findCard from '~/utils/findCard';
import { updateBoardData } from '~/store/slices/boardSlice';

function Card() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { slug } = useParams();
    const dispatch = useDispatch();
    const card = useSelector((state) => state.card.activeCard);
    const board = useSelector((state) => state.board.activeBoard);

    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [url, setUrl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        // Tim board.id === card.boardId
        dispatch(fetchCardDetail(slug));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (url) {
            const newCard = cloneDeep(card);

            if (url.cover) {
                const newBoard = cloneDeep(board);
                newCard.cover = url.data;
                newCard.image = url.data.id + '';

                const card = findCard(newCard, newBoard);
                card.cover = url.data;
                card.image = url.data.id + '';

                dispatch(updateBoardData(newBoard));
            }

            newCard.attachments = [...newCard.attachments, url.data];

            dispatch(updateCardData(newCard));
            setUrl(null);
            setAnchorEl(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, url]);

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
        // setChecklists((prev) => prev.filter((item) => item.id !== checklistId));
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
                        <TaskDetailHeader card={card} setUrl={setUrl} />

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
                                    <Checklist checklist={checklist} checkItems={checklist.checkItems} />
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
                        setUrl={setUrl}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                    />
                </>
            )}
        </Modal>
    );
}

export default Card;
