import {Route} from '@mui/icons-material';
import {Button} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {CollectorsMap} from "@yiisoft/yii-dev-panel-sdk/Helper/collectors";

type RouterItemProps = {
    data: DebugEntry;
};

export const RouterItem = ({data}: RouterItemProps) => {
    const summary = data.summary;
    if (!summary[CollectorsMap.RouterCollector]) {
        return null;
    }
    return (
        <Button
            startIcon={<Route fontSize="small" />}
            color="info"
            variant="contained"
            sx={{
                whiteSpace: 'nowrap',
                height: '100%',
                textTransform: 'none',
                borderRadius: 0,
            }}
        >
            {summary[CollectorsMap.RouterCollector].name}
        </Button>
    );
};
