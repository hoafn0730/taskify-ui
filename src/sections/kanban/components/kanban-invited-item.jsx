import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from '~/components/iconify';
import { usePopover, CustomPopover } from '~/components/custom-popover';
import { capitalizeFirstLetter } from '~/utils/formatters';

export function KanbanInvitedItem({ person }) {
    const [permission, setPermission] = useState(person.role);

    const popover = usePopover();

    // [ ] Permission
    const handleChangePermission = useCallback((newPermission) => {
        setPermission(newPermission);
    }, []);

    return (
        <>
            <Box component="li" sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                <Avatar alt={person.displayName} src={person.avatarUrl} sx={{ mr: 2 }} />

                <ListItemText
                    primary={person.displayName}
                    secondary={
                        <Tooltip title={person.email}>
                            <span>{person.email}</span>
                        </Tooltip>
                    }
                    primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
                    secondaryTypographyProps={{ noWrap: true, component: 'span' }}
                    sx={{ flexGrow: 1, pr: 1 }}
                />

                <Button
                    size="small"
                    color="inherit"
                    endIcon={
                        <Iconify
                            width={16}
                            icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                            sx={{ ml: -0.5 }}
                        />
                    }
                    onClick={popover.onOpen}
                    sx={{
                        flexShrink: 0,
                        fontSize: (theme) => theme.typography.pxToRem(12),
                        ...(popover.open && { bgcolor: 'action.selected' }),
                    }}
                >
                    {capitalizeFirstLetter(permission)}
                </Button>
            </Box>

            <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
                <MenuList>
                    <MenuItem
                        selected={permission === 'viewer'}
                        onClick={() => {
                            popover.onClose();
                            handleChangePermission('viewer');
                        }}
                    >
                        <Iconify icon="solar:eye-bold" />
                        Viewer
                    </MenuItem>

                    <MenuItem
                        selected={permission === 'member'}
                        onClick={() => {
                            popover.onClose();
                            handleChangePermission('member');
                        }}
                    >
                        <Iconify icon="solar:user-bold" />
                        Member
                    </MenuItem>

                    <MenuItem
                        selected={permission === 'admin'}
                        onClick={() => {
                            popover.onClose();
                            handleChangePermission('admin');
                        }}
                    >
                        <Iconify icon="fa6-solid:user-shield" />
                        Admin
                    </MenuItem>

                    <MenuItem
                        selected={permission === 'owner'}
                        onClick={() => {
                            popover.onClose();
                            handleChangePermission('owner');
                        }}
                    >
                        <Iconify icon="fluent:person-star-20-filled" />
                        Owner
                    </MenuItem>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                        Remove
                    </MenuItem>
                </MenuList>
            </CustomPopover>
        </>
    );
}
