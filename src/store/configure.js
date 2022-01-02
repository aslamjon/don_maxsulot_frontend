import { createStore } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from 'redux-persist';
import reducers from './reducers'
import { apply, afterCreate } from "./middlewares";

export default function configureStore(initialState = {}) {
    const store = afterCreate(createStore(reducers, composeWithDevTools(apply)));
    const persistor = persistStore(store);
    return { store, persistor };
}
