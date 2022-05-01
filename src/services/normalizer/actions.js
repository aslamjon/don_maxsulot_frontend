import { createRoutine } from "redux-saga-routines";
const NORMALIZE = createRoutine("NORMALIZE");
const CHANGE_NORMALIZE_DATA = createRoutine("CHANGE_NORMALIZE_DATA");
export default {
    NORMALIZE,
    CHANGE_NORMALIZE_DATA
};
