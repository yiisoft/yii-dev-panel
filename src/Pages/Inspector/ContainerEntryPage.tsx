import * as React from 'react';
import {useGetObjectQuery,} from "../../API/Inspector/Inspector";
import {useSearchParams} from "react-router-dom";
import {JsonRenderer} from "../../Helper/JsonRenderer";

export const ContainerEntryPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {data, isLoading} = useGetObjectQuery(searchParams.get('class') || '');

    if (isLoading) {
        return <>Loading..</>
    }

    return (
        <pre>
            <JsonRenderer value={data!.data}/>
        </pre>
    );
}
