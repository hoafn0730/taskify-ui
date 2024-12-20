import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

function InboxItem({ data }) {
    return (
        <MenuItem
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
                    <Avatar src={''} sx={{ width: 32, height: 32 }} />
                </ListItemIcon>
                <ListItemText>
                    <Typography variant="span">{data.title}</Typography>
                </ListItemText>
            </Box>

            {/*  Action of invite notification */}
            {data.type === 'invite' && (
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
            )}
        </MenuItem>
    );
}

InboxItem.propTypes = {
    data: PropTypes.object,
};

export default InboxItem;
