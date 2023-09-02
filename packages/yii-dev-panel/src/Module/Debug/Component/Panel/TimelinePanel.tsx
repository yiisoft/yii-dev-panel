import {ArrowDownward} from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {Tooltip} from '@mui/material';
import Typography from '@mui/material/Typography';
import {isClassString} from '@yiisoft/yii-dev-panel-sdk/Helper/classMatcher';
import {toObjectString} from '@yiisoft/yii-dev-panel-sdk/Helper/objectString';
import {JsonRenderer} from '@yiisoft/yii-dev-panel/Module/Debug/Component/JsonRenderer';
import format from 'date-fns/format';

type Item = [number, number, string] | [number, number, string, string];
type TimelinePanelProps = {
    data: Item[];
};
export const TimelinePanel = ({data}: TimelinePanelProps) => {
    console.log('data', data);
    if (!data || !Array.isArray(data)) {
        return <Typography>Nothing here</Typography>;
    }
    return (
        <Timeline position="alternate">
            {data.map((row, index) => (
                <TimelineItem key={index}>
                    <TimelineOppositeContent sx={{m: 'auto 0'}} color="text.secondary">
                        <Tooltip title={row[0]}>
                            <Typography component="span">{format(new Date(row[0]), 'HH:mm:ss.SSSS')}</Typography>
                        </Tooltip>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color="info">
                            <ArrowDownward />
                        </TimelineDot>
                        {index !== data.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent sx={{py: '12px', px: 2}}>
                        <Tooltip title={row[2]}>
                            <Typography variant="h6" component="span">
                                {row[2].split('\\').pop()}
                            </Typography>
                        </Tooltip>
                        {!!row[3] && (
                            <JsonRenderer value={isClassString(row[3]) ? toObjectString(row[3], row[1]) : row[3]} />
                        )}
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};
