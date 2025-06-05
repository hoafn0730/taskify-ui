import axiosInstance, { endpoints } from '~/utils/axios';

const getConversations = () => {
    return axiosInstance.get(import.meta.env.VITE_SERVER_BE_URL + '/api/v1/conversations', {
        withCredentials: true,
    });
};

const getMessages = (conversationId, page = 1) => {
    return axiosInstance.get(
        import.meta.env.VITE_SERVER_BE_URL + '/api/v1/conversations/' + conversationId + '/messages',
        {
            params: { page },
            withCredentials: true,
        },
    );
};

const createConversation = ({ participantIds, title, type = 'private' }) => {
    return axiosInstance.post(
        `${import.meta.env.VITE_SERVER_BE_URL}${'/api/v1/conversations'}`,
        { participantIds, title, type },
        {
            withCredentials: true,
        },
    );
};

const updateConversation = async (conversationId, conversationData) => {
    const res = await axiosInstance.put(
        `${import.meta.env.VITE_SERVER_BE_URL}${endpoints.calendar}/${conversationId}`,
        conversationData,
        {
            withCredentials: true,
        },
    );
    return res.data;
};

const deleteConversation = async (conversationId) => {
    const res = await axiosInstance.delete(
        `${import.meta.env.VITE_SERVER_BE_URL}${endpoints.calendar}/${conversationId}`,
        {
            withCredentials: true,
        },
    );
    return res.data;
};

export const conversationService = {
    getConversations,
    getMessages,
    createConversation,
    updateConversation,
    deleteConversation,
};
