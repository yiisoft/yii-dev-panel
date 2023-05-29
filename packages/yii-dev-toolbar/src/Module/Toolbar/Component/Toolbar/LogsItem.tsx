import {ChatBubble} from '@mui/icons-material';
import {Badge, Button} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {CollectorsMap} from '@yiisoft/yii-dev-panel-sdk/Helper/collectors';
import {forwardRef} from 'react';

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
