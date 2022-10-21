import {routes} from "./router";
import {middlewares, reducers} from "./api";

export const InspectorModule = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
}
