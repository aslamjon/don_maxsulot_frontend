import { createRoutine } from "redux-saga-routines";

const EDIT_CARD = createRoutine("EDIT_CARD");
const DELETE_CARD = createRoutine("DELETE_CARD");

export default {
  EDIT_CARD,
  DELETE_CARD
}