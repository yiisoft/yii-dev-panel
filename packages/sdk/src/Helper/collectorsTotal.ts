import {CollectorsMap} from '@yii-dev-panel/sdk/Helper/collectors';
import {DebugEntry} from '@yii-dev-panel/sdk/API/Debug/Debug';

export const getCollectedCountByCollector = (collector: CollectorsMap, data: DebugEntry): number => {
    switch (collector) {
        case CollectorsMap.AssetCollector:
            return data.asset.bundles.total;
        case CollectorsMap.DatabaseCollector:
            return data.db.queries.total + data.db.transactions.total;
        case CollectorsMap.ExceptionCollector:
            return Object.values(data.exception).length > 0 ? 1 : 0;
        case CollectorsMap.EventCollector:
            return data.event.total;
        case CollectorsMap.LogCollector:
            return data.logger.total;
        case CollectorsMap.ServiceCollector:
            return data.service.total;
        case CollectorsMap.ValidatorCollector:
            return data.validator.total + data.validator.invalid + data.validator.valid;
        case CollectorsMap.MiddlewareCollector:
            return data.middleware.total;
        case CollectorsMap.QueueCollector:
            return data.queue.countPushes + data.queue.countStatuses + data.queue.countProcessingMessages;
        case CollectorsMap.HttpClientCollector:
            return data.http.count;
        case CollectorsMap.HttpStreamCollector:
            return data.http_stream.length;
        case CollectorsMap.FilesystemStreamCollector:
            return Object.values(data.fs_stream).reduce((acc, value) => acc + value, 0);
        case CollectorsMap.ConsoleAppInfoCollector:
            return 0;
        default:
            return 0;
    }
};
