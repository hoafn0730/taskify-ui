import axiosInstance, { endpoints } from '~/utils/axios';

const BASE_URL = import.meta.env.VITE_SERVER_BE_URL + '/api/v1/mails';

const getList = () => {
    return axiosInstance.get(`${BASE_URL}/list`, {
        withCredentials: true,
    });
};

const getLabels = () => {
    return axiosInstance.get(`${BASE_URL}/labels`, {
        withCredentials: true,
    });
};

const getOne = (id) => {
    return axiosInstance.get(`${BASE_URL}/${id}`, {
        withCredentials: true,
    });
};

const save = (mailData) => {
    return axiosInstance.post(`${BASE_URL}/save`, mailData, {
        withCredentials: true,
    });
};

const send = (draftId) => {
    return axiosInstance.post(
        `${BASE_URL}/${draftId}/send`,
        {},
        {
            withCredentials: true,
        },
    );
};

const destroy = (id) => {
    return axiosInstance.delete(`${BASE_URL}/${id}`, {
        withCredentials: true,
    });
};

export const mailService = {
    getList,
    getLabels,
    getOne,
    save,
    send,
    destroy,
};
