import React from 'react';
import './App.css';
import {RouterProvider} from 'react-router-dom';
import {ThemeProvider} from '@mui/material';
import {theme} from './Component/Theme/DefaultTheme';
import {Provider} from 'react-redux';
import {persistor, store} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {createRouter} from './router';
import {modules} from './modules';

const router = createRouter(modules);

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
