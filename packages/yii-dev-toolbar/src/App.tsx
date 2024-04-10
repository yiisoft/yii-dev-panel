import {RouterOptionsContextProvider} from '@yiisoft/yii-dev-panel-sdk/Component/RouterOptions';
import {DefaultThemeProvider} from '@yiisoft/yii-dev-panel-sdk/Component/Theme/DefaultTheme';
import '@yiisoft/yii-dev-toolbar/App.css';
import {modules} from '@yiisoft/yii-dev-toolbar/modules';
import {createRouter} from '@yiisoft/yii-dev-toolbar/router';
import {createStore} from '@yiisoft/yii-dev-toolbar/store';
import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom';

type AppProps = {
    config: {
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
    const router = createRouter(modules, config.router);
    const {store} = createStore({
        application: {
            baseUrl: config.backend.baseUrl,
            favoriteUrls: config.backend.favoriteUrls ?? [],
        },
    });

    return (
        <RouterOptionsContextProvider baseUrl="debug" openLinksInNewWindow={true}>
            <Provider store={store}>
                <DefaultThemeProvider>
                    <RouterProvider router={router} />
                </DefaultThemeProvider>
            </Provider>
        </RouterOptionsContextProvider>
    );
}
