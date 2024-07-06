import {ArrowDownward, OpenInNew} from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {IconButton, Tooltip} from '@mui/material';
import Typography from '@mui/material/Typography';
import {parseFilename, parseFilePathWithLineAnchor} from '@yiisoft/yii-dev-panel-sdk/Helper/filePathParser';
import {formatMicrotime} from '@yiisoft/yii-dev-panel-sdk/Helper/formatDate';
import {TimelineContentWrapper} from '@yiisoft/yii-dev-panel/Module/Debug/Component/Timeline/TimelineContentWrapper';

type EventType = {
    event: string;
    file: string;
    line: string;
    name: string;
    time: number;
};

const Line = ({event}: {event: EventType}) => {
    const line = parseFilename(event.line);
    return (
        <Typography sx={{whiteSpace: 'nowrap'}}>
            <Tooltip title={event.line}>
                <Typography component="span" sx={{fontSize: 'calc(100% - 2px)'}}>
                    {line}
                </Typography>
            </Tooltip>
            <Tooltip title="Open in File Explorer">
                <IconButton size="small" href={`/inspector/files?path=${parseFilePathWithLineAnchor(event.line)}`}>
                    <OpenInNew fontSize="small" />
                </IconButton>
            </Tooltip>
        </Typography>
    );
};

type EventTimelineProps = {
    events: EventType[];
};
export const EventPanel = (props: EventTimelineProps) => {
    const {events} = props;
    if (events && events.length === 0) {
        return <>Nothing here</>;
    }

    return (
        <Timeline position="alternate">
            {events &&
                events.map((event, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{m: 'auto 0'}} color="text.secondary">
                            <Tooltip title={event.time}>
                                <Typography component="span">{formatMicrotime(event.time)}</Typography>
                            </Tooltip>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="info">
                                <ArrowDownward />
                            </TimelineDot>
                            {index !== events.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContentWrapper name={event.name} file={event.file} payload={event.event}>
                            <Line event={event} />
                        </TimelineContentWrapper>
                    </TimelineItem>
                ))}
        </Timeline>
    );
};
