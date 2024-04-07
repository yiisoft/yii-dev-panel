import '@yiisoft/yii-dev-panel/wdyr';

import App from '@yiisoft/yii-dev-panel/App';
import '@yiisoft/yii-dev-panel/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

(function YiiDevPanelWidget(scope) {
    console.log('set widget', scope);
    scope.init = function () {
        console.log('this', this);
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
    window['YiiDevPanelWidget'] ?? {
        config: {
            containerId: 'root',
            options: {router: {basename: ''}},
        },
    },
);
