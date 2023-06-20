import {Config} from '@yiisoft/yii-dev-panel-sdk/Config';
import * as serviceWorkerRegistration from '@yiisoft/yii-dev-panel-sdk/serviceWorkerRegistration';
import reportWebVitals from '@yiisoft/yii-dev-panel/reportWebVitals';

Config.backendUrl = import.meta.env.VITE_BACKEND_URL;
Config.appEnv = import.meta.env.VITE_ENV;

import('@yiisoft/yii-dev-panel/bootstrap');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register();
