import httpRequest from '~/utils/httpRequest';

const createNewComment = async (data) => {
    const res = await httpRequest.post('/comments', {
        ...data,
    });
    return res.data;
};

const updateComment = (commentId, data) => {
    return httpRequest.put('/comments/' + commentId, {
        ...data,
    });
};

const deleteComment = (commentId) => {
    return httpRequest.delete('/comments/' + commentId);
};

export const commentService = { createNewComment, updateComment, deleteComment };
