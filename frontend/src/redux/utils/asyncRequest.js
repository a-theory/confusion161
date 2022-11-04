import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import config from "../../config/config";

export function asyncRequest(prefix, method, url) {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    return createAsyncThunk(
        prefix,
        async (data, thunkAPI) => {
            let header = setupHeader({data, accessToken});
            const {correctData, correctUrl} = setupData({
                data,
                url,
                userId
            });

            let resData = {}

            try {
                resData = await getRes({method, url: correctUrl, data: correctData, header});
            } catch (err) {
                if(err.response.status === 401){
                    header.headers.Authorization = `Bearer ${refreshToken}`
                    const resToken = await getRes({
                        method: "post",
                        url: `${config.url}/refresh?userId=${userId}`,
                        data: {},
                        header
                    });
                    localStorage.setItem('accessToken', resToken.data.accessToken)
                    header.headers.Authorization = `Bearer ${resToken.data.accessToken}`
                    const res = await getRes({method, url: correctUrl, data: correctData, header});
                    resData.data = res.data;
                }
                else toast.error(err.response.data.error);
            }

            if (!errors(resData)){
                return resData.data;
            }
        }
    )
}

function setupHeader({data, accessToken}) {
    if (accessToken){
        const headers = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }

        if (data?.file) {
            headers.headers['Content-Type'] = 'multipart/form-data'
        }
        return headers;
    }
    return {}
}

function setupData({data, url, userId}) {
    if (!data) data = {}
    if (!data.query) data.query = {};
    data.query.userId = userId;

    const myURL = new URL(`${config.url}${url}`);

    for (let property in data.query){
        myURL.searchParams.append(property, data.query[property]);
    }
    delete data.query;

    if (data?.file){
        const formData = new FormData();
        for (const property in data)
        formData.append(property, data[property]);
        data = formData;
    }

    const newUrl = myURL.toString()

    return { correctData: data, correctUrl: newUrl }
}

async function getRes({method, url, data, header}){
    // eslint-disable-next-line default-case
    switch (method) {
        case 'get': return axios.get(url, header);
        case 'post': return axios.post(url, data, header);
        case 'patch': return axios.patch(url, data, header);
        case 'delete': return axios.delete(url, header);
    }
    throw new Error();
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

