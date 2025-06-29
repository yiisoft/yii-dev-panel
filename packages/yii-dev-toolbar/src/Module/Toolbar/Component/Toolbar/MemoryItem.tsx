import {Button, Tooltip} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {formatBytes} from '@yiisoft/yii-dev-panel-sdk/Helper/formatBytes';
import {CollectorsMap} from '@yiisoft/yii-dev-panel-sdk/Helper/collectors';
import {isDebugEntryAboutWeb} from '@yiisoft/yii-dev-panel-sdk/Helper/debugEntry';

type MemoryItemProps = {
    data: DebugEntry;
    iframeUrlHandler: (url: string) => void;
};

export const MemoryItem = (props: MemoryItemProps) => {
    const {data, iframeUrlHandler, ...others} = props;
    const summary = data.summary;
    const collector = isDebugEntryAboutWeb(data)
        ? CollectorsMap.WebAppInfoCollector
        : CollectorsMap.ConsoleAppInfoCollector;

    return (
        <Tooltip title={`${summary[collector]?.memory.peakUsage.toLocaleString(undefined)} bytes`} arrow>
            <Button
                href={`/debug?collector=${collector}&debugEntry=${data.id}`}
                onClick={(e) => {
                    iframeUrlHandler(`/debug?collector=${collector}&debugEntry=${data.id}`);
                    e.stopPropagation();
                    e.preventDefault();
                }}
                color="info"
                variant="contained"
                sx={{
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    borderRadius: 0,
                }}
            >
                {formatBytes(summary[collector]?.memory.peakUsage)}
            </Button>
        </Tooltip>
    );
};
