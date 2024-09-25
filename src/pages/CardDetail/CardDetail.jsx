import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotesIcon from '@mui/icons-material/Notes';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import CloseIcon from '@mui/icons-material/Close';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import Section from './Section';
import Checklist from './Checklist';
import Attachment from './Attachment';
import Activity from './Activity';
import Description from './Description';
import TaskDetailHeader from './TaskDetailHeader';
import Header from './Header';

function CardDetail() {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state || { pathname: '/', search: '', hash: '', state: null };

    useEffect(() => {
        if (!state?.backgroundLocation) {
            navigate(`/card/${'data.slug'}`, { state: { backgroundLocation: state } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleDismiss() {
        navigate(state?.backgroundLocation?.pathname);
    }

    return (
        <Modal
            open={!!state}
            onClose={handleDismiss}
            data-no-dnd={true}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                overflowY: 'auto',
                scrollbarGutter: 'stable',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: 768,
                    minHeight: '600px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 4,
                    p: 2,
                    pt: 0,
                    outline: 0,
                    my: '48px',
                }}
            >
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
                    <Section
                        title={'Activity'}
                        icon={<FormatListBulletedIcon />}
                        button={<Button>Show Details</Button>}
                    >
                        <Activity />
                    </Section>
                </Box>
                <Button
                    sx={{
                        p: 0.8,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        borderRadius: '50%',
                        minWidth: 'auto',
                    }}
                    onClick={handleDismiss}
                >
                    <CloseIcon />
                </Button>
            </Box>
        </Modal>
    );
}

export default CardDetail;
