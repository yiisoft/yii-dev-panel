import {RouteObject} from 'react-router-dom';
import * as Pages from '@yiisoft/yii-dev-panel/Application/Pages';
import React from 'react';

export const routes = [
    {
        index: true,
        element: <Pages.IndexPage />,
    },
    {
        path: 'shared',
        element: <Pages.SharedPage />,
    },
] as RouteObject[];
