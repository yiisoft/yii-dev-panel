import * as React from 'react';
import {useGetObjectQuery,} from "../../API/Inspector/Inspector";
import {useSearchParams} from "react-router-dom";

export const ContainerEntryPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {data, isLoading} = useGetObjectQuery(searchParams.get('class') || '');

    if (isLoading) {
        return <>Loading..</>
    }
    console.log(data)
    return (
        <pre>
            {data!.data.toString()}
        </pre>
    );
}
