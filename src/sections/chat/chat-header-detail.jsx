import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { useResponsive } from '~/hooks/use-responsive';

import { fToNow } from '~/utils/format-time';

import { Iconify } from '~/components/iconify';
import { usePopover, CustomPopover } from '~/components/custom-popover';

import { ChatHeaderSkeleton } from './chat-skeleton';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export function ChatHeaderDetail({ collapseNav, participants, type, loading }) {
    const popover = usePopover();
    const { user } = useSelector((state) => state.user);

    const lgUp = useResponsive('up', 'lg');

    const group = participants?.length > 1 && type === 'group';

    const singleParticipant = participants.find((p) => p.userId !== user?.id);

    const { collapseDesktop, onCollapseDesktop, onOpenMobile } = collapseNav;

    const handleToggleNav = useCallback(() => {
        if (lgUp) {
            onCollapseDesktop();
        } else {
            onOpenMobile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lgUp]);

    const renderGroup = (
        <Stack direction="row" alignItems="center" spacing={2}>
            <AvatarGroup max={3} sx={{ [`& .${avatarGroupClasses.avatar}`]: { width: 32, height: 32 } }}>
                {participants?.length &&
                    participants.map((participant) => (
                        <Avatar key={participant.id} alt={participant.displayName} src={participant.avatar} />
                    ))}
            </AvatarGroup>

            <ListItemText
                primary={participants
                    .map((p) => p.displayName)
                    .slice(0, 3)
                    .join(', ')}
                // [ ] lastActivity
                // secondary={
                //     singleParticipant?.status === 'offline'
                //         ? fToNow(singleParticipant?.lastActivity)
                //         : singleParticipant?.status
                // }
                secondaryTypographyProps={{
                    component: 'span',
                    ...(singleParticipant?.status !== 'offline' && { textTransform: 'capitalize' }),
                }}
            />
        </Stack>
    );

    const renderSingle = (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Badge variant={singleParticipant?.status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Avatar src={singleParticipant?.avatar} alt={singleParticipant?.displayName} />
            </Badge>

            <ListItemText
                primary={singleParticipant?.displayName}
                secondary={
                    singleParticipant?.status === 'offline'
                        ? fToNow(singleParticipant?.lastActivity)
                        : singleParticipant?.status
                }
                secondaryTypographyProps={{
                    component: 'span',
                    ...(singleParticipant?.status !== 'offline' && { textTransform: 'capitalize' }),
                }}
            />
        </Stack>
    );

    if (loading) {
        return <ChatHeaderSkeleton />;
    }

    return (
        <>
            {group ? renderGroup : renderSingle}

            <Stack direction="row" flexGrow={1} justifyContent="flex-end">
                <IconButton>
                    <Iconify icon="solar:phone-bold" />
                </IconButton>

                <IconButton>
                    <Iconify icon="solar:videocamera-record-bold" />
                </IconButton>

                <IconButton onClick={handleToggleNav}>
                    <Iconify icon={!collapseDesktop ? 'ri:sidebar-unfold-fill' : 'ri:sidebar-fold-fill'} />
                </IconButton>

                <IconButton onClick={popover.onOpen}>
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
            </Stack>

            <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                        }}
                    >
                        <Iconify icon="solar:bell-off-bold" />
                        Hide notifications
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                        }}
                    >
                        <Iconify icon="solar:forbidden-circle-bold" />
                        Block
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                        }}
                    >
                        <Iconify icon="solar:danger-triangle-bold" />
                        Report
                    </MenuItem>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                        Delete
                    </MenuItem>
                </MenuList>
            </CustomPopover>
        </>
    );
}
