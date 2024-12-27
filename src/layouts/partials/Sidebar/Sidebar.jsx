import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import NavTabs from '~/components/NavTabs/NavTabs';
import { sendNotification } from '~/utils/notification';
import { fetchWorkspace } from '~/store/actions/workspaceAction';
import Pricing from './Pricing';

function Sidebar() {
    const dispatch = useDispatch();
    const workspace = useSelector((state) => state.workspace.activeWorkspace);

    useEffect(() => {
        dispatch(fetchWorkspace());
    }, [dispatch]);

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
            <Typography variant="h3" sx={{ fontSize: '16px', mx: 2, mt: 1 }}>
                {workspace?.title.toUpperCase()}
            </Typography>
            {/* <List>
                {workspace?.boards.length > 0 &&
                    workspace.boards.map((board) => (
                        <ListItem key={board.id}>
                            <Typography variant="span" sx={{ fontSize: '14px' }}>
                                {workspace.title}
                            </Typography>
                        </ListItem>
                    ))}
            </List> */}
            <Pricing />
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
