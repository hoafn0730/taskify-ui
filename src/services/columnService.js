import httpRequest from '~/utils/httpRequest';

const createNewColumn = async (data) => {
    const res = await httpRequest.post('/columns', {
        ...data,
    });
    return res.data.data;
};

const updateColumn = async (columnId, data) => {
    return await httpRequest.put('/columns/' + columnId, {
        ...data,
    });
};

const deleteColumn = async (columnId) => {
    return await httpRequest.delete('/columns/' + columnId);
};

export const columnService = { createNewColumn, updateColumn, deleteColumn };
