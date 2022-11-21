import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from '../../../API/createBaseQuery';

export type InspectorFile = {
    path: string;
    baseName: string;
    extension: string;
    user: {uid: number; gid?: number; name?: string};
    group: {gid: number; name?: string};
    size: number;
    type: string;
    permissions: string;
};
export type InspectorFileContent = {
    directory: string;
    content: string;
} & InspectorFile;
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
        getObject: builder.query<Response, string>({
            query: (classname) => `object?classname=${classname}`,
            transformResponse: (result: Response) => result.data || [],
        }),
        getCommand: builder.query<Response, string>({
            query: (command) => `command?command=${command}`,
            transformResponse: (result: Response) => result.data || [],
        }),
        getFiles: builder.query<InspectorFile[], string>({
            query: (command) => `files?path=${command}`,
            transformResponse: (result: Response<InspectorFile[]>) => result.data || [],
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
    useGetFilesQuery,
    useLazyGetFilesQuery,
    useLazyGetCommandQuery,
} = inspectorApi;
