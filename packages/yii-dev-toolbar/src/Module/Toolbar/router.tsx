import {RouteObject} from 'react-router-dom';
import * as Pages from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Pages';
import React from 'react';

export const routes = [
    {
        path: '*',
        element: <Pages.Toolbar />,
    },
] satisfies RouteObject[];
