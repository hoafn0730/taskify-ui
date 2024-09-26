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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AttachmentIcon from '@mui/icons-material/Attachment';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Dates from './Actions/Dates';

function TaskDetailHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElDate, setAnchorElDate] = useState(null);

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
                <MenuItem
                    sx={{
                        '&:hover': {
                            '& .delete-icon': {
                                color: 'warning.dark',
                            },
                        },
                    }}
                >
                    <ListItemIcon>
                        <PersonAddAltOutlinedIcon fontSize="small" />
                        {/* <PersonRemoveOutlinedIcon fontSize="small" className="delete-icon" /> */}
                    </ListItemIcon>
                    <ListItemText>Join</ListItemText>
                    {/* <ListItemText>Leave</ListItemText> */}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PersonOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Members</ListItemText>
                </MenuItem>
                <MenuItem onClick={(event) => setAnchorElDate(event.currentTarget)}>
                    <ListItemIcon>
                        <AccessTimeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Dates</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <LocalOfferOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Labels</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <CheckBoxOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Checkbox</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <AttachmentIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Attachment</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <AddPhotoAlternateOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cover</ListItemText>
                </MenuItem>
            </Menu>
            <Dates anchorEl={anchorElDate} onClose={() => setAnchorElDate(null)} />
        </Box>
    );
}

export default TaskDetailHeader;
