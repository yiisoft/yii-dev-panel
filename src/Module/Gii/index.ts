import {routes} from "./router";
import {middlewares, reducers} from "./api";

export const GiiModule = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
}
