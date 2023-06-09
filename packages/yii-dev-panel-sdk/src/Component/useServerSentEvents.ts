import {ServerSentEventsObserver} from '@yiisoft/yii-dev-panel-sdk/Component/ServerSentEventsObserver';
import {useEffect, useRef} from 'react';

type DebugUpdatedType = {
    type: EventTypesEnum.DebugUpdated;
    payload: {};
};

export enum EventTypesEnum {
    DebugUpdated = 'debug-updated',
}

export type EventTypes = DebugUpdatedType;

export const useServerSentEvents = (onMessage: (event: MessageEvent<EventTypes>) => void, subscribe = true) => {
    const prevOnMessage = useRef(onMessage);

    useEffect(() => {
        if (prevOnMessage.current) {
            ServerSentEventsObserver.unsubscribe(prevOnMessage.current);
        }
        if (!subscribe) {
            return;
        }

        ServerSentEventsObserver.subscribe(onMessage);
        prevOnMessage.current = onMessage;

        return () => {
            ServerSentEventsObserver.unsubscribe(onMessage);
        };
    }, [onMessage]);
};
