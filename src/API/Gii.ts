import {createApi} from '@reduxjs/toolkit/query/react'
import {createBaseQuery} from "./createBaseQuery";

export type GiiGeneratorAttributeRule = {
    0: string;
    [name: string]: any
}
export type GiiGeneratorAttribute = {
    defaultValue: string|number|null|string[];
    hint: string|null;
    label: string|null;
    rules: GiiGeneratorAttributeRule[];
}
export type GiiGenerator = {
    id: string;
    description: string;
    name: string;
    attributes: Record<string, GiiGeneratorAttribute>;
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
