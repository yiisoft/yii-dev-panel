import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Layout} from "./Pages/Layout";
import {ThemeProvider} from "@mui/material";
import {theme} from "./Component/Theme/DefaultTheme";
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {routes as ApplicationRoutes} from "./Application/router";
import {routes as DebugRoutes} from "./Module/Debug/router";
import {routes as GiiRoutes} from "./Module/Gii/router";
import {routes as InspectorRoutes} from "./Module/Inspector/router";
import {PersistGate} from "redux-persist/integration/react";

const routes = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            ...ApplicationRoutes,
            ...DebugRoutes,
            ...GiiRoutes,
            ...InspectorRoutes,
        ],
    }
];
const router = createBrowserRouter(routes);

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <RouterProvider router={router}/>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
