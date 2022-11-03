import { createSlice } from '@reduxjs/toolkit';
import {asyncRequest} from "../utils/asyncRequest";

export const sendList = asyncRequest(
    'categories/sendList',
    'get',
    '/categories',
)

export const sendGetOne = asyncRequest(
    'categories/sendGetOne',
    'get',
    `/category/`
)

export const sendCreate = asyncRequest(
    'categories/sendCreate',
    'post',
    `/category`
)

export const sendDelete = asyncRequest(
    'categories/sendDelete',
    'delete',
    `/category`
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
            state.category = action.payload.category;
        })
        builder.addCase(sendList.fulfilled, (state, action) => {
            state.categories = action.payload.categories;
            state.category = null;
        })
        builder.addCase(sendCreate.fulfilled, (state, action) => {})
        builder.addCase(sendDelete.fulfilled, (state, action) => {})
    }
})

export default slice.reducer;
// export const {} = slice.actions;
