import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '~/services/authService'

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
    const res = await authService.getCurrentUser()

    return res
})

export const signUp = createAsyncThunk(
    'user/signUp',
    async ({ username, email, password, firstName, lastName }) => {
        const res = await authService.signUp()
        const { accessToken } = res.data
        return res
    }
)

export const login = createAsyncThunk('user/login', async () => {
    const res = await authService.login()

    return res
})

export const logout = createAsyncThunk('user/logout', async () => {
    const res = await authService.logout()
    window.location.reload()

    return res
})
