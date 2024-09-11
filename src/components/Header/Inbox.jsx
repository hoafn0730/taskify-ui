import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Badge from '@mui/material/Badge';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Cloud from '@mui/icons-material/Cloud';
import ContentPaste from '@mui/icons-material/ContentPaste';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import InboxIcon from '@mui/icons-material/Inbox';

import Popover from '../Popover';
import { Box } from '@mui/material';

function Inbox() {
    const { t } = useTranslation('header');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

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
                        {/* <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: 2,
                                mt: '16px',
                                justifyContent: 'center',
                            }}
                        >
                            <img src="https://trello.com/assets/ee2660df9335718b1a80.svg" alt="" />
                            <Typography variant="h3" sx={{ fontSize: '1.2rem' }}>
                                No notifications
                            </Typography>
                        </Box> */}
                        {Array(1)
                            .fill(0)
                            .map((item) => (
                                <Box key={item}>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <ContentCut fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Cut</ListItemText>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            ⌘X {item}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <ContentCopy fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Copy</ListItemText>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            ⌘C
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <ContentPaste fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Paste</ListItemText>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            ⌘V
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Cloud fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Web Clipboard</ListItemText>
                                    </MenuItem>
                                </Box>
                            ))}
                    </MenuList>
                </>
            }
            transformOrigin={{ vertical: -18, horizontal: 0 }}
        >
            <Tooltip title={t('inbox')}>
                <Badge color="error" badgeContent={'9+'} sx={{ cursor: 'pointer' }}>
                    <InboxIcon onClick={handleClick} />
                </Badge>
            </Tooltip>
        </Popover>
    );
}

export default Inbox;
