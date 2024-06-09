import {ErrorFallback} from '@yiisoft/yii-dev-panel-sdk/Component/ErrorFallback';
import {RouterOptionsContextProvider} from '@yiisoft/yii-dev-panel-sdk/Component/RouterOptions';
import {DefaultThemeProvider} from '@yiisoft/yii-dev-panel-sdk/Component/Theme/DefaultTheme';
import '@yiisoft/yii-dev-panel/App.css';
import {modules} from '@yiisoft/yii-dev-panel/modules';
import {createRouter} from '@yiisoft/yii-dev-panel/router';
import {createStore} from '@yiisoft/yii-dev-panel/store';
import {ErrorBoundary} from 'react-error-boundary';
import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom';
import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {CrossWindowEventType, dispatchWindowEvent} from '@yiisoft/yii-dev-panel-sdk/Helper/dispatchWindowEvent';

type AppProps = {
    config: {
        modules: {
            toolbar: boolean;
        };
        router: {
            basename: string;
            useHashRouter: boolean;
        };
        backend: {
            baseUrl: string;
            favoriteUrls: string;
        };
    };
};
export default function App({config}: AppProps) {
    const router = createRouter(modules, config.router, config.modules);
    const {store, persistor} = createStore({
        application: {
            baseUrl: config.backend.baseUrl,
            favoriteUrls: config.backend.favoriteUrls ?? [],
        },
    });

    useEffect(() => {
        dispatchWindowEvent(window.parent, 'panel.loaded', true);

        const listener = (event: MessageEvent) => {
            console.log('post message event', event);
            const data = event.data;

            if ('event' in data) {
                switch (data.event as CrossWindowEventType) {
                    case 'router.navigate':
                        router.navigate(data.value);
                        break;
                }
            }
        };

        window.addEventListener('message', listener);

        return () => {
            window?.removeEventListener('message', listener);
        };
    }, []);

    return (
        <RouterOptionsContextProvider baseUrl="" openLinksInNewWindow={false}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <DefaultThemeProvider>
                        <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[window.location.pathname]}>
                            <RouterProvider router={router} />
                        </ErrorBoundary>
                    </DefaultThemeProvider>
                </PersistGate>
            </Provider>
        </RouterOptionsContextProvider>
    );
}
