import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from '../../../API/createBaseQuery';

type Response<T = any> = {
    data: T;
};
type Remote = {
    name: string;
    url: string;
    branches: string[];
};
type Commit = {
    message: string;
    ref: string;
    author: {name: string; email: string};
};
type SummaryResponse = {
    currentBranch: string;
    branches: string[];
    lastCommit: Commit;
    remotes: Remote[];
    status: string[];
};

export const gitApi = createApi({
    reducerPath: 'api.inspector.git',
    keepUnusedDataFor: 0,
    tagTypes: ['git/summary'],
    baseQuery: createBaseQuery('/inspect/api/git/'),
    endpoints: (builder) => ({
        getSummary: builder.query<SummaryResponse, void>({
            query: () => `summary`,
            providesTags: ['git/summary'],
            transformResponse: (result: Response<SummaryResponse>) => result.data || [],
        }),
        checkout: builder.mutation<void, {branch: string}>({
            query: ({branch}) => ({
                url: `checkout`,
                method: 'POST',
                body: {
                    branch,
                },
            }),
            invalidatesTags: [{type: 'git/summary'}],
        }),
        command: builder.mutation<void, {command: string}>({
            query: ({command}) => ({
                url: `command?command=${command}`,
                method: 'POST',
            }),
            invalidatesTags: [{type: 'git/summary'}],
        }),
    }),
});

export const {useGetSummaryQuery, useCommandMutation, useCheckoutMutation} = gitApi;
