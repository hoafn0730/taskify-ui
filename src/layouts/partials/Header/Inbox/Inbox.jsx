import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Badge from '@mui/material/Badge';
import MenuList from '@mui/material/MenuList';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/Inbox';

import InboxItem from './InboxItem';
import Popover from '~/components/Popover';
import socket from '~/utils/socket';
import { notificationService } from '~/services/notificationService';

function Inbox() {
    const { t } = useTranslation('header');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [notifications, setNotifications] = useState([]);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        notificationService.getNotifications().then((res) => {
            setNotifications(res.data);
        });

        socket.on('notification', (data) => {
            console.log('🚀 ~ socket.on ~ data:', data);
        });
        return () => {
            socket.off('notification', (data) => {
                console.log('🚀 ~ socket.on ~ data:', data);
            });
        };
    }, []);

    return (
        <Popover
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            render={
                <>
                    <Popover.Header title={t('inbox.title')} buttonTitle={t('inbox.buttonTitle')} />
                    <MenuList>
                        {/* Empty notifications */}
                        {!notifications.length && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    gap: 2,
                                    height: '300px',
                                    justifyContent: 'center',
                                }}
                            >
                                <img src="https://trello.com/assets/ee2660df9335718b1a80.svg" alt="" />
                                <Typography variant="h3" sx={{ fontSize: '1.2rem' }}>
                                    No notifications
                                </Typography>
                            </Box>
                        )}
                        {notifications.length > 0 &&
                            notifications.map((item) => <InboxItem key={item.id} data={item} />)}
                    </MenuList>
                </>
            }
            transformOrigin={{ vertical: -18, horizontal: 0 }}
        >
            <Tooltip title={t('inbox.title')}>
                <Badge color="error" badgeContent={notifications.length} sx={{ cursor: 'pointer' }}>
                    <InboxIcon onClick={handleClick} />
                </Badge>
            </Tooltip>
        </Popover>
    );
}

export default Inbox;
