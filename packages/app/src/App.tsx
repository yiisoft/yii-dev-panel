import React from 'react';
import '@yii-dev-panel/app/App.css';
import {RouterProvider} from 'react-router-dom';
import {DefaultThemeProvider} from '@yii-dev-panel/sdk/Component/Theme/DefaultTheme';
import {Provider} from 'react-redux';
import {persistor, store} from '@yii-dev-panel/app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {createRouter} from '@yii-dev-panel/app/router';
import {modules} from '@yii-dev-panel/app/modules';

const router = createRouter(modules);

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <DefaultThemeProvider>
                    <RouterProvider router={router} />
                </DefaultThemeProvider>
            </PersistGate>
        </Provider>
    );
}
