import {createApi} from '@reduxjs/toolkit/query/react'
import {createBaseQuery} from "./createBaseQuery";

export type GiiGenerator = {
    id: string;
    [name: string]: any
};
type SummaryResponseType = {
    generators: GiiGenerator[]
};

export const giiApi = createApi({
    reducerPath: 'api.gii',
    baseQuery: createBaseQuery('/gii/api'),
    endpoints: (builder) => ({
        getGenerators: builder.query<GiiGenerator[], void>({
            query: () => `/generator`,
            transformResponse: (result: SummaryResponseType) => (result.generators as GiiGenerator[]) || []
        }),
    }),
})

export const {useGetGeneratorsQuery, useLazyGetGeneratorsQuery} = giiApi
