import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import {IconButton, Tooltip} from '@mui/material';
import {ArrowDownward, OpenInNew} from '@mui/icons-material';
import {TimelineContentWrapper} from './TimelineContentWrapper';
import {parseFilePathWithLineAnchor} from '../../../../Helper/filePathParser';

type EventType = {
    event: string;
    file: string;
    line: string;
    name: string;
    time: number;
};
type EventTimelineProps = {
    events: EventType[];
};

const Line = ({event}: {event: EventType}) => {
    const line = event.line.split('/').pop();
    return (
        <Typography sx={{whiteSpace: 'nowrap'}}>
            <Tooltip title={event.line}>
                <Typography component="span" sx={{fontSize: 'calc(100% - 2px)'}}>
                    {line}
                </Typography>
            </Tooltip>
            <Tooltip title="Open in File Explorer">
                <IconButton
                    size="small"
                    target="_blank"
                    href={`/inspector/files?path=${parseFilePathWithLineAnchor(event.line)}`}
                >
                    <OpenInNew fontSize="small" />
                </IconButton>
            </Tooltip>
        </Typography>
    );
};

export const EventTimeline = (props: EventTimelineProps) => {
    const {events} = props;

    return (
        <Timeline position="alternate">
            {events &&
                events.map((event, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{m: 'auto 0'}} color="text.secondary">
                            <Tooltip title={event.time}>
                                <Typography component="span">{format(event.time, 'hh:mm:ss.SSSS')}</Typography>
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
