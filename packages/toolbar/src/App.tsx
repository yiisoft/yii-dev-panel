import React from 'react';
import '@yii-dev-panel/toolbar/App.css';
import {RouterProvider} from 'react-router-dom';
import {DefaultThemeProvider} from '@yii-dev-panel/sdk/Component/Theme/DefaultTheme';
import {Provider} from 'react-redux';
import {persistor, store} from '@yii-dev-panel/toolbar/store';
import {PersistGate} from 'redux-persist/integration/react';
import {createRouter} from '@yii-dev-panel/toolbar/router';
import {modules} from '@yii-dev-panel/toolbar/modules';

const router = createRouter(modules);

export default function App() {
    console.log('app, router', router);
    return (
        <Provider store={store}>
            {/*<PersistGate loading={<>Loading</>} persistor={persistor}>*/}
            {/*<DefaultThemeProvider>*/}
            <RouterProvider router={router} />
            {/*</DefaultThemeProvider>*/}
            {/*</PersistGate>*/}
        </Provider>
    );
}
