import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface Response {
    data: any
}

export const inspectorApi = createApi({
    reducerPath: 'api.inspector',
    keepUnusedDataFor: 0,
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL + '/inspect/api/'}),
    endpoints: (builder) => ({
        getParameters: builder.query<Response, string>({
            query: () => `params`,
            transformResponse: (result: Response)=> (result.data) || []
        }),
        getConfiguration: builder.query<Response, string>({
            query: () => `config`,
            transformResponse: (result: Response)=> (result.data) || []
        }),
        getClasses: builder.query<Response, string>({
            query: () => `classes`,
            transformResponse: (result: Response)=> (result.data) || []
        }),
        getObject: builder.query<Response, string>({
            query: (classname) => `object?classname=${classname}`,
            transformResponse: (result: Response)=> (result.data) || []
        }),
        getCommand: builder.query<Response, string>({
            query: (command) => `command?command=${command}`,
            // query: (command) => `command`,
            transformResponse: (result: Response)=> (result.data) || []
        }),
    }),
})

export const {
    useGetParametersQuery,
    useGetConfigurationQuery,
    useGetObjectQuery,
    useGetClassesQuery,
    useLazyGetObjectQuery,
    useGetCommandQuery,
    useLazyGetCommandQuery,
} = inspectorApi
