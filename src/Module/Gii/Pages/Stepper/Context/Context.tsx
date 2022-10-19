import React, {createContext} from "react";
import {createAction, createReducer} from "@reduxjs/toolkit";

export enum FileOperationEnum {
    SAVE = 'save',
    SKIP = 'skip',
}

export enum FileStateEnum {
    PRESENT_SAME = 'present_same',
    PRESENT_DIFFERENT = 'present_different',
    NOT_EXIST = 'not_exist',
}

export type GiiFile = {
    content: string;
    id: string;
    operation: FileOperationEnum;
    path: string;
    preview: string;
    relativePath: string;
    state: FileStateEnum;
    type: string;
}

export type GiiResult = {
    id: string;
    status: string;
    error: string;
}

interface State {
    files: GiiFile[];
    operations: any[],
    parameters: any[];
    results: GiiResult[];
}

const initialState: State = {
    files: [],
    operations: [],
    parameters: [],
    results: [],
}
const setFiles = createAction<any>('setFiles')
const setOperations = createAction<any>('setOperations')
const setParameters = createAction<any>('setParameters')
const setResults = createAction<any>('setResults')


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
        .addCase(setResults, (state, action) => {
            state.results = action.payload as any
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
        results: state.results,
        setResults: (results: any[]) => {
            dispatch(setResults(results));
        },
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};
