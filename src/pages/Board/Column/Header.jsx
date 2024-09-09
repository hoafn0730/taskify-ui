import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cloud from '@mui/icons-material/Cloud';
import Tooltip from '@mui/material/Tooltip';
import ContentCut from '@mui/icons-material/ContentCut';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import AddCard from '@mui/icons-material/AddCard';
import PropTypes from 'prop-types';

function Header({ title }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box
            sx={{
                height: (theme) => theme.app.columnHeaderHeight,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
            >
                {title}
            </Typography>
            <Box>
                <Tooltip title="More options">
                    <ExpandMoreIcon
                        sx={{
                            color: 'text.primary',
                            cursor: 'pointer',
                        }}
                        id="basic-column-dropdown"
                        aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                </Tooltip>
                <Menu
                    id="basic-menu-column-dropdown"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-column-dropdown',
                    }}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <AddCard fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Add new card</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘N
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCut fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Cut</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘X
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCopy fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Copy</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘C
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Paste</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘V
                        </Typography>
                    </MenuItem>

                    <Divider />
                    <MenuItem
                        sx={{
                            '&:hover': {
                                color: 'warning.dark',
                                '& .delete-icon': {
                                    color: 'warning.dark',
                                },
                            },
                        }}
                    >
                        <ListItemIcon>
                            <DeleteForeverIcon className="delete-icon" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Remove this column</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Cloud fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Archive this column</ListItemText>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;
