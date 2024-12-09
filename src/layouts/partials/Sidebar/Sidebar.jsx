import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import NavTabs from '~/components/NavTabs/NavTabs';
import { sendNotification } from '~/utils/notification';

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
            <Button
                size="small"
                sx={{
                    mt: 1,
                    px: 2,
                    py: 1,
                    color: '#444',
                    justifyContent: 'flex-start',
                }}
                fullWidth
                onClick={() => sendNotification({ slug: 'notification' })}
            >
                Click me!
            </Button>
        </Box>
    );
}

export default Sidebar;
