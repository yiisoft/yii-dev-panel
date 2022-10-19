import {RouteObject} from "react-router-dom";
import * as Pages from "./Pages";
import React from "react";

export const routes = [
    {
        index: true,
        element: <Pages.IndexPage/>,
    },
] as RouteObject[];