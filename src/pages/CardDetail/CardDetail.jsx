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

import Activity from './Activity';
import Attachment from './Attachment';
import Checklist from './Checklist';
import Description from './Description';
import Header from './Header';
import Section from './Section';
import TaskDetailHeader from './TaskDetailHeader';
import Modal from '~/components/Modal';
import { checklistService } from '~/services/checklistService';
import AttachmentAction from './Actions/AttachmentAction';
import { updateCardData } from '~/store/slices/boardSlice';
import { fetchCardDetail } from '~/store/actions/cardAction';

function CardDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { slug } = useParams();
    const dispatch = useDispatch();
    const card = useSelector((state) => state.card.activeCard);

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
                newCard.cover = url;
                newCard.image = url.id + '';
                dispatch(updateCardData({ newCard }));
            }

            newCard.attachments = [...newCard.attachments, url];
            // setCard(newCard);
            setUrl(null);
            setAnchorEl(null);
        }
    }, [card, dispatch, url]);

    const handleDeleteChecklist = (checklistId) => {
        checklistService.deleteChecklist(checklistId);
        // setChecklists((prev) => prev.filter((item) => item.id !== checklistId));
    };

    function handleDismiss() {
        navigate(-1);
    }

    return (
        <Modal open={!!state} onClose={handleDismiss}>
            {!card && (
                <Box sx={{ display: 'flex', position: 'relative', height: '90vh' }}>
                    <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
                </Box>
            )}
            {card && (
                <>
                    {/* Header card */}
                    <Header title={card?.title} image={card?.cover} columnTitle={card?.column?.title} card={card} />

                    {/* Content */}
                    <Box>
                        <TaskDetailHeader card={card} setUrl={setUrl} />

                        <Section
                            title={'Description'}
                            icon={<NotesIcon />}
                            button={<Button onClick={() => setIsEditingDesc(true)}>Edit</Button>}
                        >
                            <Description
                                desc={card?.description}
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
                                <Attachment card={card} attachments={card.attachments} />
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

export default CardDetail;
