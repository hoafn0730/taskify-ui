import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Card({ title, desc, image, memberIds, comments, attachments, data }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: data?.id,
        data: { ...data },
    });

    const style = {
        // touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
    };

    return (
        <MuiCard
            sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                display: data?.FE_PlaceholderCard ? 'none' : 'block',
            }}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            {image && (
                <CardMedia
                    sx={{ height: 140, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
                    image={image}
                    title="green iguana"
                />
            )}

            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>{title}</Typography>
            </CardContent>

            {!!memberIds?.length && !!comments?.length && !!attachments?.length && (
                <CardActions
                    sx={{
                        p: '0 4px 8px',
                    }}
                >
                    <Button size="small" startIcon={<GroupIcon />}>
                        {2}
                    </Button>

                    <Button size="small" startIcon={<CommentIcon />}>
                        {3}
                    </Button>

                    <Button size="small" startIcon={<AttachmentIcon />}>
                        {3}
                    </Button>
                </CardActions>
            )}
        </MuiCard>
    );
}

Card.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    image: PropTypes.string,
    memberIds: PropTypes.array,
    comments: PropTypes.array,
    attachments: PropTypes.array,
    data: PropTypes.object,
};

export default Card;
