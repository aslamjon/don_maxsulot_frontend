import request from "../../services/api";

class Api {
    static Login = (attributes) => {
        return request.post(`auth/login`, {
            ...attributes
        });
    };
}

export default Api;











