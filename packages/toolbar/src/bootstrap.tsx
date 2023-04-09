import '@yii-dev-panel/toolbar/wdyr';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@yii-dev-panel/toolbar/index.css';
import App from '@yii-dev-panel/toolbar/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
