import {Chip} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {buttonColorConsole, buttonColorHttp} from '@yiisoft/yii-dev-panel-sdk/Helper/buttonColor';
import {isDebugEntryAboutConsole, isDebugEntryAboutWeb} from '@yiisoft/yii-dev-panel-sdk/Helper/debugEntry';

type DebugChipProps = {
    entry: DebugEntry;
};
export const DebugChip = ({entry}: DebugChipProps) => {
    return (
        <Chip
            sx={{borderRadius: '5px 5px', margin: '0 2px'}}
            label={`${
                isDebugEntryAboutConsole(entry)
                    ? [entry.command?.exitCode].join(' ')
                    : isDebugEntryAboutWeb(entry)
                    ? [entry.response?.statusCode, entry.request.method].join(' ')
                    : 'Unknown entry'
            }`}
            color={
                isDebugEntryAboutConsole(entry)
                    ? buttonColorConsole(Number(entry.command?.exitCode))
                    : isDebugEntryAboutWeb(entry)
                    ? buttonColorHttp(entry.response?.statusCode)
                    : 'info'
            }
        />
    );
};
