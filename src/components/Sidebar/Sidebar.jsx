import NavTabs from '../NavTabs/NavTabs';
import { Box, Divider } from '@mui/material';

function Sidebar() {
    return (
        <Box
            sx={{
                margin: '40px 0 0',
                maxHeight: '90vh',
                padding: '0 16px',
                position: 'sticky',
                top: '40px',
                width: '256px',
            }}
        >
            <NavTabs />
            <Divider />
        </Box>
    );
}

export default Sidebar;
