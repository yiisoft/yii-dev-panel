import {Layout} from '@yiisoft/yii-dev-panel/Module/Inspector/Component/Git/Layout';
import {BreadcrumbsContextProvider} from '@yiisoft/yii-dev-panel/Module/Inspector/Context/BreadcrumbsContext';
import {DataContextProvider} from '@yiisoft/yii-dev-panel/Module/Inspector/Context/DataContext';
import * as Pages from '@yiisoft/yii-dev-panel/Module/Inspector/Pages';
import {RouteObject} from 'react-router-dom';

export const routes = [
    {
        path: 'inspector',
        children: [
            {
                path: 'parameters',
                element: <Pages.ParametersPage />,
            },
            {
                path: 'definitions',
                element: (
                    <DataContextProvider>
                        <Pages.DefinitionsPage />
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
                path: 'events',
                element: <Pages.EventsPage />,
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
                path: 'phpinfo',
                element: <Pages.PhpInfoPage />,
            },
            {
                path: 'composer',
                element: <Pages.ComposerPage />,
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
            {
                path: 'cache',
                element: <Pages.CachePage />,
            },
        ],
    },
] satisfies RouteObject[];
