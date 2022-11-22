import * as React from 'react';
import {useGetObjectQuery} from '../API/Inspector';
import {useSearchParams} from 'react-router-dom';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {IconButton, Tooltip} from '@mui/material';
import {OpenInNew} from '@mui/icons-material';

export const ContainerEntryPage = () => {
    const [searchParams] = useSearchParams();
    const objectClass = searchParams.get('class') || '';
    const {data, isLoading} = useGetObjectQuery(objectClass);

    if (isLoading) {
        return <>Loading..</>;
    }

    return (
        <pre>
            <h2>
                {objectClass}{' '}
                <Tooltip title="Examine as a file">
                    <IconButton size="small" target="_blank" href={'/inspector/container/files?path=' + data?.path}>
                        <OpenInNew fontSize="small" />
                    </IconButton>
                </Tooltip>
            </h2>
            <JsonRenderer value={data?.object} />
        </pre>
    );
};
