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
import {ServerSentEvents} from '@yiisoft/yii-dev-panel-sdk/Component/ServerSentEventsObserver';
import {Config} from '@yiisoft/yii-dev-panel-sdk/Config';
import {formatDate} from '@yiisoft/yii-dev-panel-sdk/Helper/formatDate';
import {forwardRef, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';

const DevServerObserver = new ServerSentEvents(Config.backendUrl + '/debug/api/dev');

export const useDevServerEvents = (onMessage: (event: MessageEvent) => void, subscribe = true) => {
    const prevOnMessage = useRef(onMessage);

    useEffect(() => {
        if (prevOnMessage.current) {
            DevServerObserver.unsubscribe(prevOnMessage.current);
        }
        if (!subscribe) {
            return;
        }

        DevServerObserver.subscribe(onMessage);
        prevOnMessage.current = onMessage;

        return () => {
            console.log('destroy');
            DevServerObserver.unsubscribe(onMessage);
            DevServerObserver.close();
        };
    }, [onMessage, subscribe]);
};

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

export const Layout = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [eventsCounter, setEventsCounter] = useState<Record<EventTypeEnum, number>>({
        [EventTypeEnum.VAR_DUMPER]: 0,
        [EventTypeEnum.LOGS]: 0,
    });
    useDevServerEvents(
        useCallback((m) => {
            // console.log('event', m);
            const data = JSON.parse(m.data);
            setEventsCounter((v) => ({...v, [data[0]]: v[data[0]] + 1}));
            setEvents((v) => [...v, {data: data[1], time: new Date(), type: data[0] as EventTypeEnum}]);
        }, []),
    );
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
                                {e.type === EventTypeEnum.VAR_DUMPER ? (
                                    <JsonRenderer value={JSON.parse(e.data)} />
                                ) : (
                                    e.data
                                )}
                            </ListItemText>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};
