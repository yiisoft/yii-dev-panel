import '@yiisoft/yii-dev-panel/wdyr';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@yiisoft/yii-dev-panel/index.css';
import App from '@yiisoft/yii-dev-panel/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
