import {Button} from '@mui/material';
import React from 'react';
import {DebugEntry} from '../../API/Debug';

type RequestTimeItemProps = {
    data: DebugEntry;
};
export const RequestTimeItem = ({data}: RequestTimeItemProps) => {
    return (
        <Button color="info" variant="contained" sx={{textTransform: 'none', borderRadius: 0}}>
            {data.web.request.processingTime.toFixed(3)} s
        </Button>
    );
};
