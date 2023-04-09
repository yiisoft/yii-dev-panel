import { giiApi } from "@yii-dev-panel/app/Module/Gii/API/Gii";

export const reducers = {
    [giiApi.reducerPath]: giiApi.reducer,
};
export const middlewares = [giiApi.middleware];
