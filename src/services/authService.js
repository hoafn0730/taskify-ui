import axios from 'axios';
import { toast } from 'react-toastify';

const logout = () => {
    return axios.delete(import.meta.env.VITE_APP_SSO_BACKEND_URL + '/auth/logout', { withCredentials: true });
};

const getCurrentUser = async () => {
    const res = await axios
        .get(import.meta.env.VITE_APP_SSO_BACKEND_URL + '/auth/current-user', {
            withCredentials: true,
        })
        .catch((error) => {
            if (error?.response?.status === 410) {
                refreshToken().catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
            }

            if (error?.response?.status !== 410) {
                toast.error(error?.response?.data?.message);
            }
        });
    return res.data;
};

const refreshToken = async () => {
    const res = await axios.post(
        import.meta.env.VITE_APP_SSO_BACKEND_URL + '/auth/refresh-token',
        {},
        { withCredentials: true },
    );
    return res.data;
};

export default { logout, getCurrentUser, refreshToken };
