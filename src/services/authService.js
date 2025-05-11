import axiosInstance, { endpoints } from '~/utils/axios';

const signIn = ({ email, password }) => {
    return axiosInstance.post(
        import.meta.env.VITE_SERVER_BE_URL + endpoints.auth.signIn,
        {
            email,
            password,
        },
        { withCredentials: true },
    );
};

const signUp = ({ username, email, password, firstName, lastName }) => {
    return axiosInstance.post(
        import.meta.env.VITE_SERVER_BE_URL + endpoints.auth.signUp,
        {
            username,
            email,
            password,
            fullName: firstName + ' ' + lastName,
        },
        { withCredentials: true },
    );
};

const signOut = () => {
    return axiosInstance.delete(import.meta.env.VITE_SERVER_BE_URL + endpoints.auth.signOut, { withCredentials: true });
};

const getCurrentUser = async () => {
    const res = await axiosInstance.get(import.meta.env.VITE_SERVER_BE_URL + endpoints.auth.me, {
        withCredentials: true,
    });

    return res.data;
};

const refreshToken = async () => {
    const res = await axiosInstance.post('/auth/refresh-token');
    return res.data;
};

export const authService = { signIn, signUp, signOut, getCurrentUser, refreshToken };
