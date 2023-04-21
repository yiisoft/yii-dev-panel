import React from 'react';
import '@yiisoft/yii-dev-panel/App.css';
import {RouterProvider} from 'react-router-dom';
import {DefaultThemeProvider} from '@yiisoft/yii-dev-panel-sdk/Component/Theme/DefaultTheme';
import {Provider} from 'react-redux';
import {persistor, store} from '@yiisoft/yii-dev-panel/store';
import {PersistGate} from 'redux-persist/integration/react';
import {createRouter} from '@yiisoft/yii-dev-panel/router';
import {modules} from '@yiisoft/yii-dev-panel/modules';

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
