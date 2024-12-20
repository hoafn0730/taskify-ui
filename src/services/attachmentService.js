import httpRequest from '~/utils/httpRequest';

const createNewAttachment = async (data) => {
    const res = await httpRequest.post('/attachments', {
        ...data,
    });
    return res.data;
};

const updateAttachment = (attachmentId, data) => {
    return httpRequest.put('/attachments/' + attachmentId, {
        ...data,
    });
};

const deleteAttachment = (attachmentId) => {
    return httpRequest.delete('/attachments/' + attachmentId);
};

export const attachmentService = { createNewAttachment, updateAttachment, deleteAttachment };
