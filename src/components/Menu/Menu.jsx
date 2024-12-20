import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MuiMenu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
import Header from './Header';

function Menu({ anchorEl, sx, transformOrigin, anchorOrigin, items, onChange, onClose }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const handleBack = () => setHistory((prev) => prev.slice(0, prev.length - 1));

    return (
        <MuiMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            sx={sx}
        >
            {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
            <MenuList>
                {current.data.map((item, index) => {
                    const isParent = !!item.children;

                    return (
                        <Box key={index}>
                            {item.separate && <Divider sx={{ my: 1 }} />}
                            <MenuItem
                                sx={{ minWidth: '220px' }}
                                onClick={(e) => {
                                    if (isParent) {
                                        setHistory((prev) => [...prev, item.children]);
                                    } else onChange(item, e);
                                }}
                            >
                                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                                <Typography variant="span">{item.title}</Typography>
                            </MenuItem>
                        </Box>
                    );
                })}
            </MenuList>
        </MuiMenu>
    );
}

Menu.propTypes = {
    anchorEl: PropTypes.any,
    items: PropTypes.array.isRequired,
    sx: PropTypes.object,
    transformOrigin: PropTypes.object,
    anchorOrigin: PropTypes.object,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
};

export default Menu;
