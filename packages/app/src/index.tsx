import * as serviceWorkerRegistration from '@yii-dev-panel/app/serviceWorkerRegistration';
import reportWebVitals from '@yii-dev-panel/app/reportWebVitals';
import {Config} from '@yii-dev-panel/sdk/Config';
import * as process from 'process';

Config.backendUrl = process.env.REACT_APP_BACKEND_URL;
Config.appEnv = process.env.REACT_APP_ENV;

import('@yii-dev-panel/app/bootstrap');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register();
