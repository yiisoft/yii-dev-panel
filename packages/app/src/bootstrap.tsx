import '@yii-dev-panel/app/wdyr';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@yii-dev-panel/app/index.css';
import App from '@yii-dev-panel/app/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
