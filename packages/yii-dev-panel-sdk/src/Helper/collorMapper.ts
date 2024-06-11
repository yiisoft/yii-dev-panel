import {AlertColor} from '@mui/material';
import {PhpLoggerLevel} from '@yiisoft/yii-dev-panel-sdk/Types/logger';

export const phpLoggerLevelToAlertColor = (status: PhpLoggerLevel): AlertColor => {
    switch (status) {
        case 'emergency':
        case 'alert':
        case 'critical':
        case 'error':
            return 'error';
        case 'warning':
            return 'warning';
        case 'notice':
        case 'info':
        case 'debug':
            return 'info';
    }
    return 'success';
};
