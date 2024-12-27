import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Cloud from '@mui/icons-material/Cloud';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Recent() {
    const { t } = useTranslation('header');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box>
            <Tooltip title={t('recent')}>
                <Button aria-describedby={id} endIcon={<KeyboardArrowDownIcon />} onClick={handleClick}>
                    {t('recent')}
                </Button>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{ vertical: -12, horizontal: 0 }}
            >
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
            </Popover>
        </Box>
    );
}

export default Recent;
