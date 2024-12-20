import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from '~/components/Link/Link';

function TemplateItem() {
    return (
        <Card sx={{ position: 'relative', width: '23.5%' }}>
            <Link to={'/board/remote-team-meetings'}>
                <CardMedia
                    component="img"
                    height="120"
                    image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                    alt="Paella dish"
                />
                <CardContent sx={{ position: 'absolute', inset: 0, bgcolor: '#0000004d' }}>
                    <Typography variant="h5" sx={{ fontSize: '18px', fontWeight: '600', color: 'common.white' }}>
                        Word of the Day
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
}

export default TemplateItem;
