import axios from 'axios';
import { toast } from 'sonner';

import { CONFIG } from '~/configs/config-global';

const axiosInstance = axios.create({
    baseURL: CONFIG.site.serverUrl,
    // withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response?.data,
    (error) => {
        if ((error?.response?.status !== 410 || error?.response?.status !== 401) && error?.response?.data) {
            toast.error(error.response.data.message);
        }

        return Promise.reject(error || 'Something went wrong!');
    },
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
    try {
        const [url, config] = Array.isArray(args) ? args : [args];

        const res = await axiosInstance.get(url, { ...config });

        // return res.data;
        return res;
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
};

export const fetcher1 = async (args) => {
    try {
        const [url, config] = Array.isArray(args) ? args : [args];

        const res = await axiosInstance.get(url, { ...config, withCredentials: true });

        return res;
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
};

// ----------------------------------------------------------------------

export const endpoints = {
    chat: '/api/chat',
    payment: '/api/v1/payment',
    kanban: {
        boards: '/api/v1/boards',
        columns: '/api/v1/columns',
        cards: '/api/v1/cards',
    },
    calendar: '/api/v1/calendar',
    auth: {
        me: '/api/v1/auth/me',
        signIn: '/api/v1/auth/sign-in',
        signUp: '/api/v1/auth/sign-up',
        signOut: '/api/v1/auth/sign-out',
    },
    mail: {
        list: '/api/v1/mails/list',
        details: '/api/v1/mails',
        labels: '/api/v1/mails/labels',
    },
    post: {
        list: '/api/v1/posts',
        details: '/api/post/details',
        latest: '/api/post/latest',
        search: '/api/post/search',
    },
    members: '/api/v1/members',
    admin: {
        users: '/api/v1/users',
        boards: '/api/v1/admin/boards',
        cards: '/api/v1/admin/cards',
        columns: '/api/v1/admin/columns',
    },
};
