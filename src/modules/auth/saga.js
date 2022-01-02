import { all, call, put, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import Actions from "./actions";
import ApiService from "./api";
import { showError } from "../../utils";

function* checkAuthRequest(action) {
    const { token = null } = action.payload;
    try {

        const { data } = yield call(ApiService.GetMe, token);

        yield put({ type: Actions.CHECK_AUTH.SUCCESS, payload: { user: get(data, 'data', null) } });
    } catch (e) {
        yield put({ type: Actions.CHECK_AUTH.FAILURE });
    }
}



function* loginOrSignUpRequest(action) {
    const {
        payload: {
            attributes,
            formMethods: { setLoading, setError },
            cb = {
                success: () => {
                },
                fail: () => {
                },
            },
        },
    } = action;

    try {
        const { data } = yield call(ApiService.LoginOrSignUp, attributes);
        yield put({ type: Actions.LOGIN_OR_SIGNUP.SUCCESS });
        setLoading(false);
        yield call(cb.success, { ...data, ...attributes });
    } catch (e) {
        setLoading(false);
        showError(e, setError);
        yield put({ type: Actions.LOGIN_OR_SIGNUP.FAILURE });
    }

}

function* sendSmsForSignUpRequest(action) {
    const {
        payload: {
            attributes,
            formMethods: { setLoading, setError },
            cb = {
                success: () => {
                },
                fail: () => {
                },
            },
        },
    } = action;

    try {
        const { data } = yield call(ApiService.SendSmsForSignUp, attributes);
        yield put({ type: Actions.SEND_SMS_FOR_SIGNUP.SUCCESS });
        setLoading(false);
        yield call(cb.success, { ...get(data, 'data', {}), ...attributes });
    } catch (e) {
        yield put({ type: Actions.SEND_SMS_FOR_SIGNUP.FAILURE });
        setLoading(false);
        showError(e, setError);
    }
}


function* signUpRequest(action) {
    const {
        payload: {
            attributes,
            formMethods: { setLoading, setError },
            cb = {
                success: () => {
                },
                fail: () => {
                },
            },
        },
    } = action;

    try {
        const { data } = yield call(ApiService.SignUp, attributes);
        yield put({ type: Actions.SIGN_UP.SUCCESS });
        setLoading(false);
        yield call(cb.success, { ...get(data, 'data'), ...attributes });
        yield put({ type: Actions.SAVE_TOKEN.SUCCESS, payload: { token: get(data, 'data', null) } });
    } catch (e) {
        yield put({ type: Actions.SIGN_UP.FAILURE });
        setLoading(false);
        showError(e, setError);
    }

}


function* loginRequest(action) {
    const {
        payload: {
            attributes,
            formMethods: { setLoading, setError },
            cb = {
                success: () => {
                },
                fail: () => {
                },
            },
        },
    } = action;

    try {
        const { data } = yield call(ApiService.Login, attributes);
        yield put({ type: Actions.LOGIN.SUCCESS, payload: { data } });
        setLoading(false);
        yield call(cb.success, { ...get(data, 'data'), ...attributes });
    } catch (e) {
        yield put({ type: Actions.LOGIN.FAILURE });
        setLoading(false);
        showError(e, setError);
    }

}

function* sendSmsForLoginOrForgotPasswordRequest(action) {
    const {
        payload: {
            attributes,
            formMethods: { setLoading, setError },
            cb = {
                success: () => {
                },
                fail: () => {
                },
            },
        },
    } = action;

    try {
        const { data } = yield call(ApiService.SendSmsForLoginOrForgotPassword, attributes);
        yield put({ type: Actions.SEND_SMS_FOR_LOGIN_OR_FORGOT_PASSWORD.SUCCESS });
        setLoading(false);
        yield call(cb.success, { ...get(data, 'data', {}), ...attributes });
        yield put({ type: Actions.SAVE_TOKEN.SUCCESS, payload: { token: get(data, 'data', null) } });
    } catch (e) {
        yield put({ type: Actions.SEND_SMS_FOR_LOGIN_OR_FORGOT_PASSWORD.FAILURE });
        setLoading(false);
        showError(e, setError);
    }
}




function* logoutAuth() {
    yield put({ type: Actions.CHECK_AUTH.REQUEST });
}


export default function* sagas() {
    yield all([
        takeLatest(Actions.CHECK_AUTH.REQUEST, checkAuthRequest),
        takeLatest(Actions.LOGIN_OR_SIGNUP.REQUEST, loginOrSignUpRequest),
        takeLatest(Actions.SEND_SMS_FOR_SIGNUP.REQUEST, sendSmsForSignUpRequest),
        takeLatest(Actions.LOGIN.REQUEST, loginRequest),
        takeLatest(Actions.SIGN_UP.REQUEST, signUpRequest),
        takeLatest(Actions.SEND_SMS_FOR_LOGIN_OR_FORGOT_PASSWORD.REQUEST, sendSmsForLoginOrForgotPasswordRequest),
        takeLatest(Actions.LOGOUT.REQUEST, logoutAuth),
    ]);
}
