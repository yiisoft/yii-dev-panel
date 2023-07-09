import {ApplicationSlice} from '@yiisoft/yii-dev-panel-sdk/API/Application/ApplicationContext';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const applicationSliceConfig = {
    key: ApplicationSlice.name,
    version: 2,
    storage,
};

export const reducers = {
    [ApplicationSlice.name]: persistReducer(applicationSliceConfig, ApplicationSlice.reducer),
};
export const middlewares = [];
