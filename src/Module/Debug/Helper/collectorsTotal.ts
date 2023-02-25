import {CollectorsMap} from './collectors';
import {DebugEntry} from '../API/Debug';

export const getCollectedCountByCollector = (collector: CollectorsMap, data: DebugEntry): number => {
    switch (collector) {
        case CollectorsMap.AssetCollector:
            return data.asset.bundles.total;
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
