import httpRequest from '~/utils/httpRequest';

const createNewAttachment = async (data) => {
    const res = await httpRequest.post('/attachments', {
        ...data,
    });
    return res.data;
};

const updateAttachment = async (attachmentId, data) => {
    return await httpRequest.put('/attachments/' + attachmentId, {
        ...data,
    });
};

const deleteAttachment = async (attachmentId) => {
    return await httpRequest.delete('/attachments/' + attachmentId);
};

export const attachmentService = { createNewAttachment, updateAttachment, deleteAttachment };
