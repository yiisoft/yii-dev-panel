import TerminalIcon from '@mui/icons-material/Terminal';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {DebugChip} from '@yiisoft/yii-dev-panel-sdk/Component/DebugChip';
import {buttonColorConsole, buttonColorHttp} from '@yiisoft/yii-dev-panel-sdk/Helper/buttonColor';
import {isDebugEntryAboutConsole, isDebugEntryAboutWeb} from '@yiisoft/yii-dev-panel-sdk/Helper/debugEntry';
import {CollectorsMap} from "@yiisoft/yii-dev-panel-sdk/Helper/collectors";

type DebugChipProps = {
    entry: DebugEntry;
};
export const DebugEntryChip = ({entry}: DebugChipProps) => {
    if (isDebugEntryAboutConsole(entry)) {
        return (
            <DebugChip
                icon={<TerminalIcon />}
                label={entry.summary[CollectorsMap.CommandCollector]?.exitCode}
                color={buttonColorConsole(Number(entry.summary[CollectorsMap.CommandCollector]?.exitCode))}
            />
        );
    }
    if (isDebugEntryAboutWeb(entry)) {
        return (
            <DebugChip
                label={[entry.summary[CollectorsMap.RequestCollector]?.response?.statusCode, entry.summary[CollectorsMap.RequestCollector].request.method].join(' ')}
                color={buttonColorHttp(entry.summary[CollectorsMap.RequestCollector].response?.statusCode)}
            />
        );
    }
    return null;
};
