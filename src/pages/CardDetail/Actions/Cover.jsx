import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Divider, Popover, TextField, Typography } from '@mui/material';
import UploadFile from '../Attachment/UploadFile';

function Cover({ title, anchorEl, card, setUrl, onClose }) {
    return (
        <Popover
            open={Boolean(anchorEl) && title === 'Cover'}
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
            <Box component={'header'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
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
                <UploadFile cardId={card.id} isUploadCover={true} setUrl={setUrl} />
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

Cover.propTypes = {
    title: PropTypes.string,
    card: PropTypes.object,
    anchorEl: PropTypes.any,
    setUrl: PropTypes.func,
    onClose: PropTypes.func,
};

export default Cover;
