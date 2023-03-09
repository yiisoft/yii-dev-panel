import {RouteObject} from 'react-router-dom';
import * as Pages from './Pages';
import React from 'react';

export const routes = [
    {
        path: '/open-api',
        element: <Pages.Layout />,
    },
] as RouteObject[];
