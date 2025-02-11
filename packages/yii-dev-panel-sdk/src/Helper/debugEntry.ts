import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {CollectorsMap} from "@yiisoft/yii-dev-panel-sdk/Helper/collectors";

export function isDebugEntryAboutConsole(entry: DebugEntry): boolean {
    return entry && CollectorsMap.CommandCollector in entry.summary;
}

export function isDebugEntryAboutWeb(entry: DebugEntry): boolean {
    return entry && CollectorsMap.WebAppInfoCollector in entry.summary;
}
