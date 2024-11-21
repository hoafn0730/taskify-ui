import Box from '@mui/material/Box';
import NavTabs from '../NavTabs/NavTabs';

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
        </Box>
    );
}

export default Sidebar;
