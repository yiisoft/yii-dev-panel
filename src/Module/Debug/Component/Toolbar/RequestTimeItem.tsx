import {Button, Tooltip} from '@mui/material';
import React from 'react';
import {DebugEntry} from '../../API/Debug';

type RequestTimeItemProps = {
    data: DebugEntry;
};
export const RequestTimeItem = ({data}: RequestTimeItemProps) => {
    return (
        <Tooltip title={`${(data.web.request.processingTime * 1000).toFixed(1)} ms`} arrow>
            <Button color="info" variant="contained" sx={{textTransform: 'none', borderRadius: 0}}>
                {data.web.request.processingTime.toFixed(3)} s
            </Button>
        </Tooltip>
    );
};
