import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import UploadFile from '../../../components/UploadFile';
import LoadingSpinner from '~/components/LoadingSpinner';
import { attachmentService } from '~/services/attachmentService';
import { convertBase64 } from '~/utils/convertBase64';
import { updateCardData } from '~/store/slices/cardSlice';
import { updateCardOnBoard } from '~/store/slices/boardSlice';

function AttachmentAction({ title, anchorEl, card, onClose }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleUploadFile = async (e) => {
        const files = e.target.files;

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            setLoading(true);

            attachmentService
                .createNewAttachment({
                    cardId: card.id,
                    cover: title === 'Cover',
                    fileName: files[0].name,
                    file: base64,
                })
                .then((res) => {
                    const newCard = cloneDeep(card);
                    newCard.attachments = [...newCard.attachments, res];

                    if (title === 'Cover') {
                        newCard.cover = res;
                        newCard.image = res.id + '';

                        dispatch(updateCardOnBoard(newCard));
                    }

                    dispatch(updateCardData(newCard));
                    onClose();
                    setLoading(false);
                });
        }
    };

    return (
        <Popover
            open={Boolean(anchorEl) && (title === 'Attachment' || title === 'Cover')}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box
                component={'header'}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: '4px 8px' }}
            >
                <Typography variant="h2" sx={{ fontSize: '14px', fontWeight: 600, color: '#44546f' }}>
                    {title}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    px: 2,
                    py: 1,
                }}
            >
                <Typography variant="h3" sx={{ fontSize: '14px', mb: 1 }}>
                    Attach a file from your computer
                </Typography>
                <Typography sx={{ fontSize: '12px', mb: 3 }}>
                    You can also drag and drop files to upload them.
                </Typography>
                {loading ? <LoadingSpinner caption="Loading..." /> : <UploadFile onChange={handleUploadFile} />}
            </Box>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    px: 2,
                    py: 1,
                }}
            >
                <Typography variant="h3" sx={{ fontSize: '14px', mb: 1 }}>
                    Search or paste a link
                </Typography>

                <TextField
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
                />
            </Box>
        </Popover>
    );
}

AttachmentAction.propTypes = {
    title: PropTypes.string,
    isCover: PropTypes.bool,
    card: PropTypes.object,
    anchorEl: PropTypes.any,
    setUrl: PropTypes.func,
    onClose: PropTypes.func,
};

export default AttachmentAction;
