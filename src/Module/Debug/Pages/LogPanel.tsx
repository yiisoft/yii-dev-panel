import * as React from 'react';
import {Alert, AlertTitle, IconButton, Tooltip, Typography} from '@mui/material';
import {FilePresent} from '@mui/icons-material';
import Box from '@mui/material/Box';

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

function parseFilePath(lineAndNumber: string) {
    return lineAndNumber.replace(/(:[0-9]+)$/, '');
}

export const LogPanel = ({data}: LogPanelProps) => {
    return (
        <>
            {data &&
                data.map((entry) => (
                    <Alert variant="outlined" severity="success" icon={false}>
                        <Box sx={{display: 'flex'}}>
                            <AlertTitle sx={{display: 'flex', flexGrow: 1}}>{entry.message}</AlertTitle>

                            <Tooltip title="Open in File Explorer">
                                <IconButton
                                    sx={{display: 'flex'}}
                                    size="small"
                                    href={`/inspector/files?path=${parseFilePath(entry.line)}`}
                                >
                                    <FilePresent fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Typography component="span">{entry.line}</Typography>
                    </Alert>
                ))}
        </>
    );
};
