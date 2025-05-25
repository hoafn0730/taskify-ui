import axiosInstance, { endpoints } from '~/utils/axios';

const getUsers = () => {
    return axiosInstance.get(import.meta.env.VITE_SERVER_BE_URL + '/api/v1/users', {
        withCredentials: true,
    });
};

const updateUser = async (userId, userData) => {
    const res = await axiosInstance.put(
        `${import.meta.env.VITE_SERVER_BE_URL}${endpoints.admin.users}/${userId}`,
        userData,
        {
            withCredentials: true,
        },
    );
    return res.data;
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

export const userService = { getUsers, updateUser, getInvoices, transaction };
