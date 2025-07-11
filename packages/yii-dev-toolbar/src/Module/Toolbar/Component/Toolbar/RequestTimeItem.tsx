import {Button, Tooltip} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {CollectorsMap} from '@yiisoft/yii-dev-panel-sdk/Helper/collectors';
import {isDebugEntryAboutWeb} from '@yiisoft/yii-dev-panel-sdk/Helper/debugEntry';

type RequestTimeItemProps = {
    data: DebugEntry;
    iframeUrlHandler: (url: string) => void;
};
export const RequestTimeItem = (props: RequestTimeItemProps) => {
    const {data, iframeUrlHandler, ...others} = props;
    const summary = data.summary;
    const collector = isDebugEntryAboutWeb(data)
        ? CollectorsMap.WebAppInfoCollector
        : CollectorsMap.ConsoleAppInfoCollector;

    return (
        <Tooltip title={`${(summary[collector]?.request.processingTime * 1000).toFixed(1)} ms`} arrow>
            <Button
                href={`/debug?collector=${CollectorsMap.TimelineCollector}&debugEntry=${data.id}`}
                onClick={(e) => {
                    iframeUrlHandler(`/debug?collector=${CollectorsMap.TimelineCollector}&debugEntry=${data.id}`);
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
                {summary[collector]?.request.processingTime.toFixed(3)} s
            </Button>
        </Tooltip>
    );
};
