import React from 'react';
import '@yiisoft/yii-dev-toolbar/App.css';
import {RouterProvider} from 'react-router-dom';
import {DefaultThemeProvider} from '@yiisoft/yii-dev-panel-sdk/Component/Theme/DefaultTheme';
import {Provider} from 'react-redux';
import {store} from '@yiisoft/yii-dev-toolbar/store';
import {createRouter} from '@yiisoft/yii-dev-toolbar/router';
import {modules} from '@yiisoft/yii-dev-toolbar/modules';
import {CssBaseline} from '@mui/material';

const router = createRouter(modules);

export default function App() {
    return (
        <Provider store={store}>
            <DefaultThemeProvider>
                <CssBaseline />
                <RouterProvider router={router} />
            </DefaultThemeProvider>
        </Provider>
    );
}
