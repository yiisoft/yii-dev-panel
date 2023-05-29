import {ArrowDownward} from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {Tooltip} from '@mui/material';
import Typography from '@mui/material/Typography';
import {TimelineContentWrapper} from '@yiisoft/yii-dev-panel/Module/Debug/Component/Timeline/TimelineContentWrapper';
import format from 'date-fns/format';

type MiddlewareType = {
    memory: number;
    name: string;
    time: number;
};
type BeforeMiddlewareType = {request: string} & MiddlewareType;
type AfterMiddlewareType = {response: string} & MiddlewareType;

type ActionHandlerType = {
    memory: number;
    name: string;
    request: string;
    startTime: number;
    endTime: number;
};
type MiddlewarePanelProps = {
    beforeStack: BeforeMiddlewareType[];
    afterStack: AfterMiddlewareType[];
    actionHandler: ActionHandlerType;
};

export const MiddlewarePanel = (props: MiddlewarePanelProps) => {
    const {beforeStack, afterStack, actionHandler} = props;

    return (
        <Timeline position="alternate">
            {beforeStack &&
                beforeStack.map((middleware, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{m: 'auto 0'}} color="text.secondary">
                            <Tooltip title={middleware.time}>
                                <Typography component="span">{format(middleware.time, 'hh:mm:ss.SSSS')}</Typography>
                            </Tooltip>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="info">
                                <ArrowDownward />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContentWrapper name={middleware.name} payload={middleware.request} />
                    </TimelineItem>
                ))}
            {actionHandler &&
                [actionHandler].map((middleware, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{m: 'auto 0'}} align="right" color="text.primary">
                            <Tooltip title={middleware.startTime}>
                                <Typography>{format(middleware.startTime, 'hh:mm:ss')}</Typography>
                            </Tooltip>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="success">
                                <ArrowDownward />
                            </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContentWrapper name={middleware.name} payload={middleware.request} />
                    </TimelineItem>
                ))}
            {afterStack &&
                afterStack.map((middleware, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{m: 'auto 0'}} color="text.secondary">
                            <Tooltip title={middleware.time}>
                                <Typography component="span">{format(middleware.time, 'hh:mm:ss')}</Typography>
                            </Tooltip>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="info">
                                <ArrowDownward />
                            </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContentWrapper name={middleware.name} payload={middleware.response} />
                    </TimelineItem>
                ))}
        </Timeline>
    );
};
