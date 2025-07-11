import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {CollectorsMap} from '@yiisoft/yii-dev-panel-sdk/Helper/collectors';

export const getCollectedCountByCollector = (collector: CollectorsMap, data: DebugEntry): number | undefined => {
    switch (collector) {
        case CollectorsMap.AssetCollector:
            return Number(data.summary[CollectorsMap.AssetCollector]?.bundles?.total);
        case CollectorsMap.DatabaseCollector:
            return Number(data.summary[CollectorsMap.DatabaseCollector]?.queries?.total) + Number(data.summary[CollectorsMap.DatabaseCollector]?.transactions?.total);
        case CollectorsMap.ExceptionCollector:
            return Object.values(data.summary[CollectorsMap.ExceptionCollector] ?? []).length > 0 ? 1 : 0;
        case CollectorsMap.EventCollector:
            return Number(data.summary[CollectorsMap.EventCollector]?.total);
        case CollectorsMap.LogCollector:
            return Number(data.summary[CollectorsMap.LogCollector]?.total);
        case CollectorsMap.ServiceCollector:
            return Number(data.summary[CollectorsMap.ServiceCollector]?.total);
        case CollectorsMap.VarDumperCollector:
            return Number(data.summary[CollectorsMap.VarDumperCollector]?.total);
        case CollectorsMap.ValidatorCollector:
            return Number(data.summary[CollectorsMap.ValidatorCollector]?.total);
        case CollectorsMap.MiddlewareCollector:
            return Number(data.summary[CollectorsMap.MiddlewareCollector]?.total);
        case CollectorsMap.QueueCollector:
            return (
                Number(data.summary[CollectorsMap.QueueCollector]?.countPushes) +
                Number(data.summary[CollectorsMap.QueueCollector]?.countStatuses) +
                Number(data.summary[CollectorsMap.QueueCollector]?.countProcessingMessages)
            );
        case CollectorsMap.HttpClientCollector:
            return Number(data.summary[CollectorsMap.HttpClientCollector]?.count);
        case CollectorsMap.HttpStreamCollector:
            return Number(data.summary[CollectorsMap.HttpStreamCollector]?.streams.length);
        case CollectorsMap.MailerCollector:
            return Number(data.summary[CollectorsMap.MailerCollector]?.total);
        case CollectorsMap.FilesystemStreamCollector:
            return Object.values(data.summary[CollectorsMap.FilesystemStreamCollector]?.streams ?? []).reduce((acc, value) => acc + value, 0);
        case CollectorsMap.ConsoleAppInfoCollector:
            return 0;
        case CollectorsMap.TimelineCollector:
            return Number(data.summary[CollectorsMap.TimelineCollector]?.total);
        default:
            return undefined;
    }
};
