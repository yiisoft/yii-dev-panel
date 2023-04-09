import {Button, Tooltip} from '@mui/material';
import React from 'react';
import {DebugEntry} from '@yii-dev-panel/sdk/API/Debug/Debug';

type RequestTimeItemProps = {
    data: DebugEntry;
};
export const RequestTimeItem = ({data}: RequestTimeItemProps) => {
    return (
        <Tooltip title={`${((data.web || data.console).request.processingTime * 1000).toFixed(1)} ms`} arrow>
            <Button
                color="info"
                variant="contained"
                sx={{
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    borderRadius: 0,
                }}
            >
                {(data.web || data.console).request.processingTime.toFixed(3)} s
            </Button>
        </Tooltip>
    );
};
