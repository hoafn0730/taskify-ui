import { useEffect } from 'react';
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

function CardDetail() {
    useEffect(() => {
        // Tim board.id === card.boardId
        // cardService.getCardDetail(slug).then((res) => setCard(res.data));
    }, []);

    return (
        <Modal>
            {/* Header card */}
            <Header />
            <Box>
                <TaskDetailHeader />

                <Section title={'Description'} icon={<NotesIcon />} button={<Button>Edit</Button>}>
                    <Description />
                </Section>
                <Section title={'Attachments'} icon={<AttachmentOutlinedIcon />} button={<Button>Add</Button>}>
                    <Attachment />
                </Section>
                <Section title={'Checklist'} icon={<ChecklistIcon />} button={<Button>Delete</Button>}>
                    <Checklist />
                </Section>
                <Section title={'Activity'} icon={<FormatListBulletedIcon />} button={<Button>Show Details</Button>}>
                    <Activity />
                </Section>
            </Box>
        </Modal>
    );
}

export default CardDetail;
