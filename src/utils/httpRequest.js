import axios from 'axios';
import { toast } from 'react-toastify';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
    withCredentials: true,
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
        return response.data;
    },
    function (error) {
        // if (error.response.status === 405) {
        //     console.log('🚀 ~ error:', error);
        // }

        toast.error(error?.response?.statusText);

        // Do something with response error
        if (error?.response?.data) {
            return error.response.data;
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default httpRequest;
