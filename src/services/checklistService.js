import httpRequest from '~/utils/httpRequest';

const getChecklistDetail = async (checklistId) => {
    return await httpRequest.get('/checklists/' + checklistId);
};

const getChecklistDetailBySlug = async (slug) => {
    return await httpRequest.get('/checklists/' + slug);
};

const createNewChecklist = async (data) => {
    const res = await httpRequest.post('/checklists', {
        ...data,
    });
    return res.data;
};

const updateChecklist = async (checklistId, data) => {
    return await httpRequest.put('/checklists/' + checklistId, {
        ...data,
    });
};

const deleteChecklist = async (checklistId) => {
    return await httpRequest.delete('/checklists/' + checklistId);
};

const createNewCheckItem = async (checklistId, data) => {
    const res = await httpRequest.post('/checklists/' + checklistId + '/check-items', {
        ...data,
    });
    return res.data;
};

const updateCheckItem = async (checklistId, checkItemId, data) => {
    return await httpRequest.put('/checklists/' + checklistId + '/check-items/' + checkItemId, {
        ...data,
    });
};

const deleteCheckItem = async (checklistId, checkItemId) => {
    return await httpRequest.delete('/checklists/' + checklistId + '/check-items/' + checkItemId);
};

export const checklistService = {
    getChecklistDetail,
    getChecklistDetailBySlug,
    createNewChecklist,
    updateChecklist,
    deleteChecklist,
    createNewCheckItem,
    updateCheckItem,
    deleteCheckItem,
};
