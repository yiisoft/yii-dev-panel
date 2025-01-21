import {FilePresent} from '@mui/icons-material';
import {Alert, AlertTitle, Link} from '@mui/material';
import Box from '@mui/material/Box';
import {JsonRenderer} from '@yiisoft/yii-dev-panel-sdk/Component/JsonRenderer';
import {phpLoggerLevelToAlertColor} from '@yiisoft/yii-dev-panel-sdk/Helper/collorMapper';
import {parseFilePathWithLineAnchor} from '@yiisoft/yii-dev-panel-sdk/Helper/filePathParser';
import {PhpLoggerLevel} from '@yiisoft/yii-dev-panel-sdk/Types/logger';

export type LogEntry = {
    context: object;
    level: PhpLoggerLevel;
    line?: string;
    message: string;
    time: number;
};
type LogEntryProps = {
    entry: LogEntry;
};
export const LogEntry = ({entry}: LogEntryProps) => {
    return (
        <Alert variant="outlined" severity={phpLoggerLevelToAlertColor(entry.level)} icon={false}>
            <AlertTitle>{entry.message}</AlertTitle>
            <Box>
                <JsonRenderer value={entry.context} depth={2} />
                {'line' in entry && (
                    <Link href={`/inspector/files?path=${parseFilePathWithLineAnchor(entry.line)}`}>
                        {entry.line}
                        <FilePresent fontSize="small" />
                    </Link>
                )}
            </Box>
        </Alert>
    );
};
