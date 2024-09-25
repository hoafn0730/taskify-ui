import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MuiMenu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';

import Header from './Header';

function Menu({ items, onChange }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [history, setHistory] = useState([{ data: items }]);
    const { t } = useTranslation('header');
    const current = history[history.length - 1];
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setHistory([{ data: items }]);
    };

    const handleClose = () => setAnchorEl(null);

    const handleBack = () => setHistory((prev) => prev.slice(0, prev.length - 1));

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
                sx={{
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                }}
            >
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                {current.data.map((item, index) => {
                    const isParent = !!item.children;
                    return (
                        <Box key={index}>
                            {item.separate && <Divider sx={{ my: 1 }} />}
                            <MenuItem
                                sx={{ minWidth: '220px' }}
                                onClick={() => {
                                    if (isParent) {
                                        setHistory((prev) => [...prev, item.children]);
                                    } else onChange(item);
                                }}
                            >
                                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                                <Typography variant="span">{t(item.title)}</Typography>
                            </MenuItem>
                        </Box>
                    );
                })}
            </MuiMenu>
        </Box>
    );
}

Menu.propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func,
};

export default Menu;
