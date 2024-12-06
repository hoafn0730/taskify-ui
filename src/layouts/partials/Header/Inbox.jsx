import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/Inbox';
import Popover from '~/components/Popover';

function Inbox() {
    const { t } = useTranslation('header');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Popover
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            render={
                <>
                    <Popover.Header title={t('inbox.title')} buttonTitle={t('inbox.buttonTitle')} />
                    <MenuList>
                        {/* Empty notifications */}
                        {/* <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: 2,
                                height: '300px',
                                justifyContent: 'center',
                            }}
                        >
                            <img src="https://trello.com/assets/ee2660df9335718b1a80.svg" alt="" />
                            <Typography variant="h3" sx={{ fontSize: '1.2rem' }}>
                                No notifications
                            </Typography>
                        </Box> */}
                        {Array(2)
                            .fill(0)
                            .map((item) => (
                                <MenuItem
                                    key={item}
                                    sx={{
                                        gap: 1,
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        '&:hover': {
                                            textDecoration: 'none',
                                            bgcolor: 'none',
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <ListItemIcon>
                                            <Avatar src={''} />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography variant="span">{'Bạn có chấp nhận tham gia?'}</Typography>
                                        </ListItemText>
                                    </Box>

                                    {/*  Action of invite notification */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            gap: 1,
                                            width: '100%',
                                        }}
                                    >
                                        <Button variant="contained">Accept</Button>
                                        <Button variant="contained">Reject</Button>
                                    </Box>
                                </MenuItem>
                            ))}
                    </MenuList>
                </>
            }
            transformOrigin={{ vertical: -18, horizontal: 0 }}
        >
            <Tooltip title={t('inbox.title')}>
                <Badge color="error" badgeContent={'9+'} sx={{ cursor: 'pointer' }}>
                    <InboxIcon onClick={handleClick} />
                </Badge>
            </Tooltip>
        </Popover>
    );
}

export default Inbox;
