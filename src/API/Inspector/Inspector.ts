import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface Pokemon {
    [name: string]: string | object | []
}
// Define a service using a base URL and expected endpoints
export const inspectorApi = createApi({
    reducerPath: 'inspector',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8080/inspect/api/' }),
    endpoints: (builder) => ({
        getParameters: builder.query<Pokemon, string>({
            query: () => `params`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetParametersQuery } = inspectorApi
