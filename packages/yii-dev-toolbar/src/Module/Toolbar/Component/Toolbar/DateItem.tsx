import {Badge, Button} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {format, fromUnixTime} from 'date-fns';
import {ForwardedRef, forwardRef} from 'react';
import {CollectorsMap} from "@yiisoft/yii-dev-panel-sdk/Helper/collectors";
import {isDebugEntryAboutWeb} from "@yiisoft/yii-dev-panel-sdk/Helper/debugEntry";

type DateItemProps = {
    data: DebugEntry;
};

const DateItem = forwardRef((props: DateItemProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {data, ...others} = props;
    const summary = data.summary;
    const collector = isDebugEntryAboutWeb(data) ? CollectorsMap.WebAppInfoCollector : CollectorsMap.ConsoleAppInfoCollector;

    return (
        <Badge color="secondary" badgeContent={String(summary[CollectorsMap.EventCollector]?.total)}>
            <Button
                ref={ref}
                color="info"
                variant="contained"
                sx={{
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    borderRadius: 0,
                }}
            >
                {format(fromUnixTime(summary[collector]?.request.startTime), 'do MMM HH:mm:ss')}
            </Button>
        </Badge>
    );
});
DateItem.displayName = Button.name;
export {DateItem};
