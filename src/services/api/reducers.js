import Actions from "./Actions";
import get from "lodash/get";

export default function ApiReducer(state = {}, action) {
    switch (action.type) {
        case Actions.GET_DATA.REQUEST:
            return ((action, state) => {
                const { storeName } = action.payload;
                return {
                    ...state,
                    data: {
                        [storeName]: {
                            ...get(state, `data.${storeName}`, {}),
                            isFetched: false,
                        },
                    },
                };
            })(action, state);
        case Actions.GET_DATA.SUCCESS:
            return ((action, state) => {
                const { result, storeName } = action.payload;
                return {
                    ...state,
                    data: {
                        [storeName]: { result, isFetched: true },
                    },
                };
            })(action, state);
        case Actions.GET_DATA.FAILURE:
            return (() => {
                const { storeName, errors } = action.payload;
                return {
                    ...state,
                    data: {
                        [storeName]: {
                            isFetched: true,
                            hasErrors: true,
                            errors,
                        },
                    },
                };
            })();

        case Actions.GET_DATA.TRIGGER:
            return (() => {
                const { storeName } = action.payload;
                return {
                    ...state,
                    data: {
                        ...get(state, 'data', {}),
                        [storeName]: {
                            isFetched: false,
                        },
                    },
                };
            })();
        default:
            return state;
    }
}
