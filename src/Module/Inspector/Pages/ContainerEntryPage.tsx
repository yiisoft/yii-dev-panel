import * as React from 'react';
import {useGetObjectQuery} from '../API/Inspector';
import {useSearchParams} from 'react-router-dom';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {IconButton, Tooltip} from '@mui/material';
import {FilePresent} from '@mui/icons-material';
import {FullScreenCircularProgress} from '../../../Component/FullScreenCircularProgress';

export const ContainerEntryPage = () => {
    const [searchParams] = useSearchParams();
    const objectClass = searchParams.get('class') || '';
    const {data, isLoading} = useGetObjectQuery(objectClass);

    if (isLoading) {
        return <FullScreenCircularProgress />;
    }

    return (
        <pre>
            <h2>
                {objectClass}{' '}
                <Tooltip title="Examine as a file">
                    <IconButton size="small" href={'/inspector/files?path=' + data?.path}>
                        <FilePresent fontSize="small" />
                    </IconButton>
                </Tooltip>
            </h2>
            <JsonRenderer value={data?.object} />
        </pre>
    );
};
