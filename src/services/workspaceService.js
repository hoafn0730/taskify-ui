import httpRequest from '~/utils/httpRequest';

const getWorkspace = () => {
    return httpRequest.get('/workspaces');
};

const createNewNotification = async (data) => {
    const res = await httpRequest.post('/workspaces', {
        ...data,
    });
    return res.data;
};

const updateNotification = (notificationId, data) => {
    return httpRequest.put('/workspaces/' + notificationId, {
        ...data,
    });
};

export const workspaceService = {
    getWorkspace,
    createNewNotification,
    updateNotification,
};
