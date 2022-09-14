import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export type DebugEntry = {
    id: string;
    collectors: string[];
    [name: string]: any
};
type SummaryResponseType = {
    data: DebugEntry[]
};

interface GetCollectorInfoProps {
    id: string;
    collector: string;
}

type CollectorResponseType = any;

export const debugApi = createApi({
    reducerPath: 'api.debug',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL + '/debug/api/'}),
    endpoints: (builder) => ({
        getDebug: builder.query<DebugEntry[], void>({
            query: () => ``,
            transformResponse: (result: SummaryResponseType)=> (result.data as DebugEntry[]) || []
        }),
        getCollectorInfo: builder.query<CollectorResponseType, GetCollectorInfoProps>({
            query: (args) => `view/${args.id}/${args.collector}`,
        }),
    }),
})

export const {useGetDebugQuery, useGetCollectorInfoQuery} = debugApi
