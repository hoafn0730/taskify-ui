import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnLockIcon from '@mui/icons-material/VpnLock';

import { capitalizeFirstLetter } from '~/utils/formatters';
import { useSelector } from 'react-redux';

const MENUS_STYLES = {
    color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.common.white : 'primary.main'),
    bgcolor: (theme) => theme.palette.mode !== 'dark' && theme.palette.common.white,
    border: 'none',
    px: '5px',
    '& .MuiSvgIcon-root': {
        color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.common.white : 'primary.main'),
    },
};

function BoardBar() {
    const board = useSelector((state) => state.board.boardData);

    return (
        <Box
            px={2}
            sx={{
                width: '100%',
                height: (theme) => theme.app.boardBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                overflowX: 'auto',
                '&::-webkit-scrollbar-track': { m: 2 },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tooltip title={board?.description}>
                    <Chip sx={MENUS_STYLES} icon={<DashboardIcon />} label={board?.title} onClick={() => {}} />
                </Tooltip>
                <Chip
                    sx={MENUS_STYLES}
                    icon={<VpnLockIcon />}
                    label={capitalizeFirstLetter(board?.type)}
                    onClick={() => {}}
                />
                <Chip sx={MENUS_STYLES} icon={<AddToDriveIcon />} label="Add To Google Drive" onClick={() => {}} />
                <Chip sx={MENUS_STYLES} icon={<BoltIcon />} label="Automation" onClick={() => {}} />
                <Chip sx={MENUS_STYLES} icon={<FilterListIcon />} label="Filters" onClick={() => {}} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    sx={{
                        color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.common.white : 'primary.main'),
                        borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? theme.palette.common.white : 'primary.main',
                        '&:hover': {
                            color: (theme) => theme.palette.mode === 'dark' && theme.palette.primary.main,
                            backgroundColor: (theme) => theme.palette.mode === 'dark' && theme.palette.primary['50'],
                        },
                    }}
                    startIcon={<PersonAddIcon />}
                >
                    Invite
                </Button>

                <AvatarGroup
                    max={4}
                    sx={{
                        '& .MuiAvatar-root': {
                            borderColor: (theme) => theme.palette.common.white,
                            borderWidth: '1px',
                            color: (theme) => theme.palette.common.white,
                            width: '34px',
                            height: '34px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            bgcolor: '#a4b0be',
                            '&:first-of-type': {
                                bgcolor: '#a4b0be',
                            },
                        },
                    }}
                >
                    {board?.members?.map((member) => (
                        <Tooltip key={member.id} title={member.name}>
                            <Avatar alt={member.name} src={member.avatar} />
                        </Tooltip>
                    ))}
                </AvatarGroup>
            </Box>
        </Box>
    );
}

BoardBar.propTypes = {
    boardData: PropTypes.object,
};

export default BoardBar;
