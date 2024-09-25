import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

function ActivityItem() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box>
                    <Typography variant="span" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                        Hoan Tran
                    </Typography>{' '}
                    joined this card
                </Box>
                <Typography variant="span" sx={{ fontSize: '12px' }}>
                    6 hours ago
                </Typography>
            </Box>
        </Box>
    );
}

export default ActivityItem;
