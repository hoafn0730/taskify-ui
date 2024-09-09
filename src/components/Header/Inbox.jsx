import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
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
import { useState } from 'react';

import Popover from '../Popover';

function Inbox() {
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
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCut fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Cut</ListItemText>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            ⌘X
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
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Cloud fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Web Clipboard</ListItemText>
                    </MenuItem>
                </MenuList>
            }
            transformOrigin={{ vertical: -18, horizontal: 0 }}
        >
            <Tooltip title="Inbox">
                <Badge color="error" badgeContent={'9+'} sx={{ cursor: 'pointer' }}>
                    <InboxIcon onClick={handleClick} />
                </Badge>
            </Tooltip>
        </Popover>
    );
}

export default Inbox;
