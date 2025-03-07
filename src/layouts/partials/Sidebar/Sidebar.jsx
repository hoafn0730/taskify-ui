import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import CreateBoard from './CreateBoard';
import Pricing from './Pricing';
import NavTabs from '~/components/NavTabs/NavTabs';

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
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <NavTabs />
            <Divider />
            <CreateBoard />
            <Divider />
            <Pricing />
        </Box>
    );
}

export default Sidebar;
