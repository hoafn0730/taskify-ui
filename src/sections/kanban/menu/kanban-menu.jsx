import { useState } from 'react';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuHeader from './MenuHeader';
import BoardInfo from './BoardInfo';
import Archive from './Archive';
import ChangeBackground from './ChangeBackground';
import { Iconify } from '~/components/iconify';

const drawerWidth = 320;

const BOARD_MENU = [
    {
        title: 'About this board',
        subTitle: 'Add a description to your board',
        icon: <Iconify icon="solar:info-circle-bold" />,
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
        icon: <Iconify icon="solar:archive-down-minimlistic-bold" />,
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
        icon: <Iconify icon="solar:gallery-add-bold" />,
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
        icon: <Iconify icon="solar:close-circle-bold" />,
        type: 'close',
    },
];

function KanbanMenu({ open, onClose }) {
    const [history, setHistory] = useState([{ data: BOARD_MENU }]);
    const current = history[history.length - 1];

    const handleBack = () => setHistory((prev) => prev.slice(0, prev.length - 1));

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'close':
                // call api delete board
                // update state board
                break;

            default:
        }
    };

    const handleClose = () => {
        onClose();
        setHistory([{ data: BOARD_MENU }]);
    };

    return (
        <>
            <Drawer
                open={open}
                onClose={handleClose}
                anchor="right"
                slotProps={{ backdrop: { invisible: true } }}
                PaperProps={{ sx: { width: { xs: 1, sm: drawerWidth }, top: '64px' } }}
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
        </>
    );
}

export default KanbanMenu;
