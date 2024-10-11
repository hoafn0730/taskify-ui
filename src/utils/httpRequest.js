import axios from 'axios';
import { toast } from 'react-toastify';
import axiosRetry from 'axios-retry';
import authService from '~/services/authService';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
    withCredentials: true,
});

axiosRetry(httpRequest, {
    retries: 3,
    retryCondition: (error) => {
        return error?.response?.status === 400 || error?.response?.status === 405;
    },
    retryDelay: (retryCount, error) => {
        return retryCount * 100;
    },
});

let store;
export const injectStore = (_store) => {
    store = _store;
};

httpRequest.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const headerToken = store?.userInfo?.accessToken ?? '';
        if (headerToken) {
            config.headers.Authorization = `Bearer ${headerToken}`;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
httpRequest.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response?.data;
    },
    function (error) {
        if (error?.response?.status !== 405) {
            toast.error(error?.response?.data?.message);
        }

        if (error?.response?.status === 405) {
            authService.refreshToken().catch((err) => {
                return Promise.reject(err);
            });
            // return error.
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default httpRequest;
