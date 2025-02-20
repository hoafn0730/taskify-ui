import { useState } from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
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
import ChangeBackground from './ChangeBackground';

const drawerWidth = 320;

const BOARD_MENU = [
    {
        title: 'About this board',
        subTitle: 'Add a description to your board',
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
        children: {
            title: 'Change background',
            style: { display: 'flex' },
            data: [
                {
                    title: 'Image',
                    button: (data, onClick) => {
                        return <Button onClick={onClick}>{data.title}</Button>;
                    },
                    children: {
                        title: 'Color',
                        data: [
                            {
                                title: 'Change background',
                                component: ChangeBackground,
                                type: 'close',
                            },
                        ],
                    },
                },
                {
                    title: 'Color',
                    button: (data, onClick) => {
                        return <Button onClick={onClick}>{data.title}</Button>;
                    },
                    children: {
                        title: 'Color',
                        data: [
                            {
                                title: 'Change background',
                                button: (data, onClick) => {
                                    return <button onClick={onClick}>{data.title}</button>;
                                },
                                type: 'close',
                            },
                        ],
                    },
                },
            ],
        },
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
            case 'close':
                // call api delete board
                // update state board
                console.log('🚀 ~ handleMenuChange ~ menuItem:', menuItem);
                break;

            default:
        }
    };

    const handleClose = () => {
        onClose();
        setHistory([{ data: BOARD_MENU }]);
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
                onClose={handleClose}
                {...(history.length > 1 && { onBack: handleBack })}
            />

            <Divider />
            <List>
                {current.data.map((item, index) => {
                    const isParent = !!item.children;

                    return (
                        <ListItem key={index} disablePadding>
                            {!item.component && !item.button && (
                                <ListItemButton
                                    onClick={() => {
                                        if (isParent) {
                                            setHistory((prev) => [...prev, item.children]);
                                        } else handleMenuChange(item);
                                    }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.title} secondary={item.subTitle} />
                                </ListItemButton>
                            )}

                            {item.button &&
                                item.button(item, () => {
                                    if (isParent) {
                                        setHistory((prev) => [...prev, item.children]);
                                    } else handleMenuChange(item);
                                })}
                            {item.component && <item.component onClose={handleClose} />}
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
