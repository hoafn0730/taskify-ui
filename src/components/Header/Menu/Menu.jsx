import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MuiMenu from '@mui/material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Menu() {
    const { t } = useTranslation('header');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box>
            <Tooltip title="Menu">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'basic-menu-profiles' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        sx={{ width: 34, height: 34 }}
                        src="https://avatars.githubusercontent.com/u/140341133?v=4"
                    />
                </IconButton>
            </Tooltip>
            <MuiMenu
                id="basic-menu-profiles"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                transformOrigin={{ vertical: -8, horizontal: 0 }}
            >
                <MenuItem sx={{ display: 'flex', gap: 1 }} onClick={handleClose}>
                    <Avatar /> {t('menu.profile')}
                </MenuItem>

                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAddIcon fontSize="small" />
                    </ListItemIcon>
                    {t('menu.addAnotherAccount')}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LanguageIcon fontSize="small" />
                    </ListItemIcon>
                    {t('menu.appearance')}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <TranslateIcon fontSize="small" />
                    </ListItemIcon>
                    {t('menu.language')}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    {t('menu.settings')}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    {t('menu.logout')}
                </MenuItem>
            </MuiMenu>
        </Box>
    );
}

export default Menu;
