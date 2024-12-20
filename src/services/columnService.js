import httpRequest from '~/utils/httpRequest';

const createNewColumn = async (data) => {
    const res = await httpRequest.post('/columns', {
        ...data,
    });
    return res.data;
};

const updateColumn = (columnId, data) => {
    return httpRequest.put('/columns/' + columnId, {
        ...data,
    });
};

const deleteColumn = (columnId) => {
    return httpRequest.delete('/columns/' + columnId);
};

export const columnService = { createNewColumn, updateColumn, deleteColumn };
