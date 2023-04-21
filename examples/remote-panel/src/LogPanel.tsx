import * as React from 'react';
import {useEffect, useState} from 'react';
import { Alert, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { YiiIcon } from "@yiisoft/yii-dev-panel-sdk/Component/SvgIcon/YiiIcon";
import { JsonRenderer } from "@yiisoft/yii-dev-panel-sdk/Component/JsonRenderer";

type Level = 'success' | 'error';
type LogEntry = {
    severity: Level;
    text: string;
};
type LogPanelProps = {
    data: LogEntry[];
};

const LogPanel = ({data}: LogPanelProps) => {
    const [logs, setLogs] = useState(data);
    useEffect(() => {
        setTimeout(() => {
            console.log('clear logs');
            setLogs([]);
        }, 1000);
    }, []);

    return (
        <>
            {!logs || logs.length === 0 ? (
                <>
                    <YiiIcon />
                    <Typography>Nothing here</Typography>
                    <Button variant="contained" color="primary" onClick={() => setLogs(data)}>
                        Restore
                    </Button>
                </>
            ) : (
                logs.map((entry, index) => (
                    <Alert key={index} variant="outlined" severity={entry.severity} icon={false}>
                        {entry.text}
                    </Alert>
                ))
            )}
            <JsonRenderer value={data} />
        </>
    );
};

export default LogPanel;
