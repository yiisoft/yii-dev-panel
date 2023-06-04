import TerminalIcon from '@mui/icons-material/Terminal';
import {Chip} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {buttonColorConsole, buttonColorHttp} from '@yiisoft/yii-dev-panel-sdk/Helper/buttonColor';
import {isDebugEntryAboutConsole, isDebugEntryAboutWeb} from '@yiisoft/yii-dev-panel-sdk/Helper/debugEntry';
type DebugChipProps = {
    entry: DebugEntry;
};
export const DebugChip = ({entry}: DebugChipProps) => {
    if (isDebugEntryAboutConsole(entry)) {
        return (
            <Chip
                sx={{borderRadius: '5px 5px', margin: '0 2px'}}
                icon={<TerminalIcon />}
                label={entry.command?.exitCode}
                color={buttonColorConsole(Number(entry.command?.exitCode))}
            />
        );
    }
    if (isDebugEntryAboutWeb(entry)) {
        return (
            <Chip
                sx={{borderRadius: '5px 5px', margin: '0 2px'}}
                label={[entry.response?.statusCode, entry.request.method].join(' ')}
                color={buttonColorHttp(entry.response?.statusCode)}
            />
        );
    }
    return null;
};
