import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from '../../../API/createBaseQuery';

export type DebugEntry = {
    id: string;
    collectors: string[];
    [name: string]: any;
};
type SummaryResponseType = {
    data: DebugEntry[];
};

type GetCollectorInfoProps = {
    id: string;
    collector: string;
};

type GetObjectProps = {
    debugEntryId: string;
    objectId: number;
};

type CollectorResponseType = any;

export const debugApi = createApi({
    reducerPath: 'api.debug',
    baseQuery: createBaseQuery('/debug/api/'),
    endpoints: (builder) => ({
        getDebug: builder.query<DebugEntry[], void>({
            query: () => ``,
            transformResponse: (result: SummaryResponseType) => (result.data as DebugEntry[]) || [],
        }),
        getObject: builder.query<DebugEntry[], GetObjectProps>({
            query: (args) => `object/${args.debugEntryId}/${args.objectId}`,
            transformResponse: (result: SummaryResponseType) => (result.data as DebugEntry[]) || [],
        }),
        getCollectorInfo: builder.query<CollectorResponseType, GetCollectorInfoProps>({
            query: (args) => `view/${args.id}/?collector=${args.collector}`,
            transformResponse: (result: SummaryResponseType) => (result.data as CollectorResponseType[]) || [],
            transformErrorResponse: (result) => result.data,
        }),
    }),
});

export const {
    useGetDebugQuery,
    useLazyGetDebugQuery,
    useGetObjectQuery,
    useLazyGetObjectQuery,
    useLazyGetCollectorInfoQuery,
} = debugApi;
