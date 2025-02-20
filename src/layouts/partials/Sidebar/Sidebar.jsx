import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import CreateBoard from './CreateBoard';
import Pricing from './Pricing';
import NavTabs from '~/components/NavTabs/NavTabs';

function Sidebar() {
    const workspace = useSelector((state) => state.workspace.activeWorkspace);

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
            <Typography variant="h3" sx={{ fontSize: '16px', mx: 2, mt: 1 }}>
                {workspace?.title.toUpperCase()}
            </Typography>
            <Pricing />
        </Box>
    );
}

export default Sidebar;
