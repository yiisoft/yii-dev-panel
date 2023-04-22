import {ApplicationSlice} from '@yiisoft/yii-dev-panel-sdk/API/Application/ApplicationContext';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const applicationSliceConfig = {key: ApplicationSlice.reducer.name, version: 2, storage};

export const reducers = {
    [ApplicationSlice.name]: persistReducer(applicationSliceConfig, ApplicationSlice.reducer),
};
export const middlewares = [];