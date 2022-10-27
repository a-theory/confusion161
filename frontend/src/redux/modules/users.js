import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import {parseToken} from "../../utils/parseToken";
import { toast } from 'react-toastify';

export const sendGetUser = createAsyncThunk(
    'users/sendGetUser',
    async (param, thunkAPI) => {
        try {
            if (!param.id) return null;
            const res = await axios.get(`/users/${param.id}`);
            return res.data.user;
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendLogin = createAsyncThunk(
    'users/sendLogin',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/login`, param.user);
            console.log(res);
            if (res?.data?.status) {
                console.log(121);
                param.navigate("/")
                localStorage.setItem('token', res.data.token)
                toast.success("Log in");
                return {
                    token: localStorage.getItem('token'),
                    user: res.data.user,
                    error: null,
                };
            } else {
                const codes = {
                    TOO_SHORT: 'Password too short'
                }

                if (res.data.error.code === 'FORMAT_ERROR') {
                    toast.error(codes[res.data.error.fields.password]);
                }
            }
        } catch (err) {
            console.log(err.response.data.error)
            toast.error(err.response.data.error);
        }
    }
)

export const sendRegister = createAsyncThunk(
    'users/sendRegister',
    async (param, thunkAPI) => {
        try {
            await axios.post(`/register`, param.user);
            param.navigate('/login');
            toast.success("Wait, I will check your email");
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendGetGpg = createAsyncThunk(
    'users/sendGetGpg',
    async (param, thunkAPI) => {
        try {
            const res = await axios.get(`/gpg`);
            return res.data
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendGetRequests = createAsyncThunk(
    'users/sendGetRequests',
    async (param, thunkAPI) => {
        try {
            let header = {
                headers: {
                    Authorization: `Bearer ${param.token}`,
                }
            }
            const res = await axios.get(`/users/requests`, header);
            return res.data.users;
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendGetUsers = createAsyncThunk(
    'users/sendGetUsers',
    async (param, thunkAPI) => {
        try {
            let header = {
                headers: {
                    Authorization: `Bearer ${param.token}`,
                }
            }
            const res = await axios.get(`/users`, header);
            return res.data.users;
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendDelete = createAsyncThunk(
    'users/sendDelete',
    async (param, thunkAPI) => {
        try {
            if (!param.id) return null;
            let header = {
                headers: {
                    Authorization: `Bearer ${param.token}`,
                }
            }
            await axios.delete(`/users/${param.id}`, header);
            window.location.reload(false);
            return {};
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendEmailVerify = createAsyncThunk(
    'users/sendEmailVerify',
    async (param, thunkAPI) => {
        try {
            if (!param.id) return null;
            let header = {
                headers: {
                    Authorization: `Bearer ${param.token}`,
                }
            }
            console.log({token: param.token})
            await axios.patch(`/users/${param.id}`, {}, header);
            window.location.reload(false);
            return {};
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

const initialState = {
    error: null,
    success: null,
    status: 'idle',
    token: localStorage.getItem('token'),
    gpg: null,
    user: null,
    count: 1,
    page: 1,
};

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            toast.success("Log out");
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendGetUser.fulfilled, (state, action) => {
            const token = parseToken(state.token);
            if (Date.now() >= token.exp * 1000){
                state.user = null;
                state.users = [];
                state.specUser = null;
                state.token = null;
                localStorage.removeItem('token');
            } else {
                state.user = action.payload;
            }
        })
        builder.addCase(sendLogin.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        builder.addCase(sendGetGpg.fulfilled, (state, action) => {
            state.gpg = action.payload.gpg;
        })
        builder.addCase(sendRegister.fulfilled, (state, action) => {})
        builder.addCase(sendGetRequests.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        builder.addCase(sendGetUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        builder.addCase(sendDelete.fulfilled, (state, action) => {})
        builder.addCase(sendEmailVerify.fulfilled, (state, action) => {})
    }
})

export default slice.reducer;
export const { logOut } = slice.actions;
