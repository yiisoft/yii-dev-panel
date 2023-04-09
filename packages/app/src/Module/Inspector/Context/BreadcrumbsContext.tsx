import React, { createContext, PropsWithChildren, useMemo } from "react";
import { createAction, createReducer } from "@reduxjs/toolkit";

const setItems = createAction<Breadcrumb[]>('setItems');

type Breadcrumb = {
    title: string;
    href: any;
};
type State = {
    items: Breadcrumb[];
    setItems: any;
};

const initialState: State = {
    items: [],
    setItems: setItems,
};
export const Reducer = createReducer(initialState, (builder) => {
    builder.addCase(setItems, (state, {payload}) => {
        state.items = payload;
    });
});

export const BreadcrumbsContext = createContext(initialState);
export const BreadcrumbsContextProvider = ({children}: PropsWithChildren) => {
    const [state, dispatch] = React.useReducer(Reducer, initialState);

    const value = useMemo(
        () => ({
            items: state.items,
            setItems: (items: Breadcrumb[]) => {
                dispatch(setItems(items));
            },
        }),
        [state.items],
    );

    return <BreadcrumbsContext.Provider value={value}>{children}</BreadcrumbsContext.Provider>;
};
