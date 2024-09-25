import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function AttachmentItem() {
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: 'none',
            }}
        >
            <CardMedia
                sx={{
                    width: '64px',
                    height: '48px',
                    borderRadius: 1,
                    backgroundSize: 'contain',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                }}
                image={
                    'https://trello.com/1/cards/66c7227e1b6610ae2170f0de/attachments/66ec35f39526b220db751ebd/previews/66ec35f39526b220db751ec7/download/images.jpg'
                }
                title="green iguana"
            />

            <CardContent sx={{ p: 1.5, flex: 1, '&:last-child': { p: 1.5 } }}>
                <Typography>{'images.jpg'}</Typography>
            </CardContent>

            <CardActions sx={{ p: 0 }}>
                <Button sx={{ minWidth: 'auto' }}>
                    <MoreHorizIcon />
                </Button>
            </CardActions>
        </Card>
    );
}

export default AttachmentItem;
