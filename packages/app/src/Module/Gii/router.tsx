import { RouteObject } from "react-router-dom";
import * as Pages from "@yii-dev-panel/app/Module/Gii/Pages";
import React from "react";

export const routes = [
    {
        path: '/gii',
        element: <Pages.Layout />,
    },
] as RouteObject[];
