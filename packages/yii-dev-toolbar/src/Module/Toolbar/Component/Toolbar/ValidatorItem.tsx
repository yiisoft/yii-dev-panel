import {Badge, Button} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {CollectorsMap} from '@yiisoft/yii-dev-panel-sdk/Helper/collectors';

type ValidatorItemProps = {
    data: DebugEntry;
    iframeUrlHandler: (url: string) => void;
};

export const ValidatorItem = (props: ValidatorItemProps) => {
    const {data, iframeUrlHandler, ...others} = props;
    const summary = data.summary;
    if (!summary[CollectorsMap.ValidatorCollector] || summary[CollectorsMap.ValidatorCollector].total === 0) {
        return null;
    }

    return (
        <Badge color="secondary" badgeContent={String(summary[CollectorsMap.ValidatorCollector].total)}>
            <Button
                href={`/debug?collector=${CollectorsMap.ValidatorCollector}&debugEntry=${data.id}`}
                onClick={(e) => {
                    iframeUrlHandler(`/debug?collector=${CollectorsMap.ValidatorCollector}&debugEntry=${data.id}`);
                    e.stopPropagation();
                    e.preventDefault();
                }}
                color={summary[CollectorsMap.ValidatorCollector]?.invalid === 0 ? 'info' : 'warning'}
                variant="contained"
                sx={{
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    borderRadius: 0,
                }}
            >
                Validator
            </Button>
        </Badge>
    );
};
