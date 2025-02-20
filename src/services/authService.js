import axios from 'axios';
import { toast } from 'react-toastify';

const authRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_SSO_BACKEND_URL,
    withCredentials: true,
});

authRequest.interceptors.request.use(
    function (config) {
        // Do something before request is sent

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
authRequest.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response?.data;
    },
    function (error) {
        if (error?.response?.status !== 410) {
            toast.error(error?.response?.data?.message);
        }

        if (error?.response?.status === 410) {
            refreshToken();
            // return error.
        }

        return Promise.reject(error);
    },
);

const logout = () => {
    return authRequest.delete(import.meta.env.VITE_APP_SSO_BACKEND_URL + '/auth/logout');
};

const getCurrentUser = async () => {
    const res = await authRequest.get(import.meta.env.VITE_APP_SSO_BACKEND_URL + '/auth/current-user');

    return res.data;
};

const refreshToken = async () => {
    const res = await authRequest.post(import.meta.env.VITE_APP_SSO_BACKEND_URL + '/auth/refresh-token', {});
    return res.data;
};

export default { logout, getCurrentUser, refreshToken };
