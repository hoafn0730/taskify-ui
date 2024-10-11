import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotesIcon from '@mui/icons-material/Notes';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';

import Activity from './Activity';
import Attachment from './Attachment';
import Checklist from './Checklist';
import Description from './Description';
import Header from './Header';
import Section from './Section';
import TaskDetailHeader from './TaskDetailHeader';
import Modal from '~/components/Modal';
import { cardService } from '~/services/cardService';
import { checklistService } from '~/services/checklistService';
import UploadFile from './Attachment/UploadFile';
import { Divider, TextField, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';

function CardDetail() {
    const { slug } = useParams();
    const [card, setCard] = useState();
    const [checklists, setChecklists] = useState([]);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [url, setUrl] = useState(null);
    const [isUploadCover, setIsUploadCover] = useState(false);

    useEffect(() => {
        // Tim board.id === card.boardId
        cardService.getCardDetailBySlug(slug).then((res) => {
            setCard(res.data);
            setChecklists(res.data?.checklists);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (url) {
            const newCard = cloneDeep(card);
            newCard.cover = url;
            newCard.image = url.id + '';

            newCard.attachments = [...newCard.attachments, url];
            setCard(newCard);
            setUrl(null);
            setAnchorEl(null);
            setIsUploadCover(false);
        }
    }, [card, url]);

    const handleDeleteChecklist = (checklistId) => {
        checklistService.deleteChecklist(checklistId);
        setChecklists((prev) => prev.filter((item) => item.id !== checklistId));
    };

    return (
        <Modal>
            {!card && (
                <Box sx={{ display: 'flex', position: 'relative', height: '90vh' }}>
                    <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
                </Box>
            )}
            {card && (
                <>
                    {/* Header card */}
                    <Header title={card?.title} image={card?.cover} columnTitle={card?.column?.title} card={card} />
                    <Box>
                        <TaskDetailHeader
                            onUploadCover={(event) => {
                                setAnchorEl(event.currentTarget);
                                setIsUploadCover(true);
                            }}
                        />

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
                        <Section
                            title={'Attachments'}
                            icon={<AttachmentOutlinedIcon />}
                            button={<Button onClick={(event) => setAnchorEl(event.currentTarget)}>Add</Button>}
                        >
                            <Attachment card={card} attachments={card.attachments} />
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

                        <Section
                            title={'Activity'}
                            icon={<FormatListBulletedIcon />}
                            button={<Button>Show Details</Button>}
                        >
                            <Activity />
                        </Section>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant="h3" sx={{ fontSize: '14px', mb: 1 }}>
                                    Attach a file from your computer
                                </Typography>
                                <Typography sx={{ fontSize: '12px', mb: 3 }}>
                                    You can also drag and drop files to upload them.
                                </Typography>
                                <UploadFile cardId={card.id} isUploadCover={isUploadCover} setUrl={setUrl} />
                            </MenuItem>
                            <Divider />
                            <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant="h3" sx={{ fontSize: '14px', mb: 1 }}>
                                    Search or paste a link
                                </Typography>

                                <TextField
                                    // value={itemValue}
                                    data-no-dnd={true}
                                    variant="outlined"
                                    placeholder="Find recent links or paste a new link"
                                    sx={{
                                        mb: 1,
                                        width: '100%',
                                        '& .MuiOutlinedInput-root': {
                                            p: 0,
                                            fontSize: '1.1rem',
                                            width: '100%',
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            fontSize: '14px',
                                            p: '8px 16px',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {},
                                    }}
                                    // onChange={(e) => setItemValue(e.target.value)}
                                />
                            </MenuItem>
                        </Menu>
                    </Box>
                </>
            )}
        </Modal>
    );
}

export default CardDetail;
