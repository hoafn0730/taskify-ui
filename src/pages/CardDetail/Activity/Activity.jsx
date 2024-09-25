import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';

function Activity() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        </Box>
    );
}

export default Activity;
