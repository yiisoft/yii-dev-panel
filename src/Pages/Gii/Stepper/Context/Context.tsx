import React, {createContext} from "react";
import {createAction, createReducer} from "@reduxjs/toolkit";

export type GiiFile = {
    content: string;
    id: string;
    operation: number;
    path: string;
    preview: string;
    relativePath: string;
    type: string;
}

interface State {
    files: GiiFile[],
    operations: any[],
    parameters: any[];
}

const initialState: State = {
    files: [],
    operations: [],
    parameters: [],
}
const setFiles = createAction<any>('setFiles')
const setOperations = createAction<any>('setOperations')
const setParameters = createAction<any>('setParameters')


export const Reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setFiles, (state, action) => {
            state.files = action.payload as any
        })
        .addCase(setOperations, (state, action) => {
            state.operations = action.payload as any
        })
        .addCase(setParameters, (state, action) => {
            state.parameters = action.payload as any
        })
})

export const Context = createContext(initialState);
export const ContextProvider = ({children}: any) => {
    const [state, dispatch] = React.useReducer(Reducer, initialState);

    const value = {
        parameters: state.parameters,
        setParameters: (parameters: any[]) => {
            dispatch(setParameters(parameters));
        },
        files: state.files,
        setFiles: (files: any[]) => {
            dispatch(setFiles(files));
        },
        operations: state.operations,
        setOperations: (operations: any[]) => {
            dispatch(setOperations(operations));
        },
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};
