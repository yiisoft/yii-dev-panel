import {Layout} from './Pages/Layout';
import {createBrowserRouter, createHashRouter, RouteObject} from 'react-router-dom';
import React from 'react';
import {ModuleInterface} from './Module/Module.types';

export function createRouter(modules: ModuleInterface[]) {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <Layout />,
            children: ([] as RouteObject[]).concat(...modules.map((module) => module.routes)),
        },
    ];
    return process.env.REACT_APP_ENV === 'github' ? createHashRouter(routes) : createBrowserRouter(routes);
}
