import * as React from 'react';
import {Alert, AlertTitle, IconButton, Link, Tooltip, Typography} from '@mui/material';
import {FilePresent} from '@mui/icons-material';
import Box from '@mui/material/Box';
import {parseFilePath, parseFilePathWithLineAnchor} from '@yiisoft/yii-dev-panel-sdk/Helper/filePathParser';
import {JsonRenderer} from '@yiisoft/yii-dev-panel/Module/Debug/Component/JsonRenderer';

type Level = 'error' | 'info' | 'debug';
type LogEntry = {
    context: object;
    level: Level;
    line: string;
    message: string;
    time: number;
};
type LogPanelProps = {
    data: LogEntry[];
};

export const LogPanel = ({data}: LogPanelProps) => {
    return (
        <>
            {!data || data.length === 0 ? (
                <>Nothing here</>
            ) : (
                data.map((entry, index) => (
                    <Alert key={index} variant="outlined" severity="success" icon={false}>
                        <AlertTitle>{entry.message}</AlertTitle>
                        <Box>
                            <JsonRenderer value={entry.context} depth={2} />
                            <Link
                                href={`/inspector/files?path=${parseFilePathWithLineAnchor(entry.line)}`}
                                target="_blank"
                            >
                                {entry.line}
                                <FilePresent fontSize="small" />
                            </Link>
                        </Box>
                    </Alert>
                ))
            )}
        </>
    );
};
