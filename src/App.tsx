import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {IndexPage} from "./Pages/IndexPage";
import {Layout} from "./Pages/Layout";
import {ThemeProvider} from "@mui/material";
import {theme} from "./Theme/DefaultTheme";
import {Provider} from "react-redux";
import {store} from "./store";
import {ParametersPage} from "./Pages/Inspector/ParametersPage";
import {ConfigurationPage} from "./Pages/Inspector/ConfigurationPage";
import {ContainerPage} from "./Pages/Inspector/ContainerPage";
import {InfoPage} from "./Pages/Debug/InfoPage";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<IndexPage/>}/>

                            <Route path="/inspector">
                                <Route path='parameters' element={<ParametersPage/>}/>
                                <Route path='configuration' element={<ConfigurationPage/>}/>
                                <Route path='container' element={<ContainerPage/>}/>
                            </Route>
                            <Route path="/debug">
                                <Route path='info' element={<InfoPage/>}/>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>

    );
}

export default App;
