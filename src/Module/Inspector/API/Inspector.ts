import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from '../../../API/createBaseQuery';

type Response = {
    data: any;
};

export const inspectorApi = createApi({
    reducerPath: 'api.inspector',
    keepUnusedDataFor: 0,
    baseQuery: createBaseQuery('/inspect/api/'),
    endpoints: (builder) => ({
        getParameters: builder.query<Response, void>({
            query: () => `params`,
            transformResponse: (result: Response) => result.data || [],
        }),
        getConfiguration: builder.query<Response, string>({
            query: (group = 'web') => `config?group=${group}`,
            transformResponse: (result: Response) => result.data || [],
        }),
        getClasses: builder.query<Response, string>({
            query: () => `classes`,
            transformResponse: (result: Response) => result.data || [],
        }),
        getObject: builder.query<Response, string>({
            query: (classname) => `object?classname=${classname}`,
            transformResponse: (result: Response) => result.data || [],
        }),
        getCommand: builder.query<Response, string>({
            query: (command) => `command?command=${command}`,
            transformResponse: (result: Response) => result.data || [],
        }),
    }),
});

export const {
    useGetParametersQuery,
    useLazyGetParametersQuery,
    useGetConfigurationQuery,
    useGetObjectQuery,
    useGetClassesQuery,
    useLazyGetObjectQuery,
    useGetCommandQuery,
    useLazyGetCommandQuery,
} = inspectorApi;
