import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import LinkTab from './LinkTab';

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

    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (event.type !== 'click' || (event.type === 'click' && samePageLinkNavigation(event))) {
            setValue(newValue);
        }
    };

    return (
        <Box>
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
        </Box>
    );
}

export default NavTabs;
