import {RouteObject} from 'react-router-dom';
import React from 'react';
import * as Pages from './Pages';
import {DataContextProvider} from './Context/DataContext';
import {Layout} from './Component/Git/Layout';
import {BreadcrumbsContextProvider} from './Context/BreadcrumbsContext';

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
                element: (
                    <DataContextProvider>
                        <Pages.ConfigurationPage />
                    </DataContextProvider>
                ),
            },
            {
                path: 'tests',
                element: <Pages.TestsPage />,
            },
            {
                path: 'analyse',
                element: <Pages.AnalysePage />,
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
                path: 'translations',
                element: <Pages.TranslationsPage />,
            },
            {
                path: 'commands',
                element: <Pages.CommandsPage />,
            },
            {
                path: 'database',
                children: [
                    {
                        index: true,
                        element: <Pages.DatabasePage />,
                    },
                    {
                        path: ':table',
                        element: <Pages.TablePage />,
                    },
                ],
            },
            {
                path: 'container',
                children: [
                    {
                        index: true,
                        element: (
                            <DataContextProvider>
                                <Pages.ContainerPage />
                            </DataContextProvider>
                        ),
                    },
                    {
                        path: 'view',
                        element: <Pages.ContainerEntryPage />,
                    },
                ],
            },
            {
                path: 'git',
                element: (
                    <BreadcrumbsContextProvider>
                        <Layout />
                    </BreadcrumbsContextProvider>
                ),
                children: [
                    {
                        index: true,
                        element: <Pages.GitPages.GitPage />,
                    },
                    {
                        path: 'log',
                        element: <Pages.GitPages.GitLogPage />,
                    },
                ],
            },
        ],
    },
] as RouteObject[];
