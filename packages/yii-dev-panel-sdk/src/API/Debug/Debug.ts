import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from '@yiisoft/yii-dev-panel-sdk/API/createBaseQuery';
import {CollectorsMap} from "@yiisoft/yii-dev-panel-sdk/Helper/collectors";

type Response<T = any> = {
    data: T;
};

export type HTTPMethod = 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT';

export type DebugEntry = {
    id: string;
    collectors: string[];
    summary: {
        [key in CollectorsMap]: {
            total: number;
            valid: number;
            invalid: number;
            countPushes: number;
            countStatuses: number;
            countProcessingMessages: number;
            count: number;
            totalTime: number;
            read?: number;
            write?: number;
            mkdir?: number;
            php: {
                version: string;
            };
            request: {
                startTime: number;
                processingTime: number;
                url: string;
                path: string;
                query: string;
                method: HTTPMethod;
                isAjax: boolean;
                userIp: string;
            };
            memory: {
                peakUsage: number;
            };
            exitCode: number;
            class: string;
            input: string;
            name: string;
            response: {
                statusCode: number;
            };
            matchTime: number;
            pattern: string;
            arguments: string;
            host: string;
            uri: string;
            action: string | string[];
            middlewares: any[];
            bundles: {
                total: number;
            };
            message: string;
            line: string;
            file: string;
            code: string;
            queries: {
                error: number;
                total: number;
            };
            transactions: {
                error: number;
                total: number;
            };
            streams: [];
            [key: string]: any
        };
    }
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

type GetObjectResponse = {
    class: string;
    value: any;
} | null;

type CollectorResponseType = any;

export const debugApi = createApi({
    reducerPath: 'api.debug',
    tagTypes: ['debug/list'],
    baseQuery: createBaseQuery('/debug/api/'),
    endpoints: (builder) => ({
        getDebug: builder.query<DebugEntry[], void>({
            query: () => ``,
            transformResponse: (result: SummaryResponseType) => (result.data as DebugEntry[]) || [],
            providesTags: ['debug/list'],
        }),
        getObject: builder.query<GetObjectResponse, GetObjectProps>({
            query: (args) => `object/${args.debugEntryId}/${args.objectId}`,
            transformResponse: (result: Response<GetObjectResponse>) => result.data,
        }),
        getCollectorInfo: builder.query<CollectorResponseType, GetCollectorInfoProps>({
            query: (args) => `view/${args.id}?collector=${args.collector}`,
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
