import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface Pokemon {
    [name: string]: string | object | any
}

export const debugApi = createApi({
    reducerPath: 'api.debug',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL+ '/debug/api/'}),
    endpoints: (builder) => ({
        getDebug: builder.query<Pokemon, string>({
            query: () => ``,
        }),
    }),
})

export const {useGetDebugQuery} = debugApi
