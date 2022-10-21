import {RouteObject} from "react-router-dom";
import {Middleware, Reducer} from "@reduxjs/toolkit";

export interface ModuleInterface {
    routes: RouteObject[];
    reducers: Record<string, Reducer>;
    middlewares: Middleware[];
}