import React, {createContext, ReactNode, useContext, useReducer} from 'react';

type BreadcrumbsState = string[];
type BreadcrumbsAction = {type: 'SET_BREADCRUMB'; payload: string[]};

// todo: rewrite and make it consistent with others contexts
const breadcrumbsReducer = (state: BreadcrumbsState, action: BreadcrumbsAction): BreadcrumbsState => {
    switch (action.type) {
        case 'SET_BREADCRUMB':
            return action.payload;
        default:
            throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
};

type BreadcrumbsContextType = {
    breadcrumbs: BreadcrumbsState;
    setBreadcrumbs: React.Dispatch<BreadcrumbsAction>;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(undefined);

export const useBreadcrumbs = () => {
    const context = useContext(BreadcrumbsContext);
    if (!context) {
        throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider');
    }
    return context;
};

export const BreadcrumbsProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [breadcrumbs, setBreadcrumbs] = useReducer(breadcrumbsReducer, ['Home']);
    return <BreadcrumbsContext.Provider value={{breadcrumbs, setBreadcrumbs}}>{children}</BreadcrumbsContext.Provider>;
};
