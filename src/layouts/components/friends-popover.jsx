import { m } from 'framer-motion';
import { useSelector } from 'react-redux';

import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fToNow } from '~/utils/format-time';

import { varHover } from '~/components/animate';
import { Scrollbar } from '~/components/scrollbar';
import { usePopover, CustomPopover } from '~/components/custom-popover';

export function FriendsPopover({ data = [], sx, ...other }) {
    const popover = usePopover();
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <IconButton
                component={m.button}
                whileTap="tap"
                whileHover="hover"
                variants={varHover(1.05)}
                onClick={popover.onOpen}
                sx={{
                    ...(popover.open && { bgcolor: (theme) => theme.vars.palette.action.selected }),
                    ...sx,
                }}
                {...other}
            >
                <SvgIcon>
                    {/* https://icon-sets.iconify.design/solar/users-group-rounded-bold-duotone/  */}
                    <circle cx="15" cy="6" r="3" fill="currentColor" opacity="0.4" />
                    <ellipse cx="16" cy="17" fill="currentColor" opacity="0.4" rx="5" ry="3" />
                    <circle cx="9.001" cy="6" r="4" fill="currentColor" />
                    <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4" />
                </SvgIcon>
            </IconButton>

            <CustomPopover
                open={popover.open}
                anchorEl={popover.anchorEl}
                onClose={popover.onClose}
                slotProps={{
                    arrow: { offset: 20 },
                }}
            >
                <Typography variant="h6" sx={{ p: 1.5 }}>
                    Friends <span>({user?.friends?.length ?? 0})</span>
                </Typography>

                <Scrollbar sx={{ height: 320, width: 320 }}>
                    {user?.friends?.length &&
                        user?.friends.map((friend) => (
                            <MenuItem key={friend.id} sx={{ p: 1 }}>
                                <Badge
                                    variant={friend.status}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    sx={{ mr: 2 }}
                                >
                                    <Avatar alt={friend.displayName} src={friend.avatar} />
                                </Badge>

                                <ListItemText
                                    primary={friend.displayName}
                                    secondary={friend.status === 'offline' ? fToNow(friend.lastActivity) : ''}
                                    primaryTypographyProps={{ typography: 'subtitle2' }}
                                    secondaryTypographyProps={{ typography: 'caption', color: 'text.disabled' }}
                                />
                            </MenuItem>
                        ))}
                </Scrollbar>
            </CustomPopover>
        </>
    );
}
