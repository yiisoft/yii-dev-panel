import {createApi} from '@reduxjs/toolkit/query/react'
import {createBaseQuery} from "./createBaseQuery";

export type GiiGeneratorAttributeRule = {
    0: string;
    [name: string]: any
}
export type GiiGeneratorAttribute = {
    defaultValue: string | number | null | string[];
    hint: string | null;
    label: string | null;
    rules: GiiGeneratorAttributeRule[];
}
export type GiiGenerator = {
    id: string;
    description: string;
    name: string;
    attributes: Record<string, GiiGeneratorAttribute>;
    [name: string]: any;
};
type SummaryResponseType = {
    generators: GiiGenerator[]
};
type PreviewResponseType = {
    files: any[];
    operations: any[];
    errors: {[name: string]: any;} | undefined
};

type GiiPreviewType = {
    generator: string;
    body: any;
};
export const giiApi = createApi({
    reducerPath: 'api.gii',
    baseQuery: createBaseQuery('/gii/api'),
    endpoints: (builder) => ({
        getGenerators: builder.query<GiiGenerator[], void>({
            query: () => `/generator`,
            transformResponse: (result: SummaryResponseType) => (result.generators as GiiGenerator[]) || []
        }),
        postPreview: builder.mutation<PreviewResponseType, GiiPreviewType>({
            query: ({ generator, body }) => ({
                url: `/generator/${generator}/preview`,
                method: 'POST',
                body: {parameters: body},
            }),
        }),
        postGenerate: builder.mutation<PreviewResponseType, GiiPreviewType>({
            query: ({ generator, body }) => ({
                url: `/generator/${generator}/generate`,
                method: 'POST',
                body: {parameters: body},
            }),
        }),
    }),
})

export const {
    useGetGeneratorsQuery,
    useLazyGetGeneratorsQuery,
    usePostPreviewMutation,
    usePostGenerateMutation,
} = giiApi
