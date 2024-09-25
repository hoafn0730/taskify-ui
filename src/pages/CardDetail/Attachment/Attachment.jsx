import Box from '@mui/material/Box';

import AttachmentItem from './AttachmentItem';

function Attachment() {
    return (
        <Box sx={{ ml: '32px', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <AttachmentItem />
            <AttachmentItem />
        </Box>
    );
}

export default Attachment;
