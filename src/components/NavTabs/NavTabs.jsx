import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import LinkTab from './LinkTab';
import { getCategories } from '~/services';

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
    const [categories, setCategories] = useState([]);
    console.log('🚀 ~ NavTabs ~ categories:', categories);

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res.data);
        });
    }, []);

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
                variant="scrollable"
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

                {location.pathname === '/templates' &&
                    categories.length &&
                    categories.map((item) => (
                        <Button
                            component={Link}
                            to={item.slug}
                            key={item.id}
                            fullWidth
                            sx={{ color: 'rgba(0, 0, 0, 0.6)', justifyContent: 'flex-start', pl: 6 }}
                        >
                            {item.title}
                        </Button>
                    ))}
            </Tabs>
        </Box>
    );
}

export default NavTabs;
