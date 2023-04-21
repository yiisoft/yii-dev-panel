import * as React from 'react';
import {JsonRenderer as OriginalJsonRenderer} from '@yiisoft/yii-dev-panel-sdk/Component/JsonRenderer';
import {useSearchParams} from 'react-router-dom';
import {useGetObjectQuery} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';

export const ObjectPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const objectId = searchParams.get('id');
    const debugEntryId = searchParams.get('debugEntry') || '';

    const {data} = useGetObjectQuery({
        debugEntryId: debugEntryId,
        objectId: +(objectId || 0),
    });

    return (
        <Box>
            <Typography variant="h6" my={1}>
                Object #{objectId}
            </Typography>
            <OriginalJsonRenderer value={data} />
        </Box>
    );
};
