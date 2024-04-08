import '@yiisoft/yii-dev-toolbar/wdyr';

import App from '@yiisoft/yii-dev-toolbar/App';
import '@yiisoft/yii-dev-toolbar/index.css';
import reportWebVitals from '@yiisoft/yii-dev-toolbar/reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';

(function YiiDevPanelToolbarWidget(scope) {
    console.log('call toolbar');
    scope.init = function () {
        console.log('init', this);
        const container = document.getElementById(this.config.containerId) as HTMLElement;

        const root = ReactDOM.createRoot(container);
        root.render(
            <React.StrictMode>
                <App config={this.config.options} />
            </React.StrictMode>,
        );
    };
    scope.init();
})(
    window['YiiDevPanelToolbarWidget'] ?? {
        config: {
            containerId: 'yii-dev-toolbar',
            options: {
                router: {basename: ''},
                backend: {
                    baseUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
                },
            },
        },
    },
);
console.log('toolbar bundle');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
