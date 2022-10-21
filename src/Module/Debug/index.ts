import {routes} from "./router";
import {middlewares, reducers} from "./api";

export const DebugModule= {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
}
