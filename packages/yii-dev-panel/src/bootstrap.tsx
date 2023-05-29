import '@yiisoft/yii-dev-panel/wdyr';

import App from '@yiisoft/yii-dev-panel/App';
import '@yiisoft/yii-dev-panel/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
