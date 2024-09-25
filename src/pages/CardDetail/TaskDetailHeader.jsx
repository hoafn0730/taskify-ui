import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddIcon from '@mui/icons-material/Add';

function TaskDetailHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: '40px' }}>
            <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', columnGap: 1, rowGap: 1 }}>
                {/* Members, Labels, Notifications, Due date */}

                {/* Notifications */}
                <Box component={'section'}>
                    <Typography variant="span" sx={{ fontSize: '12px', fontWeight: '600' }}>
                        Notifications
                    </Typography>
                    <Box sx={{ mt: 1.5 }}>
                        <Button startIcon={<RemoveRedEyeOutlinedIcon fontSize="small" />}>Watch</Button>
                    </Box>
                </Box>
                {/* Members */}
                <Box component={'section'}>
                    <Typography variant="span" sx={{ fontSize: '12px', fontWeight: '600' }}>
                        Members
                    </Typography>
                    <Box sx={{ mt: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                                sx={{ width: 38, height: 38 }}
                                alt="Remy Sharp"
                                src="https://mui.com/static/images/avatar/1.jpg"
                            />
                            <Button sx={{ p: 0.5, width: 38, height: 38, minWidth: 'auto', borderRadius: '50%' }}>
                                <AddIcon />
                            </Button>
                        </Box>
                    </Box>
                </Box>
                {/* Due date */}
                {/* ! Todo */}
                <Box component={'section'}>
                    <Typography variant="span" sx={{ fontSize: '12px', fontWeight: '600' }}>
                        Due date
                    </Typography>
                    <Box sx={{ mt: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                                sx={{ width: 38, height: 38 }}
                                alt="Remy Sharp"
                                src="https://mui.com/static/images/avatar/1.jpg"
                            />
                            <Button sx={{ p: 0.5, width: 38, height: 38, minWidth: 'auto', borderRadius: '50%' }}>
                                <AddIcon />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Button
                sx={{
                    height: 'fit-content',
                    minWidth: 'auto',
                }}
                onClick={handleClick}
            >
                Actions
            </Button>
            <Menu
                id="positioned-menu"
                aria-labelledby="positioned-button"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{ ml: 1 }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Open card</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Open card</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Open card</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Open card</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Open card</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default TaskDetailHeader;
