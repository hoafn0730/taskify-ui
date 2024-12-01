/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';

function ActivityItem({ comment, title, user, createdAt, onDelete }) {
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar alt={user?.username} src={user?.avatar} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box>
                        <Typography variant="span" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                            @{user?.username}
                        </Typography>{' '}
                        {title}
                    </Box>
                    <Typography variant="span" sx={{ fontSize: '12px' }}>
                        {new Date(createdAt).toLocaleString()}
                    </Typography>
                </Box>
            </Box>
            <Button
                sx={{ p: 0.5, minWidth: 'auto', borderRadius: '50%' }}
                onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                }}
            >
                <MoreHorizIcon />
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                    sx={{
                        '&:hover': {
                            color: 'warning.dark',
                            '& .delete-icon': {
                                color: 'warning.dark',
                            },
                        },
                    }}
                    onClick={() => {
                        onDelete(comment.id);
                        setAnchorEl(null);
                    }}
                >
                    <ListItemIcon>
                        <DeleteForeverIcon className="delete-icon" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default ActivityItem;
