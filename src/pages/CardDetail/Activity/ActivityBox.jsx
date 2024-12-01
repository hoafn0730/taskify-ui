import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MarkdownEditor from '~/components/MarkdownEditor';
import { commentService } from '~/services/commentService';
import { updateCardData } from '~/store/slices/cardSlice';

function ActivityBox() {
    const [value, setValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);
    const card = useSelector((state) => state.card.activeCard);
    const dispatch = useDispatch();

    const sendComment = () => {
        commentService
            .createNewComment({ commentableId: card.id, commentableType: 'card', comment: value })
            .then((res) => {
                const newCard = cloneDeep(card);
                newCard.comments.unshift(res);

                dispatch(updateCardData(newCard));
                setIsEditing(false);
                setValue('');
            });
    };

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar alt={userInfo?.username} src={userInfo?.avatar} />

            {isEditing ? (
                <Box>
                    <MarkdownEditor
                        value={value}
                        style={{ minHeight: '100px', mb: 1 }}
                        onChange={({ text }) => setValue(text)}
                    />
                    <Button variant="contained" disabled={!value} onClick={sendComment}>
                        Save
                    </Button>
                </Box>
            ) : (
                <Box>
                    <Button onClick={() => setIsEditing(true)}>Write a comment</Button>
                </Box>
            )}
        </Box>
    );
}

export default ActivityBox;
