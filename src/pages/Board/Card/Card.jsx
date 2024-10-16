import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CommentIcon from '@mui/icons-material/Comment';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import Link from '~/components/Link';
import ContextMenu from './ContextMenu';
import dayjs from 'dayjs';

function Card({ title, members, comments, checklists, attachments, data }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: data?.uuid,
        data: { ...data },
    });
    const location = useLocation();
    const navigate = useNavigate();

    const completeItemCounts = useMemo(
        () =>
            data.checklists.reduce((prev, cur) => {
                const completedCount = cur.checkItems.filter((item) => item.status === 'complete').length;

                prev.push(completedCount);
                return prev;
            }, []),
        [data.checklists],
    );

    const style = {
        // touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
    };

    const handleOpenContextMenu = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    };

    const handleCloseContextMenu = () => setAnchorEl(null);

    return (
        <>
            <Box>
                <MuiCard
                    sx={{
                        cursor: 'pointer',
                        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        overflow: 'unset',
                        display: data?.FE_PlaceholderCard ? 'none' : 'block',
                    }}
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    onContextMenu={handleOpenContextMenu}
                >
                    {data?.cover?.fileUrl && (
                        <CardMedia
                            sx={{
                                minHeight: 160,
                                width: '100%',
                                borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px',
                                backgroundSize: 'cover',
                            }}
                            image={data?.cover?.fileUrl}
                            title={title}
                            onClick={() => navigate(`/card/${data.slug}`, { state: { backgroundLocation: location } })}
                        />
                    )}

                    <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                        <Link
                            sx={{ textDecoration: 'none', color: 'inherit' }}
                            to={`/card/${data.slug}`}
                            state={{ backgroundLocation: location }}
                        >
                            <Typography>{title}</Typography>
                        </Link>
                    </CardContent>

                    {(attachments?.length || data?.dueDate || !!data.checklists?.length) && (
                        <CardActions
                            sx={{
                                p: '0 4px 8px',
                            }}
                        >
                            {data?.dueDate && (
                                <Button
                                    size="small"
                                    variant={data?.dueComplete ? 'contained' : 'text'}
                                    startIcon={<AccessTimeRoundedIcon />}
                                >
                                    {dayjs(data?.dueDate).format('MMM D')}
                                </Button>
                            )}

                            {/* <Button size="small" startIcon={<GroupIcon />}>
                                {2}
                            </Button>*/}

                            {data.checklists?.map((checklist, index) => (
                                <Button key={checklist.id} size="small" startIcon={<CheckBoxOutlinedIcon />}>
                                    {completeItemCounts[index]}/{checklist.checkItems.length}
                                </Button>
                            ))}

                            {!!attachments?.length && (
                                <Button size="small" startIcon={<AttachmentIcon />}>
                                    {attachments?.length}
                                </Button>
                            )}
                        </CardActions>
                    )}
                </MuiCard>
                <ContextMenu anchorEl={anchorEl} onClose={handleCloseContextMenu} data={data} />
            </Box>
        </>
    );
}

Card.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    members: PropTypes.array,
    comments: PropTypes.array,
    checklists: PropTypes.array,
    attachments: PropTypes.array,
    data: PropTypes.object,
};

export default Card;
