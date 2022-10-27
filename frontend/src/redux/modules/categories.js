import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import { toast } from 'react-toastify';

export const sendList = createAsyncThunk(
    'categories/sendList',
    async (param, thunkAPI) => {
        try {
            const res = await axios.get(`/categories`);
            return res.data.categories;
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendGetOne = createAsyncThunk(
    'categories/sendGetOne',
    async (param, thunkAPI) => {
        try {
            if (!param.id) return null;
            const res = await axios.get(`/categories/${param.id}`);
            return res.data.category;
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendCreate = createAsyncThunk(
    'categories/sendCreate',
    async (param, thunkAPI) => {
        try {
            if (!param) return null;
            let header = {
                headers: {
                    Authorization: `Bearer ${param.token}`,
                }
            }
            const res = await axios.post(`/categories`, param, header);
            param.navigate("/");
            toast.success("200, Category created");
            return res.data.category;
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendDelete = createAsyncThunk(
    'categories/sendDelete',
    async (param, thunkAPI) => {
        try {
            if (!param.id) return null;
            let header = {
                headers: {
                    Authorization: `Bearer ${param.token}`,
                }
            }
            await axios.delete(`/categories/${param.id}`, header);
            toast.success("200, Category deleted");
            window.location.reload(false);
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

const initialState = {
    error: null,
    status: 'idle',
    category: null,
    categories: [],
    count: 1,
    page: 1,
};

const slice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendGetOne.fulfilled, (state, action) => {
            state.categories = [];
            state.category = action.payload;
        })
        builder.addCase(sendList.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.category = null;
        })
        builder.addCase(sendCreate.fulfilled, (state, action) => {})
        builder.addCase(sendDelete.fulfilled, (state, action) => {})
    }
})

export default slice.reducer;
// export const {} = slice.actions;
