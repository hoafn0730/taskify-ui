import axiosInstance, { endpoints } from '~/utils/axios';

const signIn = ({ email, password }) => {
    return axiosInstance.post(endpoints.auth.signIn, {
        email,
        password,
    });
};

const signUp = ({ username, email, password, firstName, lastName }) => {
    return axiosInstance.post(endpoints.auth.signUp, {
        username,
        email,
        password,
        fullName: firstName + ' ' + lastName,
    });
};

const signOut = () => {
    return axiosInstance.delete('/auth/sign-out');
};

const getCurrentUser = async () => {
    const res = await axiosInstance.get('/auth/current-user');

    return res.data;
};

const refreshToken = async () => {
    const res = await axiosInstance.post('/auth/refresh-token');
    return res.data;
};

export const authService = { signIn, signUp, signOut, getCurrentUser, refreshToken };
