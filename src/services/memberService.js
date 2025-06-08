import axiosInstance, { endpoints } from '~/utils/axios';

const getMembers = (id, type) => {
    return axiosInstance.get(import.meta.env.VITE_SERVER_BE_URL + '/api/v1/members', {
        params: {
            id,
            type,
        },
        withCredentials: true,
    });
};

const updateMember = (memberData) => {
    return axiosInstance.put(`${import.meta.env.VITE_SERVER_BE_URL}${endpoints.members}`, memberData, {
        withCredentials: true,
    });
};

const getInvoices = () => {
    return axiosInstance.get(import.meta.env.VITE_SERVER_BE_URL + endpoints.payment, {
        withCredentials: true,
    });
};

const transaction = (data) => {
    return axiosInstance.post(
        import.meta.env.VITE_SERVER_BE_URL + endpoints.payment,
        {
            ...data,
        },
        {
            withCredentials: true,
        },
    );
};

export const memberService = { getMembers, updateMember, getInvoices, transaction };
