import '@yiisoft/yii-dev-toolbar/wdyr';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@yiisoft/yii-dev-toolbar/index.css';
import App from '@yiisoft/yii-dev-toolbar/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
