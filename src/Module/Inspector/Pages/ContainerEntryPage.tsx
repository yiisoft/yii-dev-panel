import * as React from 'react';
import {useGetObjectQuery} from '../API/Inspector';
import {useSearchParams} from 'react-router-dom';
import {JsonRenderer} from '../../../Component/JsonRenderer';

export const ContainerEntryPage = () => {
    const [searchParams] = useSearchParams();
    const objectClass = searchParams.get('class') || '';
    const {data, isLoading} = useGetObjectQuery(objectClass);

    if (isLoading) {
        return <>Loading..</>;
    }

    return (
        <pre>
            <h2>{objectClass}</h2>
            <JsonRenderer value={data} />
        </pre>
    );
};
