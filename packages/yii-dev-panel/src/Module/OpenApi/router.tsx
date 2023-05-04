import {RouteObject} from 'react-router-dom';
import * as Pages from '@yiisoft/yii-dev-panel/Module/OpenApi/Pages';
import React from 'react';

export const routes = [
    {
        path: '/open-api',
        element: <Pages.Layout />,
    },
] satisfies RouteObject[];
