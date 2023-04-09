import {RouteObject} from 'react-router-dom';
import * as Pages from '@yii-dev-panel/toolbar/Module/Toolbar/Pages';
import React from 'react';

export const routes = [
    {
        path: '*',
        element: <Pages.Toolbar />,
    },
] as RouteObject[];
