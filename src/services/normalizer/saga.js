import {all, call, put, takeLatest} from 'redux-saga/effects';
import actions from './actions';
import Normalizer from "./index";
import NormalizerAction from "./actions";
import Actions from "../api/actions";

function* requestNormalize(action) {
    const { entities, result, storeName, entityName,infinite=false } = action.payload;
    try {
        yield put({
            type: actions.NORMALIZE.SUCCESS,
            payload: { entities, result, storeName, entityName,infinite },
        });
    } catch (e) {
        yield put({
            type: actions.NORMALIZE.FAILURE,
            payload: {
                storeName,
                entityName,
                infinite
            },
        });
    }
}

function* changeNormalizeData(action) {
    const { data, normalize_data, entities, scheme, storeName, entityName, infinite } = action.payload;

    // const deNormalizeData = yield call(Normalizer.Denormalize, get(normalize_data, "result.data",{}), [scheme], entities);
    // console.log( deNormalizeData);


    // const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    // yield put({
    //     type: NormalizerAction.NORMALIZE.REQUEST,
    //     payload: { ...normalizedData, storeName, entityName, infinite }
    // });

    // yield put({ type: NormalizerAction.CHANGE_NORMALIZE_DATA.SUCCESS, payload: normalizedData });
    yield put({ type: NormalizerAction.CHANGE_NORMALIZE_DATA.SUCCESS, payload: { normalize_data, entities, scheme } });
}

export default function* sagas() {
    yield all([
        takeLatest(actions.NORMALIZE.REQUEST, requestNormalize),
        takeLatest(actions.CHANGE_NORMALIZE_DATA.REQUEST, changeNormalizeData),
    ]);
}
