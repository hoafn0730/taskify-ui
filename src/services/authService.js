import axiosInstance, { endpoints } from '~/utils/axios'

const signIn = () => {
    return axiosInstance.post('/auth/sign-in')
}

const signUp = ({ username, email, password, firstName, lastName }) => {
    return axiosInstance.post(endpoints.auth.signUp, {
        username,
        email,
        password,
        fullName: firstName + ' ' + lastName,
    })
}

const logout = () => {
    return axiosInstance.delete('/auth/logout')
}

const getCurrentUser = async () => {
    const res = await axiosInstance.get('/auth/current-user')

    return res.data
}

const refreshToken = async () => {
    const res = await axiosInstance.post('/auth/refresh-token')
    return res.data
}

export const authService = { signIn, signUp, logout, getCurrentUser, refreshToken }
