import DataObjectIcon from '@mui/icons-material/DataObject';
import TableRowsIcon from '@mui/icons-material/TableRows';
import {Button, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Tooltip} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {ServerSentEvents} from '@yiisoft/yii-dev-panel-sdk/Component/ServerSentEventsObserver';
import {Config} from '@yiisoft/yii-dev-panel-sdk/Config';
import {formatDate} from '@yiisoft/yii-dev-panel-sdk/Helper/formatDate';
import {useCallback, useEffect, useRef, useState} from 'react';

const DevServerObserver = new ServerSentEvents(Config.backendUrl + '/debug/api/dev');

type DebugUpdatedType = {
    type: EventTypesEnum.DebugUpdated;
    payload: {};
};

export enum EventTypesEnum {
    DebugUpdated = 'debug-updated',
}

export type EventTypes = DebugUpdatedType;

export const useDevServerEvents = (onMessage: (event: MessageEvent<EventTypes>) => void, subscribe = true) => {
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

export const Layout = () => {
    const [events, setEvents] = useState([]);
    useDevServerEvents(
        useCallback((m) => {
            // console.log('event', m);
            setEvents((v) => [...v, {data: m.data, time: new Date()}]);
        }, []),
    );

    return (
        <>
            <Typography>Total events: {events.length}</Typography>
            <Button onClick={() => setEvents([])}>Clear</Button>
            <List>
                {events.map((e) => {
                    const data = JSON.parse(e.data);
                    if (data[0] === 43) {
                        return (
                            <ListItem>
                                <ListItemIcon>
                                    <Tooltip title={'Logger'}>
                                        <TableRowsIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText>{data[1]}</ListItemText>
                                <ListItemSecondaryAction>{formatDate(e.time.getTime())}</ListItemSecondaryAction>
                            </ListItem>
                        );
                    }
                    if (data[0] === 27) {
                        return (
                            <ListItem>
                                <ListItemIcon>
                                    <Tooltip title={'VarDumper'}>
                                        <DataObjectIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText>{data[1]}</ListItemText>
                                <ListItemSecondaryAction>{formatDate(e.time.getTime())}</ListItemSecondaryAction>
                            </ListItem>
                        );
                    }
                    return (
                        <ListItem>
                            <ListItemIcon>
                                <Avatar alt={'Unknown'} />
                            </ListItemIcon>
                            <ListItemText>{data[1]}</ListItemText>
                            <ListItemSecondaryAction>{formatDate(e.time.getTime())}</ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};
