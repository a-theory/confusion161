import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
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
            if (res?.data?.status) {
                localStorage.setItem('accessToken', res.data.accessToken)
                localStorage.setItem('refreshToken', res.data.refreshToken)
                toast.success("Log in");
                param.navigate("/")
                return {
                    accessToken: localStorage.getItem('accessToken'),
                    refreshToken: localStorage.getItem('refreshToken'),
                    user: res.data.user,
                    error: null,
                };
            } else {

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
                    Authorization: `Bearer ${param.accessToken}`,
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
                    Authorization: `Bearer ${param.accessToken}`,
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
                    Authorization: `Bearer ${param.accessToken}`,
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
                    Authorization: `Bearer ${param.accessToken}`,
                }
            }
            console.log({accessToken: param.accessToken})
            await axios.patch(`/users/${param.id}`, {}, header);
            window.location.reload(false);
            return {};
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendRefreshToken = createAsyncThunk(
    'users/sendRefreshToken',
    async (param, thunkAPI) => {
        try {
            let header = {
                headers: {
                    Authorization: `Bearer ${param.refreshToken}`,
                }
            }
            await axios.patch(`/refresh`, {}, header);
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
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
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
            state.accessToken = null;
            state.refreshToken = null;
            toast.success("Log out");
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendGetUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(sendLogin.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
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
