import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

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
    const location = useLocation();
    const [value, setValue] = useState(0);

    useEffect(() => {
        let page;
        if (location.pathname === '/') {
            page = 0;
        } else if (location.pathname === '/boards') {
            page = 1;
        } else if (location.pathname === '/templates') {
            page = 2;
        }
        setValue(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        </Box>
    );
}

export default NavTabs;
