import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {asyncRequest} from "../utils/asyncRequest";

export const sendGetUser = asyncRequest(
    'users/sendGetUser',
    'get',
    '/users',
)

export const sendLogin = asyncRequest(
    'users/sendLogin',
    'post',
    '/login',
)

export const sendRegister = asyncRequest(
    'users/sendRegister',
    'post',
    '/register',
)

export const sendGetGpg = asyncRequest(
    'users/sendGetGpg',
    'get',
    '/gpg',
)

export const sendGetRequests = asyncRequest(
    'users/sendGetRequests',
    'get',
    '/users/requests',
)

export const sendGetUsers = asyncRequest(
    'users/sendGetUsers',
    'get',
    '/users',
)

export const sendDelete = asyncRequest(
    'users/sendDelete',
    'delete',
    '/user',
)

export const sendEmailVerify = asyncRequest(
    'users/sendEmailVerify',
    'patch',
    '/user',
)

export const sendLogout = asyncRequest(
    'users/sendLogout',
    'post',
    '/logout',
)

const initialState = {
    error: null,
    success: null,
    status: 'idle',
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    userId: localStorage.getItem('userId'),
    gpg: null,
    user: null,
    count: 1,
    page: 1,
};

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendGetUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(sendLogin.fulfilled, (state, action) => {
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            localStorage.setItem('userId', action.payload.userId)
            state.accessToken = localStorage.getItem('accessToken');
            state.refreshToken = localStorage.getItem('refreshToken');
            state.userId = localStorage.getItem('userId');
            toast.success("Login");
        })
        builder.addCase(sendLogout.fulfilled, (state, action) => {
            state.user = null;
            state.userId = null;
            state.accessToken = null;
            state.refreshToken = null;
            toast.success("Logout");
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
        })
        builder.addCase(sendGetGpg.fulfilled, (state, action) => {
            state.gpg = action.payload.gpg;
        })
        builder.addCase(sendRegister.fulfilled, (state, action) => {
            toast.success("Registered");
        })
        builder.addCase(sendGetRequests.fulfilled, (state, action) => {
            state.users = action.payload.users;
        })
        builder.addCase(sendGetUsers.fulfilled, (state, action) => {
            state.users = action.payload.users;
        })
        builder.addCase(sendDelete.fulfilled, (state, action) => {
            toast.success("Deleted");
        })
        builder.addCase(sendEmailVerify.fulfilled, (state, action) => {
            toast.success("Verified");
        })
    }
})

export default slice.reducer;
