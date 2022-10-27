import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import { toast } from 'react-toastify';

export const sendList = createAsyncThunk(
    'articles/sendList',
    async (param, thunkAPI) => {
        try {
            const res = await axios.get(`/articles`);
            return res.data.articles;
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendGetOne = createAsyncThunk(
    'articles/sendGetOne',
    async (id, thunkAPI) => {
        try {
            if (!id) return null;
            const res = await axios.get(`/articles/${id}`);
            return {article: res.data.article, html: res.data.html};
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendCreate = createAsyncThunk(
    'articles/sendCreate',
    async (param, thunkAPI) => {
        try {
            if (!param) return null;
            let header = {
                headers: {
                    Authorization: `Bearer ${param.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
            const formData = new FormData();
            formData.append("file", param.file);
            formData.append("categories", param.categories);
            formData.append("name", param.name);
            formData.append("brief", param.brief);
            const res = await axios.post(`/articles`, formData, header);
            param.navigate("/");
            toast.success("200, Article created");
            return res.data.article;
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendDelete = createAsyncThunk(
    'articles/sendDelete',
    async (param, thunkAPI) => {
        try {
            if (!param.id) return null;
            let header = {
                headers: {
                    Authorization: `Bearer ${param.token}`,
                }
            }
            await axios.delete(`/articles/${param.id}`, header);
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
    article: null,
    html: null,
    articles: [],
    count: 1,
    page: 1,
};

const slice = createSlice({
    name: 'articles',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendGetOne.fulfilled, (state, action) => {
            state.articles = [];
            state.article = action.payload.article;
            state.html = action.payload.html;
            state.status = "done";
        })
        builder.addCase(sendList.fulfilled, (state, action) => {
            state.article = null;
            state.articles = action.payload;
            state.status = "done";
        })
        builder.addCase(sendCreate.fulfilled, (state, action) => {
            state.article = action.payload;
            state.status = "done";
        })
        builder.addCase(sendDelete.fulfilled, (state, action) => {})
    }
})

export default slice.reducer;
// export const {} = slice.actions;
