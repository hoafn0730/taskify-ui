import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Link from '~/components/Link/Link';

function BoardItem({ title, slug, image }) {
    return (
        <Card sx={{ position: 'relative', width: '23.5%' }}>
            <Link to={'/board/' + slug}>
                <CardMedia component="img" height="120" image={image} alt={title} />
                <CardContent sx={{ position: 'absolute', inset: 0, bgcolor: '#0000004d' }}>
                    <Typography variant="h5" sx={{ fontSize: '18px', fontWeight: '600', color: 'common.white' }}>
                        {title}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
}

BoardItem.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    image: PropTypes.string,
};

export default BoardItem;
