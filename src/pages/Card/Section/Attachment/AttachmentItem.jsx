import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PropTypes from 'prop-types';

function AttachmentItem({ id, title, image, cover }) {
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
                image={image}
                title={title}
            />

            <CardContent sx={{ p: 1.5, flex: 1, '&:last-child': { p: 1.5 } }}>
                <Typography variant="h3" sx={{ fontSize: '16px' }}>
                    {title}
                </Typography>
                {id === +cover && <Typography sx={{ fontSize: '12px' }}>{'cover'}</Typography>}
            </CardContent>

            <CardActions sx={{ p: 0 }}>
                <Button sx={{ minWidth: 'auto' }}>
                    <MoreHorizIcon />
                </Button>
            </CardActions>
        </Card>
    );
}

AttachmentItem.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    cover: PropTypes.string,
};

export default AttachmentItem;
