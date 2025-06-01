import { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

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
import { kanbanService } from '~/services/kanbanService';

export function KanbanInvitedItem({ person }) {
    const { user } = useSelector((state) => state.user);
    const { activeBoard: board } = useSelector((state) => state.kanban);

    const [permission, setPermission] = useState(person.role);
    const popover = usePopover();

    // Lấy role của user hiện tại trong board
    const currentUserRole = useMemo(() => {
        return board?.members?.find((m) => m.email === user.email)?.role || '';
    }, [board?.members, user.email]);

    const isAdminOrOwner = currentUserRole === 'admin' || currentUserRole === 'owner';
    const isCurrentUser = user.email === person.email;

    const handleChangePermission = useCallback(
        async (newPermission) => {
            await kanbanService.changePermission({
                boardId: board.id,
                memberId: person.id,
                role: newPermission,
            });
            setPermission(newPermission);
        },
        [board.id, person.id],
    );

    return (
        <>
            <Box component="li" sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                <Avatar alt={person.displayName} src={person.avatar} sx={{ mr: 2 }} />

                <ListItemText
                    primary={capitalizeFirstLetter(person.displayName) + (isCurrentUser ? ' (You)' : '')}
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
                    {/* Change Permission Options */}
                    {isAdminOrOwner && !isCurrentUser && (
                        <>
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
                        </>
                    )}

                    {/* Current user can leave */}
                    {isCurrentUser && (
                        <>
                            <Divider sx={{ borderStyle: 'dashed' }} />
                            <MenuItem
                                onClick={() => {
                                    popover.onClose();
                                    // TODO: call leave board API
                                }}
                                sx={{ color: 'error.main' }}
                            >
                                <Iconify icon="solar:trash-bin-trash-bold" />
                                Leave
                            </MenuItem>
                        </>
                    )}

                    {/* Admin/Owner can remove others except owner */}
                    {isAdminOrOwner && !isCurrentUser && permission !== 'owner' && (
                        <>
                            <Divider sx={{ borderStyle: 'dashed' }} />
                            <MenuItem
                                onClick={() => {
                                    popover.onClose();
                                    // TODO: call remove member API
                                }}
                                sx={{ color: 'error.main' }}
                            >
                                <Iconify icon="solar:trash-bin-trash-bold" />
                                Remove
                            </MenuItem>
                        </>
                    )}
                </MenuList>
            </CustomPopover>
        </>
    );
}
