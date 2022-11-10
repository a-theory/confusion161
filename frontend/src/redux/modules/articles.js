import { createSlice } from '@reduxjs/toolkit';
import {asyncRequest} from "../utils/asyncRequest";
import {toast} from "react-toastify";

export const sendList = asyncRequest(
    'articles/sendList',
    'get',
    '/articles',
)

export const sendGetOne = asyncRequest(
    'articles/sendGetOne',
    'get',
    '/article',
)

export const sendCreate = asyncRequest(
    'articles/sendCreate',
    'post',
    '/article',
)

export const sendUploadImage = asyncRequest(
    'articles/sendUploadImage',
    'post',
    '/articles/image',
)

export const sendDelete = asyncRequest(
    'articles/sendDelete',
    'delete',
    '/article',
)

const initialState = {
    error: null,
    status: 'idle',
    article: null,
    html: null,
    url: null,
    articles: [],
    count: 1,
    page: 1,
};

const slice = createSlice({
    name: 'articles',
    initialState: initialState,
    reducers: {
        cleanUrl: (state, action) => {
            state.url = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendGetOne.fulfilled, (state, action) => {
            state.articles = [];
            state.article = action.payload.article;
            state.html = action.payload.html;
        })
        builder.addCase(sendList.fulfilled, (state, action) => {
            state.article = null;
            state.articles = action.payload;
        })
        builder.addCase(sendCreate.fulfilled, (state, action) => {
            toast.success("Created");
        })
        builder.addCase(sendUploadImage.fulfilled, (state, action) => {
            state.url = action.payload.url;
            toast.success("Image uploaded");
        })
        builder.addCase(sendDelete.fulfilled, (state, action) => {
            toast.success("Deleted");
        })
    }
})

export default slice.reducer;
export const {cleanUrl} = slice.actions;
