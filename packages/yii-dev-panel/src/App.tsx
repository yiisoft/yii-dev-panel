import {ErrorFallback} from '@yiisoft/yii-dev-panel-sdk/Component/ErrorFallback';
import {DefaultThemeProvider} from '@yiisoft/yii-dev-panel-sdk/Component/Theme/DefaultTheme';
import '@yiisoft/yii-dev-panel/App.css';
import {modules} from '@yiisoft/yii-dev-panel/modules';
import {createRouter} from '@yiisoft/yii-dev-panel/router';
import {persistor, store} from '@yiisoft/yii-dev-panel/store';
import {ErrorBoundary} from 'react-error-boundary';
import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';

const router = createRouter(modules);

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <DefaultThemeProvider>
                    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[window.location.pathname]}>
                        <RouterProvider router={router} />
                    </ErrorBoundary>
                </DefaultThemeProvider>
            </PersistGate>
        </Provider>
    );
}
