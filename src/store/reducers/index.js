import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import normalizer from "./../../services/normalizer/reducers";
import auth from "./../../modules/auth/reducers";
import settings from "../../modules/settings/reducers";

const rootReducer = combineReducers({
    normalizer,
    auth,
    settings,
});

const persistConfig = {
    key: 'storage',
    blacklist: ['normalizer'],
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;