import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface Pokemon {
    [name: string]: string | object | []
}

export const inspectorApi = createApi({
    reducerPath: 'api.inspector',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL + '/inspect/api/'}),
    endpoints: (builder) => ({
        getParameters: builder.query<Pokemon, string>({
            query: () => `params`,
        }),
        getConfiguration: builder.query<Pokemon, string>({
            query: () => `config`,
        }),
        getClasses: builder.query<Pokemon, string>({
            query: () => `classes`,
        }),
        getObject: builder.query<Pokemon, string>({
            query: (classname) => `object?classname=${classname}`,
        }),
    }),
})

export const {useGetParametersQuery, useGetConfigurationQuery, useGetClassesQuery, useLazyGetObjectQuery} = inspectorApi
