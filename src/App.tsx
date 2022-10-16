import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {IndexPage} from "./Pages/IndexPage";
import {Layout} from "./Pages/Layout";
import {ThemeProvider} from "@mui/material";
import {theme} from "./Theme/DefaultTheme";
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {ParametersPage} from "./Pages/Inspector/ParametersPage";
import {ConfigurationPage} from "./Pages/Inspector/ConfigurationPage";
import {ContainerPage} from "./Pages/Inspector/ContainerPage";
import * as DebugPages from "./Pages/Debug";
import * as GiiPages from "./Pages/Gii";
import {PersistGate} from "redux-persist/integration/react";
import {ContainerEntryPage} from "./Pages/Inspector/ContainerEntryPage";
import {TestsPage} from "./Pages/Inspector/TestsPage";
import {PsalmPage} from "./Pages/Inspector/PsalmPage";
import {RoutesPage} from "./Pages/Inspector/RoutesPage";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout/>}>
                                <Route index element={<IndexPage/>}/>

                                <Route path="inspector">
                                    <Route path='parameters' element={<ParametersPage/>}/>
                                    <Route path='configuration' element={<ConfigurationPage/>}/>
                                    <Route path='tests' element={<TestsPage/>}/>
                                    <Route path='analyse' element={<PsalmPage/>}/>
                                    <Route path='routes' element={<RoutesPage/>}/>
                                    <Route path="container">
                                        <Route index element={<ContainerPage/>}/>
                                        <Route path='view' element={<ContainerEntryPage/>}/>
                                    </Route>
                                </Route>
                                <Route path="debug" element={<DebugPages.Layout/>}>
                                    <Route index element={<DebugPages.IndexPage/>}/>
                                    <Route path='logger' element={<DebugPages.LogPage/>}/>
                                </Route>
                                <Route path="gii" element={<GiiPages.Layout/>} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
