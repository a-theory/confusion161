import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "./axios";
import {toast} from "react-toastify";

export function asyncRequest(prefix, method, url, data ) {
    return createAsyncThunk(
        prefix,
        async (data, thunkAPI) => {
            try {
                let header = setupHeader(data);
                const res = await getRes(method, url, data, header);
                if (!errors(res)){
                    return res.data.users;
                }
            } catch (err) {
                toast.error(err.response.data.error);
            }
        }
    )
}

function setupHeader(data) {
    if (data.accessToken){
        return {
            headers: {
                Authorization: `Bearer ${data.accessToken}`,
            }
        }
    }
    return {}
}

async function getRes(method, url, data, header){
    // eslint-disable-next-line default-case
    switch (method) {
        case 'get': return await axios.get(url, header);
        case 'post': return await axios.post(url, data, header);
        case 'patch': return await axios.patch(url, data, header);
        case 'delete': return await axios.delete(url, header);
    }
}

function errors(res) {
    if (!res?.data?.status){
        const codes = {
            TOO_SHORT: 'Password too short'
        }

        if (res.data.error.code === 'FORMAT_ERROR') {
            toast.error(codes[res.data.error.fields.password]);
        }
        return true;
    }
    return false;
}
