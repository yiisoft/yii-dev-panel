import {ServerSentEvents} from '@yiisoft/yii-dev-panel-sdk/Component/ServerSentEventsObserver';
import {Config} from '@yiisoft/yii-dev-panel-sdk/Config';
import {useEffect, useRef, useState} from 'react';

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
            DevServerObserver.unsubscribe(onMessage);
            DevServerObserver.close();
        };
    }, [onMessage, subscribe]);
};

export const Layout = () => {
    const [events, setEvents] = useState([]);
    useDevServerEvents((m) => {
        console.log('event', m);
        setEvents((v) => [...v, {data: m.data, time: new Date()}]);
    });

    return (
        <>
            {events.map((e) => (
                <p>
                    {e.data} {e.time.getTime()}
                </p>
            ))}
        </>
    );
};
