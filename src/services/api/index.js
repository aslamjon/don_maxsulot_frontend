import axios from "axios";
import config from "../../config";
import storage from "../local-storage";
import history from "../../router/history";
import {toast} from "react-toastify";
import {get} from "lodash";

const request = axios.create({
    baseURL: config.API_ROOT,
    params: {},
});

request.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
        // debugger
        const token = get(JSON.parse(get(JSON.parse(storage.get('persist:storage')),'auth',null)),'token',null) || null;
        // debugger
        if(token) {
            config.headers.Authorization = `${get(token,'tokenType')} ${get(token,'accessToken')}`
        }
    }
    return config;
}, (error) => {
    console.log(error)
});

request.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const statusCode = error.response.status;
    if (statusCode == 401) {
        storage.remove('token');
        history.push('/auth');
    }
    if(statusCode == 500){
        toast.error('Server error please try again. Sorry!')
    }

    return Promise.reject(error);
});

export default request;