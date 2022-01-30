import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configure from './configure';
import { InitialLoader } from "../components/loader";

const { store, persistor } = configure();

export default ({ children }) => {
    return <Provider store={store}>
        <PersistGate loading={<InitialLoader />} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
};
