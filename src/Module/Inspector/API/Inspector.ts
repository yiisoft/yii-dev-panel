import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from '../../../API/createBaseQuery';

type ObjectType = {
    object: object;
    path: string;
};
type Response<T = any> = {
    data: T;
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
        getObject: builder.query<ObjectType, string>({
            query: (classname) => `object?classname=${classname}`,
            transformResponse: (result: Response<ObjectType>) => result.data || [],
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
    useLazyGetConfigurationQuery,
    useGetObjectQuery,
    useGetClassesQuery,
    useLazyGetObjectQuery,
    useGetCommandQuery,
    useLazyGetCommandQuery,
} = inspectorApi;
