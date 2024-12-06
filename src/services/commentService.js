import httpRequest from '~/utils/httpRequest';

const createNewComment = async (data) => {
    const res = await httpRequest.post('/comments', {
        ...data,
    });
    return res.data;
};

const updateComment = async (commentId, data) => {
    return await httpRequest.put('/comments/' + commentId, {
        ...data,
    });
};

const deleteComment = async (commentId) => {
    return await httpRequest.delete('/comments/' + commentId);
};

export const commentService = { createNewComment, updateComment, deleteComment };
