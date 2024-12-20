import httpRequest from '~/utils/httpRequest';

const getChecklistDetail = (checklistId) => {
    return httpRequest.get('/checklists/' + checklistId);
};

const getChecklistDetailBySlug = (slug) => {
    return httpRequest.get('/checklists/' + slug);
};

const createNewChecklist = async (data) => {
    const res = await httpRequest.post('/checklists', {
        ...data,
    });
    return res.data;
};

const updateChecklist = (checklistId, data) => {
    return httpRequest.put('/checklists/' + checklistId, {
        ...data,
    });
};

const deleteChecklist = (checklistId) => {
    return httpRequest.delete('/checklists/' + checklistId);
};

const createNewCheckItem = async (checklistId, data) => {
    const res = await httpRequest.post('/checklists/' + checklistId + '/check-items', {
        ...data,
    });
    return res.data;
};

const updateCheckItem = (checklistId, checkItemId, data) => {
    return httpRequest.put('/checklists/' + checklistId + '/check-items/' + checkItemId, {
        ...data,
    });
};

const deleteCheckItem = (checklistId, checkItemId) => {
    return httpRequest.delete('/checklists/' + checklistId + '/check-items/' + checkItemId);
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
