import {RouteObject} from 'react-router-dom';
import * as Pages from '@yiisoft/yii-dev-panel/Module/Debug/Pages';
import React from 'react';
import {ListPage} from '@yiisoft/yii-dev-panel/Module/Debug/Pages';

export const routes = [
    {
        path: 'debug',
        element: <Pages.Layout />,
        children: [
            {
                element: <Pages.IndexPage />,
                index: true,
            },
        ],
    },
    {
        path: 'debug/object',
        element: <Pages.ObjectPage />,
    },
    {
        path: 'debug/list',
        element: <Pages.ListPage />,
    },
] as RouteObject[];
