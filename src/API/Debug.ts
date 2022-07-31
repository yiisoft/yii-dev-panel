import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface Pokemon {
    [name: string]: string | object | any
}

// Define a service using a base URL and expected endpoints
export const debugApi = createApi({
    reducerPath: 'api.debug',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8080/debug/api/'}),
    endpoints: (builder) => ({
        getDebug: builder.query<Pokemon, string>({
            query: () => ``,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetDebugQuery} = debugApi
