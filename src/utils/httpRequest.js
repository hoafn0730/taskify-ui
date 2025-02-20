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
    retryDelay: (retryCount) => {
        return retryCount * 100;
    },
});

httpRequest.interceptors.request.use(
    function (config) {
        // Do something before request is sent

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

let refreshTokenPromise = null;
// Add a response interceptor
httpRequest.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response?.data;
    },
    function (error) {
        const originalRequest = error.config;

        if (error?.response?.status === 410 && originalRequest) {
            if (!refreshTokenPromise) {
                refreshTokenPromise = authService
                    .refreshToken()
                    .then(() => {})
                    .catch((error) => {
                        authService.logout().then(() => {
                            location.href = '/home';
                        });

                        return Promise.reject(error);
                    })
                    .finally(() => {
                        refreshTokenPromise = null;
                    });
            }

            return refreshTokenPromise.then(() => {
                return httpRequest(originalRequest);
            });
        }

        if (error?.response?.status !== 410) {
            toast.error(error?.response?.data?.message);
        }

        // if (error?.response?.status === 401) {
        //     authService.logout().then(() => {
        //         store.dispatch(logout());
        //         location.href = '/login';
        //     });
        // }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default httpRequest;
