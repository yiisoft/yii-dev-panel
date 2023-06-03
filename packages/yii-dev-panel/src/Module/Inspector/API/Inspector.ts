import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from '@yiisoft/yii-dev-panel-sdk/API/createBaseQuery';

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
    startLine?: number;
    endLine?: number;
} & InspectorFile;

export type ConfigurationType = Record<string, object | string>;
export type ClassesType = string[];
export type CommandType = {
    name: string;
    title: string;
    group: string;
    description: string;
};
export type CommandResponseType<T = any> = {
    status: 'ok' | 'error' | 'fail';
    result: T;
    errors: string[];
};
export type CacheResponseType = any;
export type PutTranslationArgumentType = {
    category: string;
    locale: string;
    translation: string;
    message: string;
};

type ComposerResponse = {
    json: {require: Record<string, string>; 'require-dev': Record<string, string>};
    lock: {
        packages: {name: string; version: string}[];
        'packages-dev': {name: string; version: string}[];
    };
};

type CurlBuilderResponse = {
    command: string;
};

type CheckRouteResponse = {
    result: boolean;
    action: string[];
};

export type EventListenerType = {
    event: [string, string] | string;
};

export type EventListenersType = Record<string, EventListenerType[]>;

export type EventsResponse = {
    common: EventListenersType;
    console: EventListenersType;
    web: EventListenersType;
};

type Response<T = any> = {
    data: T;
};

export const inspectorApi = createApi({
    reducerPath: 'api.inspector',
    keepUnusedDataFor: 0,
    tagTypes: ['inspector/composer'],
    baseQuery: createBaseQuery('/inspect/api/'),
    endpoints: (builder) => ({
        getParameters: builder.query<Response, void>({
            query: () => `params`,
            transformResponse: (result: Response) => result.data || [],
        }),
        getConfiguration: builder.query<ConfigurationType, string>({
            query: (group = 'di') => `config?group=${group}`,
            transformResponse: (result: Response<ConfigurationType>) => result.data,
        }),
        getClasses: builder.query<ClassesType, string>({
            query: () => `classes`,
            transformResponse: (result: Response<ClassesType>) => result.data || [],
        }),
        getObject: builder.query<ObjectType, string>({
            query: (classname) => `object?classname=${classname}`,
            transformResponse: (result: Response<ObjectType>) => result.data,
        }),
        getCommands: builder.query<CommandType[], void>({
            query: (command) => 'command',
            transformResponse: (result: Response<CommandType[]>) => result.data || [],
        }),
        runCommand: builder.mutation<CommandResponseType, string>({
            query: (command) => ({
                url: `command?command=${command}`,
                method: 'POST',
            }),
            transformResponse: (result: Response<CommandResponseType>) => result.data,
        }),
        getFiles: builder.query<InspectorFile[], string>({
            query: (command) => `files?path=${command}`,
            transformResponse: (result: Response<InspectorFile[]>) => result.data || [],
        }),
        getClass: builder.query<InspectorFile[], {className: string; methodName: string}>({
            query: ({className, methodName = ''}) => `files?class=${className}&method=${methodName}`,
            transformResponse: (result: Response<InspectorFile[]>) => result.data || [],
        }),
        getTranslations: builder.query<Response, void>({
            query: () => `translations`,
            transformResponse: (result: Response) => result.data || [],
        }),
        putTranslations: builder.mutation<Response, PutTranslationArgumentType>({
            query: (body) => ({
                method: 'PUT',
                url: `translations`,
                body: body,
            }),
            transformResponse: (result: Response) => result.data || [],
        }),
        getTable: builder.query<Response, string | void>({
            query: (table) => (table ? `table/${table}` : `table`),
            transformResponse: (result: Response) => result.data || [],
        }),
        doRequest: builder.mutation<Response, {id: string}>({
            query: (args) => ({
                method: 'PUT',
                url: `request?debugEntryId=${args.id}`,
            }),
            transformResponse: (result: Response) => result.data || [],
        }),
        postCurlBuild: builder.mutation<CurlBuilderResponse, string>({
            query: (debugEntryId) => ({
                method: 'POST',
                url: `curl/build?debugEntryId=${debugEntryId}`,
            }),
            transformResponse: (result: Response<CurlBuilderResponse>) => result.data,
        }),
        getRoutes: builder.query<Response, void>({
            query: () => `routes`,
            transformResponse: (result: Response) => result.data || [],
        }),
        getCheckRoute: builder.query<CheckRouteResponse, string>({
            query: (route) => `route/check?route=${route}`,
            transformResponse: (result: Response<CheckRouteResponse>) => result.data,
        }),
        getEvents: builder.query<EventsResponse, void>({
            query: () => `events`,
            transformResponse: (result: Response<EventsResponse>) => result.data,
        }),
        getPhpInfo: builder.query<string, void>({
            query: () => `phpinfo`,
            transformResponse: (result: Response) => result.data || [],
        }),
        getComposer: builder.query<ComposerResponse, void>({
            query: () => `composer`,
            transformResponse: (result: Response<ComposerResponse>) => result.data,
            providesTags: ['inspector/composer'],
        }),
        getComposerInspect: builder.query<CommandResponseType, string>({
            query: (packageName) => `composer/inspect?package=${packageName}`,
            transformResponse: (result: Response<CommandResponseType>) => result.data,
            providesTags: ['inspector/composer'],
        }),
        getCache: builder.query<CacheResponseType, string>({
            query: (key) => `cache?key=${key}`,
            transformResponse: (result: Response<CacheResponseType>) => result.data,
        }),
        deleteCache: builder.mutation<CacheResponseType, string>({
            query: (key) => ({
                url: `cache?key=${key}`,
                method: 'DELETE',
            }),
            transformResponse: (result: Response<CacheResponseType>) => result.data,
        }),
        clearCache: builder.mutation<CacheResponseType, void>({
            query: () => ({
                url: `cache/clear`,
                method: 'POST',
            }),
            transformResponse: (result: Response<CacheResponseType>) => result.data,
        }),
        postComposerRequirePackage: builder.mutation<
            CommandResponseType,
            {packageName: string; version: string | null; isDev: boolean}
        >({
            query: ({packageName, version, isDev}) => ({
                url: `composer/require`,
                method: 'POST',
                body: {
                    package: packageName,
                    version,
                    isDev,
                },
            }),
            transformResponse: (result: Response<CommandResponseType>) => result.data,
            invalidatesTags: ['inspector/composer'],
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
    useLazyGetClassQuery,
    useLazyGetCommandsQuery,
    useRunCommandMutation,
    useGetTranslationsQuery,
    usePutTranslationsMutation,
    useDoRequestMutation,
    useGetRoutesQuery,
    useLazyGetCheckRouteQuery,
    useGetTableQuery,
    useGetPhpInfoQuery,
    useGetComposerQuery,
    useGetCacheQuery,
    useDeleteCacheMutation,
    useLazyGetCacheQuery,
    useClearCacheMutation,
    useLazyGetComposerInspectQuery,
    useGetComposerInspectQuery,
    usePostComposerRequirePackageMutation,
    usePostCurlBuildMutation,
    useGetEventsQuery,
} = inspectorApi;
