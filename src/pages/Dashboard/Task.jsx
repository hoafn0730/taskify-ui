import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useLocation } from 'react-router-dom';

import Link from '~/components/Link';

function Task() {
    const location = useLocation();

    return (
        <Card sx={{ maxWidth: 420, position: 'relative', mb: 2 }}>
            <CardMedia
                sx={{ height: 100 }}
                image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                title="green iguana"
            />
            <CardContent
                sx={{
                    position: 'absolute',
                    inset: '8px 8px auto 8px',
                    bgcolor: 'common.white',
                    borderRadius: 1,
                }}
            >
                <Link
                    to={'/card/abc'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        textDecoration: 'none',
                        justifyContent: 'center',
                    }}
                    state={{ backgroundLocation: location }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: '16px',
                        }}
                    >
                        --- Discuss During Next Meeting ---
                    </Typography>
                    <Box>
                        <Typography
                            variant="span"
                            sx={{
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                color: 'orange',
                                width: 'fit-content',
                                p: '2px',
                            }}
                        >
                            <AccessTimeRoundedIcon fontSize="small" /> Sep 17
                        </Typography>
                    </Box>
                </Link>
            </CardContent>
            <CardActions sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography
                    variant="span"
                    sx={{
                        fontSize: '14px',
                        fontWeight: 400,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        width: 'fit-content',
                        p: '2px',
                        mb: 1,
                    }}
                >
                    <AccessTimeRoundedIcon fontSize="small" /> Due Sep 27, 2024, 4:06 PM
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <Button startIcon={<CheckRoundedIcon />}>Complete</Button>
                    <Button
                        startIcon={<CloseRoundedIcon />}
                        sx={{
                            '&:hover': {
                                color: 'warning.dark',
                            },
                        }}
                    >
                        Dismiss
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}

export default Task;
