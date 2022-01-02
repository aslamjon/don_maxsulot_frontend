import request from "../../services/api";

class Api {

    static LoginOrSignUp = (attributes) => {
        return request.post("user/isthere", {
            ...attributes
        });
    };

    static SendSmsForSignUp = (attributes) => {
        return request.post("auth/login", {
            ...attributes
        });
    };


    static Login = (attributes) => {
        return request.post(`auth/v1/auth/sign-in`, {
            ...attributes
        });
    };

    static SignUp = (attributes) => {
        return request.post(`auth/v1/auth/sign-up`, {
            ...attributes
        });
    };

    static GetMe = (token = null) => {
        if (token) {
            return request.get('auth/v1/user/me', {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            });
        }

        return request.get('auth/v1/user/me');
    }

    static SendSmsForLoginOrForgotPassword = (attributes) => {
        return request.post("auth/v1/auth/check-code", {
            ...attributes
        });
    };
}

export default Api;











