import DataObjectIcon from '@mui/icons-material/DataObject';
import TableRowsIcon from '@mui/icons-material/TableRows';
import {
    Badge,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    ToggleButtonProps,
    Tooltip,
} from '@mui/material';

import Avatar from '@mui/material/Avatar';
import {JsonRenderer} from '@yiisoft/yii-dev-panel-sdk/Component/JsonRenderer';
import {LogEntry} from '@yiisoft/yii-dev-panel-sdk/Component/LogEntry';
import {formatDate} from '@yiisoft/yii-dev-panel-sdk/Helper/formatDate';
import {forwardRef, MouseEvent, useCallback, useState} from 'react';
import {useSelector} from '@yiisoft/yii-dev-panel/store';
import {useServerSentEvents} from '@yiisoft/yii-dev-panel-sdk/Component/useDevServerEvents';

export const BadgedToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps & {badgeContent: number}>(
    (props, ref) => {
        const {badgeContent, children, ...others} = props;

        return (
            <Badge badgeContent={String(badgeContent)} color="primary">
                <ToggleButton {...others} ref={ref}>
                    {children}
                </ToggleButton>
            </Badge>
        );
    },
);

enum EventTypeEnum {
    VAR_DUMPER = 27,
    LOGS = 43,
}

type EventType = {
    data: string;
    time: Date;
    type: EventTypeEnum;
};

function DebugEntryIcon({type}: {type: EventTypeEnum | undefined}) {
    if (type === EventTypeEnum.VAR_DUMPER) {
        return (
            <Tooltip title={'VarDumper'}>
                <DataObjectIcon />
            </Tooltip>
        );
    }
    if (type === EventTypeEnum.LOGS) {
        return (
            <Tooltip title={'Logger'}>
                <TableRowsIcon />
            </Tooltip>
        );
    }

    return <Avatar alt={'Unknown'} />;
}

function DebugEntryContent({data, type}: {data: string; type: EventTypeEnum}) {
    if (type === EventTypeEnum.VAR_DUMPER) {
        return <JsonRenderer value={JSON.parse(data)} />;
    }
    if (type === EventTypeEnum.LOGS) {
        return <LogEntry entry={JSON.parse(data)} />;
    }
    return <>{data}</>;
}

export const Layout = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [eventsCounter, setEventsCounter] = useState<Record<EventTypeEnum, number>>({
        [EventTypeEnum.VAR_DUMPER]: 0,
        [EventTypeEnum.LOGS]: 0,
    });
    const backendUrl = useSelector((state) => state.application.baseUrl) as string;

    const onUpdatesHandler = useCallback((m) => {
        console.log('event', m);
        const data = JSON.parse(m.data);
        setEventsCounter((v) => ({...v, [data[0]]: v[data[0]] + 1}));
        setEvents((v) => [...v, {data: data[1], time: new Date(), type: data[0] as EventTypeEnum}]);
    }, []);

    useServerSentEvents(backendUrl, onUpdatesHandler, true);

    const [types, setTypes] = useState<EventTypeEnum[]>([EventTypeEnum.VAR_DUMPER, EventTypeEnum.LOGS]);

    const handleFormat = (event: MouseEvent<HTMLElement>, types: EventTypeEnum[]) => {
        setTypes(types);
    };

    const handleClear = (event: MouseEvent<HTMLElement>) => {
        setEvents([]);
        setEventsCounter({
            [EventTypeEnum.VAR_DUMPER]: 0,
            [EventTypeEnum.LOGS]: 0,
        });
    };

    return (
        <>
            <h2>Debug Server Listener</h2>
            <Stack direction={'row'} spacing={1}>
                <Badge badgeContent={String(events.length)} color="primary">
                    <Button onClick={handleClear}>Clear</Button>
                </Badge>
                <ToggleButtonGroup size="small" value={types} onChange={handleFormat} color="primary">
                    <BadgedToggleButton badgeContent={eventsCounter[EventTypeEnum.LOGS]} value={EventTypeEnum.LOGS}>
                        <TableRowsIcon />
                        &nbsp;Logs
                    </BadgedToggleButton>
                    <BadgedToggleButton
                        badgeContent={eventsCounter[EventTypeEnum.VAR_DUMPER]}
                        value={EventTypeEnum.VAR_DUMPER}
                    >
                        <DataObjectIcon />
                        &nbsp;VarDumper
                    </BadgedToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <List>
                {events.map((e) => {
                    if (!types.includes(e.type)) {
                        return null;
                    }
                    return (
                        <ListItem>
                            <ListItemIcon>
                                <DebugEntryIcon type={e.type} />
                            </ListItemIcon>
                            <ListItemText secondary={formatDate(e.time.getTime())}>
                                <DebugEntryContent type={e.type} data={e.data} />
                            </ListItemText>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};
