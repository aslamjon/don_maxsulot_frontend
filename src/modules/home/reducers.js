import Actions from "./actions";
import { get } from "lodash";

export default function AuthReducer(state = {}, action) {
    switch (action.type) {
        case Actions.EDIT_CARD.TRIGGER:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isFetched: false
            }
        default:
            return state
    }
}
