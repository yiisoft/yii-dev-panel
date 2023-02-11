import {RouteObject} from 'react-router-dom';
import * as Pages from './Pages';
import React from 'react';

export const routes = [
    {
        path: 'debug',
        element: <Pages.Layout />,
        children: [
            {
                element: <Pages.IndexPage />,
                index: true,
            },
            {
                path: 'object',
                element: <Pages.ObjectPage />,
            },
        ],
    },
] as RouteObject[];
