import {Badge, Button} from '@mui/material';
import React, {forwardRef} from 'react';
import {DebugEntry} from '../../API/Debug';
import {ChatBubble} from '@mui/icons-material';
import {CollectorsMap} from '../../Helper/collectors';

type LogsItemProps = {
    data: DebugEntry;
};

export const LogsItem = forwardRef<HTMLButtonElement, LogsItemProps>((props, ref) => {
    const {data, ...others} = props;

    return (
        <Badge color="secondary" badgeContent={String(data.logger.total)}>
            <Button
                ref={ref}
                href={`/debug?collector=${CollectorsMap.LogCollector}&debugEntry=${data.id}`}
                startIcon={<ChatBubble fontSize="small" />}
                color="info"
                variant="contained"
                sx={{
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    borderRadius: 0,
                }}
            >
                Logs
            </Button>
        </Badge>
    );
});
