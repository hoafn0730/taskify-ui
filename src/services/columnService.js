import httpRequest from '~/utils/httpRequest';

const updateColumn = async (columnId, data) => {
    return await httpRequest.put('/columns/' + columnId, {
        ...data,
    });
};
export const columnService = { updateColumn };
