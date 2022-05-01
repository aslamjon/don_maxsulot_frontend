import RequestApi from "./index";
import {isEqual} from "lodash";

class Api {
    static getAll = (url, config,method='get') => {
        if (isEqual(method, 'post')) {
            return RequestApi.post(url, config);
        }
        return RequestApi.get(url, config);
    }
    static getOne = (url, config) => {
        return RequestApi.get(url, config);
    }
    static getData = (url, config, method = 'post') => {
        if (isEqual(method, 'get')) {
            return RequestApi.get(url, config);
        }
        return RequestApi.post(url, config);
    }
    static operationAdd = (url, attributes) => {
        return RequestApi.post(url, attributes);
    }
    static operationDelete = (url, config) => {
        return RequestApi.delete(url, config);
    }
    static operationUpdate = (url, attributes,method='put') => {
        if (isEqual(method, 'patch')) {
            return RequestApi.patch(url, attributes);
        }
        return RequestApi.put(url, attributes);
    }

    static request = (url, attributes,method = 'get', config) => {
        if (isEqual(method, 'patch')) {
            return RequestApi.patch(url, attributes);
        }
        if (isEqual(method, 'put')) {
            return RequestApi.put(url, attributes);
        }
        if (isEqual(method, 'delete')) {
            return RequestApi.delete(url, attributes);
        }
        if (isEqual(method, 'post')) {
            return RequestApi.post(url, attributes);
        }
        return RequestApi.get(url, attributes, config);
    }
}

export default Api;
