import { useState } from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';

import MenuHeader from './MenuHeader';
import BoardInfo from './BoardInfo';
import Archive from './Archive';

const drawerWidth = 320;

const BOARD_MENU = [
    {
        title: 'About this board',
        icon: <InfoOutlinedIcon />,
        type: 'info',
        children: {
            title: 'About this board',
            data: [
                {
                    component: BoardInfo,
                },
            ],
        },
    },
    {
        title: 'Archived items',
        icon: <Inventory2OutlinedIcon />,
        type: 'archived',
        children: {
            title: 'Archived items',
            data: [
                {
                    component: Archive,
                },
            ],
        },
    },
    {
        title: 'Change background',
        icon: <PhotoSizeSelectActualOutlinedIcon />,
        type: 'background',
    },
    {
        title: 'Close board',
        icon: <CancelPresentationOutlinedIcon />,
        type: 'close',
    },
];

function BoardMenu({ open, onClose }) {
    const [history, setHistory] = useState([{ data: BOARD_MENU }]);
    const current = history[history.length - 1];

    const handleBack = () => setHistory((prev) => prev.slice(0, prev.length - 1));

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'background':
                console.log('🚀 ~ handleMenuChange ~ menuItem:', menuItem);
                break;

            default:
        }
    };

    return (
        <Drawer
            sx={{
                width: open ? drawerWidth : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    top: (theme) => theme.app.headerHeight,
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="right"
            open={open}
        >
            <MenuHeader
                title={current.title || 'Menu'}
                {...(history.length > 1 && { onBack: handleBack })}
                onClose={onClose}
            />

            <Divider />
            <List>
                {current.data.map((item, index) => {
                    const isParent = !!item.children;
                    return (
                        <ListItem key={index} disablePadding>
                            {!item.component && (
                                <ListItemButton
                                    onClick={() => {
                                        if (isParent) {
                                            setHistory((prev) => [...prev, item.children]);
                                        } else handleMenuChange(item);
                                    }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText>{item.title}</ListItemText>
                                </ListItemButton>
                            )}
                            {item.component && <item.component />}
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}

BoardMenu.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

export default BoardMenu;
