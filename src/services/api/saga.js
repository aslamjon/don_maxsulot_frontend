import { all, call, put, takeEvery } from "redux-saga/effects";
import Actions from "./actions";
import Api from "./api";
import Normalizer from "../normalizer";
import NormalizerAction from "../normalizer/actions";

function* getAll(action) {
    const {
        url,
        config,
        scheme,
        storeName,
        entityName,
        callback,
        cb = {
            success: () => {},
            fail: () => {}
        }
    } = action.payload;
    try {
        const { data } = yield call(Api.getAll, url, config);
        const normalizedData = yield call(Normalizer.Normalize, data, scheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: { ...normalizedData, storeName, entityName }
        });
        try {
            yield call(callback, data);
        } catch (e) {}
        yield put({ type: Actions.GET_ALL.SUCCESS, payload: normalizedData });
        yield call(cb.success, normalizedData, data);
    } catch (e) {
        yield put({
            type: Actions.GET_ALL.FAILURE,
            payload: { storeName, errors: e.response.data }
        });
        yield put({
            type: NormalizerAction.NORMALIZE.FAILURE,
            payload: { storeName, errors: e.response.data }
        });
        yield call(cb.fail, e);
    }
}
function* getAllTrigger(action) {
    const {
        payload: { storeName }
    } = action;
    yield put({
        type: NormalizerAction.NORMALIZE.TRIGGER,
        payload: { storeName }
    });
}
function* getOneTrigger(action) {
    const {
        payload: { storeName }
    } = action;
    yield put({
        type: NormalizerAction.NORMALIZE.TRIGGER,
        payload: { storeName }
    });
}
function* getOne(action) {
    const {
        payload: { url, config, scheme = {}, storeName, entityName, callback }
    } = action;
    try {
        const { data } = yield call(Api.getOne, url, config);
        const normalizedData = yield call(Normalizer.Normalize, data, scheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: { ...normalizedData, storeName, entityName }
        });
        try {
            yield call(callback, data);
        } catch (e) {}
        yield put({ type: Actions.GET_ONE.SUCCESS, payload: normalizedData });
    } catch (e) {
        yield put({
            type: Actions.GET_ONE.FAILURE,
            payload: { storeName, errors: e.response.data }
        });
        yield put({
            type: NormalizerAction.NORMALIZE.FAILURE,
            payload: { storeName, errors: e.response.data }
        });
    }
}

function* getData(action) {
    const { url, storeName, config = {}, callback = () => {} } = action.payload;
    try {
        const { data } = yield call(Api.getData, url, config);
        yield put({
            type: Actions.GET_DATA.SUCCESS,
            payload: { result: data, storeName }
        });
        try {
            yield call(callback, data);
        } catch (e) {}
    } catch (e) {
        yield put({
            type: Actions.GET_DATA.FAILURE,
            payload: { storeName, errors: e.response.data }
        });
    }
}

function* getDataTrigger(action) {
    const {
        payload: { storeName }
    } = action;
    yield put({ type: Actions.GET_DATA.TRIGGER, payload: { storeName } });
}

export default function* sagas() {
    yield all([
        takeEvery(Actions.GET_ALL.REQUEST, getAll),
        takeEvery(Actions.GET_ONE.REQUEST, getOne),
        takeEvery(Actions.GET_ALL.TRIGGER, getAllTrigger),
        takeEvery(Actions.GET_ONE.TRIGGER, getOneTrigger),
        takeEvery(Actions.GET_DATA.REQUEST, getData),
        takeEvery(Actions.GET_DATA.TRIGGER, getDataTrigger)
    ]);
}
