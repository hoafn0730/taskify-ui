import axios from 'axios';

const logout = () => {
    return axios.get(import.meta.env.VITE_APP_SSO_BACKEND_URL + '/auth/logout', { withCredentials: true });
};

const getCurrentUser = async () => {
    const res = await axios.get(import.meta.env.VITE_APP_SSO_BACKEND_URL + '/auth/current-user', {
        withCredentials: true,
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
