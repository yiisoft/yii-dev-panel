import {RouteObject} from 'react-router-dom';
import React from 'react';
import * as Pages from './Pages';

export const routes = [
    {
        path: 'inspector',
        children: [
            {
                path: 'parameters',
                element: <Pages.ParametersPage />,
            },
            {
                path: 'configuration',
                element: <Pages.ConfigurationPage />,
            },
            {
                path: 'tests',
                element: <Pages.TestsPage />,
            },
            {
                path: 'analyse',
                element: <Pages.PsalmPage />,
            },
            {
                path: 'routes',
                element: <Pages.RoutesPage />,
            },
            {
                path: 'files',
                element: <Pages.FileExplorerPage />,
            },
            {
                path: 'commands',
                element: <Pages.CommandsPage />,
            },
            {
                path: 'container',
                children: [
                    {
                        index: true,
                        element: <Pages.ContainerPage />,
                    },
                    {
                        path: 'view',
                        element: <Pages.ContainerEntryPage />,
                    },
                ],
            },
        ],
    },
] as RouteObject[];
