import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotesIcon from '@mui/icons-material/Notes';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';

import Activity from './Activity';
import Attachment from './Attachment';
import Checklist from './Checklist';
import Description from './Description';
import Header from './Header';
import Section from './Section';
import TaskDetailHeader from './TaskDetailHeader';
import Modal from '~/components/Modal';
import { useParams } from 'react-router-dom';
import { cardService } from '~/services/cardService';
import { checklistService } from '~/services/checklistService';

function CardDetail() {
    const { slug } = useParams();
    const [card, setCard] = useState();
    const [checklists, setChecklists] = useState([]);
    const [isEditingDesc, setIsEditingDesc] = useState(false);

    useEffect(() => {
        // Tim board.id === card.boardId
        cardService.getCardDetailBySlug(slug).then((res) => {
            setCard(res.data);
            setChecklists(res.data?.checklists);
        });
    }, []);

    const handleDeleteChecklist = (checklistId) => {
        checklistService.deleteChecklist(checklistId);
        setChecklists((prev) => prev.filter((item) => item.id !== checklistId));
    };

    return (
        <Modal>
            {/* Header card */}
            <Header title={card?.title} image={card?.image} columnTitle={card?.column?.title} card={card} />
            <Box>
                <TaskDetailHeader />

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
                <Section title={'Attachments'} icon={<AttachmentOutlinedIcon />} button={<Button>Add</Button>}>
                    <Attachment />
                </Section>
                {/* Checklist */}
                {checklists?.length > 0 &&
                    checklists.map((checklist) => (
                        <Section
                            key={checklist.id}
                            title={checklist.title}
                            icon={<ChecklistIcon />}
                            button={<Button onClick={() => handleDeleteChecklist(checklist.id)}>Delete</Button>}
                        >
                            <Checklist checklist={checklist} checkItems={checklist.checkItems} />
                        </Section>
                    ))}

                {/* <Section title={'Activity'} icon={<FormatListBulletedIcon />} button={<Button>Show Details</Button>}>
                    <Activity />
                </Section> */}
            </Box>
        </Modal>
    );
}

export default CardDetail;
