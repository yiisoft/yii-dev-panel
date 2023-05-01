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

// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
const sse = () => {
    // const button = document.querySelector('button');
    const evtSource = new EventSource('http://127.0.0.1:8080/debug/api/sse');
    // const evtSource = new EventSource('http://localhost:8080/see.php', {
    //   withCredentials: true,
    // });
    console.log(evtSource.withCredentials);
    console.log(evtSource.readyState);
    console.log(evtSource.url);

    evtSource.onopen = function () {
        console.log('Connection to server opened.');
    };

    evtSource.onmessage = function (e) {
        console.log('message: ', e);
    };

    evtSource.onerror = function () {
        console.log('EventSource failed.');
    };

    // button.onclick = function () {
    //     console.log('Connection closed');
    //     evtSource.close();
    // };
};
try {
    // sse();
} catch (e) {
    console.log(e);
}
