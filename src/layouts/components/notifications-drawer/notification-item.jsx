import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from '~/utils/format-time';

import { CONFIG } from '~/configs/config-global';

import { Label } from '~/components/label';
import { FileThumbnail } from '~/components/file-thumbnail';

// ----------------------------------------------------------------------

export function NotificationItem({ notification }) {
    const { t } = useTranslation('header');
    const renderAvatar = (
        <ListItemAvatar>
            {notification.avatarUrl ? (
                <Avatar src={notification.avatarUrl} sx={{ bgcolor: 'background.neutral' }} />
            ) : (
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'background.neutral' }}
                >
                    <Box
                        component="img"
                        src={`${CONFIG.site.basePath}/assets/icons/notification/${
                            (notification.type === 'order' && 'ic-order') ||
                            (notification.type === 'chat' && 'ic-chat') ||
                            (notification.type === 'mail' && 'ic-mail') ||
                            (notification.type === 'delivery' && 'ic-delivery')
                        }.svg`}
                        sx={{ width: 24, height: 24 }}
                    />
                </Stack>
            )}
        </ListItemAvatar>
    );

    const renderText = (
        <ListItemText
            disableTypography
            primary={reader(notification.title)}
            secondary={
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ typography: 'caption', color: 'text.disabled' }}
                    divider={
                        <Box
                            sx={{
                                width: 2,
                                height: 2,
                                bgcolor: 'currentColor',
                                mx: 0.5,
                                borderRadius: '50%',
                            }}
                        />
                    }
                >
                    {fToNow(notification.createdAt)}
                    {notification.category}
                </Stack>
            }
        />
    );

    const renderUnReadBadge = notification.isUnRead && (
        <Box
            sx={{
                top: 26,
                width: 8,
                height: 8,
                right: 20,
                borderRadius: '50%',
                bgcolor: 'info.main',
                position: 'absolute',
            }}
        />
    );

    const friendAction = (
        <Stack spacing={1} direction="row" sx={{ mt: 1.5 }}>
            <Button size="small" variant="contained">
                {t('notifications.actions.accept')}
            </Button>
            <Button size="small" variant="outlined">
                {t('notifications.actions.decline')}
            </Button>
        </Stack>
    );

    const projectAction = (
        <Stack alignItems="flex-start">
            <Box
                sx={{
                    p: 1.5,
                    my: 1.5,
                    borderRadius: 1.5,
                    color: 'text.secondary',
                    bgcolor: 'background.neutral',
                }}
            >
                {reader(
                    `<p><strong>@Jaydon Frankie</strong> feedback by asking questions or just leave a note of appreciation.</p>`,
                )}
            </Box>

            <Button size="small" variant="contained">
                {t('notifications.actions.reply')}
            </Button>
        </Stack>
    );

    const fileAction = (
        <Stack
            spacing={1}
            direction="row"
            sx={{
                pl: 1,
                p: 1.5,
                mt: 1.5,
                borderRadius: 1.5,
                bgcolor: 'background.neutral',
            }}
        >
            <FileThumbnail file="http://localhost:8080/httpsdesign-suriname-2015.mp3" />

            <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} flexGrow={1} sx={{ minWidth: 0 }}>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary' }} noWrap>
                            design-suriname-2015.mp3
                        </Typography>
                    }
                    secondary={
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{ typography: 'caption', color: 'text.disabled' }}
                            divider={
                                <Box
                                    sx={{
                                        mx: 0.5,
                                        width: 2,
                                        height: 2,
                                        borderRadius: '50%',
                                        bgcolor: 'currentColor',
                                    }}
                                />
                            }
                        >
                            <span>2.3 GB</span>
                            <span>30 min ago</span>
                        </Stack>
                    }
                />

                <Button size="small" variant="outlined">
                    {t('notifications.actions.download')}
                </Button>
            </Stack>
        </Stack>
    );

    const tagsAction = (
        <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ mt: 1.5 }}>
            <Label variant="outlined" color="info">
                {t('notifications.labels.design')}
            </Label>
            <Label variant="outlined" color="warning">
                {t('notifications.labels.dashboard')}
            </Label>
            <Label variant="outlined">{t('notifications.labels.designSystem')}</Label>
        </Stack>
    );

    const paymentAction = (
        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
            <Button size="small" variant="contained">
                {t('notifications.actions.pay')}
            </Button>
            <Button size="small" variant="outlined">
                {t('notifications.actions.decline')}
            </Button>
        </Stack>
    );

    return (
        <ListItemButton
            disableRipple
            sx={{
                p: 2.5,
                alignItems: 'flex-start',
                borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
            }}
        >
            {renderUnReadBadge}

            {renderAvatar}

            <Stack sx={{ flexGrow: 1 }}>
                {renderText}
                {notification.type === 'friend' && friendAction}
                {notification.type === 'project' && projectAction}
                {notification.type === 'file' && fileAction}
                {notification.type === 'tags' && tagsAction}
                {notification.type === 'payment' && paymentAction}
            </Stack>
        </ListItemButton>
    );
}

// ----------------------------------------------------------------------

function reader(data) {
    return (
        <Box
            dangerouslySetInnerHTML={{ __html: data }}
            sx={{
                mb: 0.5,
                '& p': { typography: 'body2', m: 0 },
                '& a': { color: 'inherit', textDecoration: 'none' },
                '& strong': { typography: 'subtitle2' },
            }}
        />
    );
}
