import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import LinkTab from './LinkTab';
import Modal from '../Modal';

function samePageLinkNavigation(event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

function NavTabs() {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (event.type !== 'click' || (event.type === 'click' && samePageLinkNavigation(event))) {
            setValue(newValue);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Tabs
                value={value}
                sx={{
                    '& .MuiTab-root': {
                        justifyContent: 'flex-start',
                        minHeight: 'auto',
                        textTransform: 'none',
                        fontWeight: '500',
                    },
                }}
                orientation="vertical"
                aria-label="nav tabs"
                role="navigation"
                onChange={handleChange}
            >
                <LinkTab icon={<HomeRoundedIcon fontSize="small" />} iconPosition="start" label="Home" to="/" />
                <LinkTab
                    icon={<DashboardRoundedIcon fontSize="small" />}
                    iconPosition="start"
                    label="Boards"
                    to="/boards"
                />
                <LinkTab
                    icon={<DashboardCustomizeRoundedIcon fontSize="small" />}
                    label="Templates"
                    iconPosition="start"
                    to="/templates"
                />
            </Tabs>
            <Divider />

            <Box>
                <Button
                    size="small"
                    sx={{
                        mt: 1,
                        color: '#444',
                    }}
                    onClick={handleOpen}
                >
                    Create New Board
                </Button>
                <Modal open={open} onClose={handleClose}>
                    <Fade in={open}>
                        <Box>Text in a modal</Box>
                    </Fade>
                </Modal>
            </Box>
        </Box>
    );
}

export default NavTabs;
