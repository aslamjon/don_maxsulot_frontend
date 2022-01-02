import {all, call, put, takeEvery, takeLatest} from "redux-saga/effects";
import Actions from "./actions";
import {get} from "lodash";


function* setMenuItemActiveId(action) {
    const {
        id = null
    } = action.payload;
    try {
        yield put({type: Actions.SET_ACTIVE_MENU_ITEM_ID.SUCCESS, payload: {id}});
    } catch (e) {
        yield put({
            type: Actions.SET_ACTIVE_MENU_ITEM_ID.FAILURE,
        });
    }
}

function* setOpenSubmenu(action) {
    const {
        open = null
    } = action.payload;
    try {
        yield put({type: Actions.SET_OPEN_SUBMENU.SUCCESS, payload: {open}});
    } catch (e) {
        yield put({
            type: Actions.SET_OPEN_SUBMENU.FAILURE,
        });
    }
}

function* setOpenSidebar(action) {
    const {
        open = null
    } = action.payload;
    try {
        yield put({type: Actions.SET_OPEN_SIDEBAR.SUCCESS, payload: {open}});
    } catch (e) {
        yield put({
            type: Actions.SET_OPEN_SIDEBAR.FAILURE,
        });
    }
}

function* setBreadcrumbItem(action) {
    const {
        item = null
    } = action.payload;
    try {
        yield put({type: Actions.ADD_BREADCRUMB_ITEM.SUCCESS, payload: {item}});
        yield put({type: Actions.SET_ACTIVE_BREADCRUMB_ITEM.SUCCESS, payload: {pathname:get(item,'url',null)}});
    } catch (e) {
        yield put({
            type: Actions.SET_BREADCRUMB_ITEM.FAILURE,
        });
    }
}
function* setActiveBreadcrumbItem(action) {
    const {
        pathname = null
    } = action.payload;
    try {
        yield put({type: Actions.SET_ACTIVE_BREADCRUMB_ITEM.SUCCESS, payload: {pathname}});
    } catch (e) {
        yield put({
            type: Actions.SET_ACTIVE_BREADCRUMB_ITEM.FAILURE,
        });
    }
}

function* removeBreadcrumbItem(action) {
    const {
        items = []
    } = action.payload;
    try {
        yield put({type: Actions.REMOVE_BREADCRUMB_ITEM.SUCCESS, payload: {items}});
    } catch (e) {
        yield put({
            type: Actions.REMOVE_BREADCRUMB_ITEM.FAILURE,
        });
    }
}


export default function* sagas() {
    yield all([
        takeLatest(Actions.SET_ACTIVE_MENU_ITEM_ID.REQUEST, setMenuItemActiveId),
        takeLatest(Actions.SET_OPEN_SUBMENU.REQUEST, setOpenSubmenu),
        takeLatest(Actions.SET_OPEN_SIDEBAR.REQUEST, setOpenSidebar),
        takeLatest(Actions.ADD_BREADCRUMB_ITEM.REQUEST, setBreadcrumbItem),
        takeLatest(Actions.SET_ACTIVE_BREADCRUMB_ITEM.REQUEST, setActiveBreadcrumbItem),
        takeLatest(Actions.REMOVE_BREADCRUMB_ITEM.REQUEST, removeBreadcrumbItem),
    ]);
}
