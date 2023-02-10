import {Button} from '@mui/material';
import React from 'react';
import {DebugEntry} from '../../API/Debug';
import {formatBytes} from '../../../Inspector/Component/TreeView/helper';

type MemoryItemProps = {
    data: DebugEntry;
};

export const MemoryItem = ({data}: MemoryItemProps) => {
    return (
        <Button color="info" variant="contained" sx={{textTransform: 'none', borderRadius: 0}}>
            {formatBytes(data.web.memory.peakUsage)}
        </Button>
    );
};
