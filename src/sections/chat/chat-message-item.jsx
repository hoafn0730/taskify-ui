import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fToNow } from '~/utils/format-time';

import { Iconify } from '~/components/iconify';

import { useMessage } from './hooks/use-message';

// ----------------------------------------------------------------------

export function ChatMessageItem({ message, participants, onOpenLightbox }) {
    const { user } = useSelector((state) => state.user);

    const { me, senderDetails, hasImage } = useMessage({
        message,
        participants,
        currentUserId: user?.id,
    });

    const { displayName, avatar } = senderDetails;

    const { content, createdAt } = message;

    const renderInfo = (
        <Typography noWrap variant="caption" sx={{ mb: 1, color: 'text.disabled', ...(!me && { mr: 'auto' }) }}>
            {!me && `${displayName}, `}

            {fToNow(createdAt)}
        </Typography>
    );

    const renderBody = (
        <Stack
            sx={{
                p: 1.5,
                minWidth: 48,
                maxWidth: 320,
                borderRadius: 1,
                typography: 'body2',
                bgcolor: 'background.neutral',
                ...(me && { color: 'grey.800', bgcolor: 'primary.lighter' }),
                ...(hasImage && { p: 0, bgcolor: 'transparent' }),
            }}
        >
            {hasImage ? (
                <Box
                    component="img"
                    alt="attachment"
                    src={content}
                    onClick={() => onOpenLightbox(content)}
                    sx={{
                        width: 400,
                        height: 'auto',
                        borderRadius: 1.5,
                        cursor: 'pointer',
                        objectFit: 'cover',
                        aspectRatio: '16/11',
                        '&:hover': { opacity: 0.9 },
                    }}
                />
            ) : (
                content
            )}
        </Stack>
    );

    const renderActions = (
        <Stack
            direction="row"
            className="message-actions"
            sx={{
                pt: 0.5,
                left: 0,
                opacity: 0,
                top: '100%',
                position: 'absolute',
                transition: (theme) =>
                    theme.transitions.create(['opacity'], { duration: theme.transitions.duration.shorter }),
                ...(me && { right: 0, left: 'unset' }),
            }}
        >
            <IconButton size="small">
                <Iconify icon="solar:reply-bold" width={16} />
            </IconButton>

            <IconButton size="small">
                <Iconify icon="eva:smiling-face-fill" width={16} />
            </IconButton>

            <IconButton size="small">
                <Iconify icon="solar:trash-bin-trash-bold" width={16} />
            </IconButton>
        </Stack>
    );

    return (
        <Stack direction="row" justifyContent={me ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>
            {!me && <Avatar alt={displayName} src={avatar} sx={{ width: 32, height: 32, mr: 2 }} />}

            <Stack alignItems={me ? 'flex-end' : 'flex-start'}>
                {renderInfo}

                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ position: 'relative', '&:hover': { '& .message-actions': { opacity: 1 } } }}
                >
                    {renderBody}
                    {renderActions}
                </Stack>
            </Stack>
        </Stack>
    );
}
