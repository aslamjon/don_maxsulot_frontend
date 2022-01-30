import {createRoutine} from "redux-saga-routines";

const SET_ACTIVE_MENU_ITEM_ID = createRoutine("SET_ACTIVE_MENU_ITEM_ID");
const SET_OPEN_SUBMENU = createRoutine("SET_OPEN_SUBMENU");
const SET_OPEN_SIDEBAR = createRoutine("SET_OPEN_SIDEBAR");
const ADD_BREADCRUMB_ITEM = createRoutine("ADD_BREADCRUMB_ITEM");
const SET_ACTIVE_BREADCRUMB_ITEM = createRoutine("SET_ACTIVE_BREADCRUMB_ITEM");
const REMOVE_BREADCRUMB_ITEM = createRoutine("REMOVE_BREADCRUMB_ITEM");
const SET_MODE = createRoutine("SET_MODE");


export default {
    SET_ACTIVE_MENU_ITEM_ID,
    SET_OPEN_SUBMENU,
    SET_OPEN_SIDEBAR,
    ADD_BREADCRUMB_ITEM,
    SET_ACTIVE_BREADCRUMB_ITEM,
    REMOVE_BREADCRUMB_ITEM,
    SET_MODE
}
