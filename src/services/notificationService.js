import httpRequest from '~/utils/httpRequest';

const getNotifications = () => {
    return httpRequest.get('/notifications');
};

const getNotificationBySlug = (slug) => {
    return httpRequest.get('/notifications/' + slug);
};

const createNewNotification = async (data) => {
    const res = await httpRequest.post('/notifications', {
        ...data,
    });
    return res.data;
};

const updateNotification = (notificationId, data) => {
    return httpRequest.put('/notifications/' + notificationId, {
        ...data,
    });
};

export const notificationService = {
    getNotifications,
    getNotificationBySlug,
    createNewNotification,
    updateNotification,
};
