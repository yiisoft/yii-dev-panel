import {Button} from '@mui/material';
import React from 'react';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {Route} from '@mui/icons-material';

type RouterItemProps = {
    data: DebugEntry;
};

export const RouterItem = ({data}: RouterItemProps) => {
    if (!data.router) {
        return null;
    }
    return (
        <Button
            startIcon={<Route fontSize="small" />}
            color="info"
            variant="contained"
            sx={{
                whiteSpace: 'nowrap',
                height: '100%',
                textTransform: 'none',
                borderRadius: 0,
            }}
        >
            {data.router.name}
        </Button>
    );
};
