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
    baseQuery: createBaseQuery('/inspect/api/git/'),
    endpoints: (builder) => ({
        getSummary: builder.query<SummaryResponse, void>({
            query: () => `summary`,
            transformResponse: (result: Response<SummaryResponse>) => result.data || [],
        }),
    }),
});

export const {useGetSummaryQuery} = gitApi;
