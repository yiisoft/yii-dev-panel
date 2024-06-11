import {LogEntry} from '@yiisoft/yii-dev-panel-sdk/Component/LogEntry';

type LogPanelProps = {
    data: LogEntry[];
};

export const LogPanel = ({data}: LogPanelProps) => {
    return (
        <>
            {!data || data.length === 0 ? (
                <>Nothing here</>
            ) : (
                data.map((entry, index) => <LogEntry key={index} entry={entry} />)
            )}
        </>
    );
};
