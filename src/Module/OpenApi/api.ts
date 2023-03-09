import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {openApiSlice} from './Context/Context';

const openApiSliceConfig = {
    key: openApiSlice.reducer.name,
    version: 1,
    storage,
};

export const reducers = {
    [openApiSlice.name]: persistReducer(openApiSliceConfig, openApiSlice.reducer),
};

export const middlewares = [];
