import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { paths } from '~/configs/paths';
import { useRouter } from '~/routes/hooks';

import { useResponsive } from '~/hooks/use-responsive';

import { fToNow } from '~/utils/format-time';

import { clickConversation } from '~/actions/chat';

import { useNavItem } from './hooks/use-nav-item';

export function ChatNavItem({ selected, collapse, conversation, onCloseMobile }) {
    const { user } = useSelector((state) => state.user);

    const mdUp = useResponsive('up', 'md');

    const router = useRouter();

    const { group, displayName, displayText, participants, lastActivity, hasOnlineInGroup } = useNavItem({
        conversation,
        currentUserId: user?.id,
    });

    const singleParticipant = participants[0];

    const { displayName: displayNameParticipant, avatar, status } = singleParticipant;

    const handleClickConversation = useCallback(async () => {
        try {
            if (!mdUp) {
                onCloseMobile();
            }

            // [ ] clickConversation
            // await clickConversation(conversation.id);

            router.push(`${paths.dashboard.chat}?id=${conversation.id}`);
        } catch (error) {
            console.error(error);
        }
    }, [conversation.id, mdUp, onCloseMobile, router]);

    const renderGroup = (
        <Badge
            variant={hasOnlineInGroup ? 'online' : 'invisible'}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
                {participants.slice(0, 2).map((participant) => (
                    <Avatar key={participant.id} alt={participant.displayName} src={participant.avatar} />
                ))}
            </AvatarGroup>
        </Badge>
    );

    const renderSingle = (
        <Badge key={status} variant={status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Avatar alt={displayNameParticipant} src={avatar} sx={{ width: 48, height: 48 }} />
        </Badge>
    );

    return (
        <Box component="li" sx={{ display: 'flex' }}>
            <ListItemButton
                onClick={handleClickConversation}
                sx={{
                    py: 1.5,
                    px: 2.5,
                    gap: 2,
                    ...(selected && { bgcolor: 'action.selected' }),
                }}
            >
                <Badge color="error" overlap="circular" badgeContent={collapse ? conversation.unreadCount : 0}>
                    {group ? renderGroup : renderSingle}
                </Badge>

                {!collapse && (
                    <>
                        <ListItemText
                            primary={displayName}
                            primaryTypographyProps={{ noWrap: true, component: 'span', variant: 'subtitle2' }}
                            secondary={displayText}
                            secondaryTypographyProps={{
                                noWrap: true,
                                component: 'span',
                                variant: conversation.unreadCount ? 'subtitle2' : 'body2',
                                color: conversation.unreadCount ? 'text.primary' : 'text.secondary',
                            }}
                        />

                        <Stack alignItems="flex-end" sx={{ alignSelf: 'stretch' }}>
                            <Typography
                                noWrap
                                variant="body2"
                                component="span"
                                sx={{ mb: 1.5, fontSize: 12, color: 'text.disabled' }}
                            >
                                {fToNow(lastActivity)}
                            </Typography>

                            {!!conversation.unreadCount && (
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        bgcolor: 'info.main',
                                        borderRadius: '50%',
                                    }}
                                />
                            )}
                        </Stack>
                    </>
                )}
            </ListItemButton>
        </Box>
    );
}
