import Box from '@mui/material/Box';

import ActivityBox from './ActivityBox';
import ActivityItem from './ActivityItem';
import { useDispatch, useSelector } from 'react-redux';
import { commentService } from '~/services/commentService';
import { updateCardData } from '~/store/slices/cardSlice';

function Activity() {
    const card = useSelector((state) => state.card.activeCard);
    const dispatch = useDispatch();

    const handleDeleteItem = (commentId) => {
        commentService.deleteComment(commentId).then(() => {
            const newCard = { ...card };

            newCard.comments = newCard.comments.filter((c) => c.id !== commentId);

            dispatch(updateCardData(newCard));
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ActivityBox />
            {card?.comments.map((comment) => (
                <ActivityItem
                    key={comment.id}
                    comment={comment}
                    title={comment.comment}
                    user={comment.user}
                    createdAt={comment.createdAt}
                    onDelete={handleDeleteItem}
                />
            ))}
        </Box>
    );
}

export default Activity;
