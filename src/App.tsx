import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {IndexPage} from "./Pages/IndexPage";
import {Layout} from "./Pages/Layout";
import {ThemeProvider} from "@mui/material";
import {theme} from "./Theme/DefaultTheme";
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {ParametersPage} from "./Module/Inspector/Pages/ParametersPage";
import {ConfigurationPage} from "./Module/Inspector/Pages/ConfigurationPage";
import {ContainerPage} from "./Module/Inspector/Pages/ContainerPage";
import * as DebugPages from "./Module/Debug/Pages";
import * as GiiPages from "./Module/Gii/Pages";
import {PersistGate} from "redux-persist/integration/react";
import {ContainerEntryPage} from "./Module/Inspector/Pages/ContainerEntryPage";
import {TestsPage} from "./Module/Inspector/Pages/TestsPage";
import {PsalmPage} from "./Module/Inspector/Pages/PsalmPage";
import {RoutesPage} from "./Module/Inspector/Pages/RoutesPage";

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
