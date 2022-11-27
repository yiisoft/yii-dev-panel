import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from '../../../API/createBaseQuery';

type ObjectType = {
    object: object;
    path: string;
};
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

export type ConfigurationType = Record<string, object | string>;
export type ClassesType = string[];
export type CommandType = {
    name: string;
    title: string;
    group: string;
    description: string;
};
export type CommandResponseType = {
    status: string;
    result: any;
    errors: string[];
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
        getConfiguration: builder.query<ConfigurationType, string>({
            query: (group = 'web') => `config?group=${group}`,
            transformResponse: (result: Response<ConfigurationType>) => result.data || [],
        }),
        getClasses: builder.query<ClassesType, string>({
            query: () => `classes`,
            transformResponse: (result: Response<ClassesType>) => result.data || [],
        }),
        getObject: builder.query<ObjectType, string>({
            query: (classname) => `object?classname=${classname}`,
            transformResponse: (result: Response<ObjectType>) => result.data || [],
        }),
        getCommands: builder.query<CommandType[], void>({
            query: (command) => 'command',
            transformResponse: (result: Response<CommandType[]>) => result.data || [],
        }),
        runCommand: builder.query<CommandResponseType, string>({
            query: (command) => ({
                url: `command?command=${command}`,
                method: 'POST',
            }),
            transformResponse: (result: Response<CommandResponseType>) => result.data || [],
            // it's needed to be able to make multiple queries at the time and save theirs states
            // TODO: save states without that hack
            keepUnusedDataFor: 300,
        }),
        getFiles: builder.query<InspectorFile[], string>({
            query: (command) => `files?path=${command}`,
            transformResponse: (result: Response<InspectorFile[]>) => result.data || [],
        }),
        getTranslations: builder.query<Response, void>({
            query: () => `translations`,
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
    useLazyGetFilesQuery,
    useLazyGetCommandsQuery,
    useLazyRunCommandQuery,
    useGetTranslationsQuery,
} = inspectorApi;
