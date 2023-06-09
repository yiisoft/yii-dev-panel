import {Config} from '@yiisoft/yii-dev-panel-sdk/Config';

// TODO support custom events and decode payload to object
class ServerSentEvents {
    private eventSource: EventSource;
    constructor(url: string) {
        this.eventSource = new EventSource(url);
    }
    subscribe(subscriber: (event: MessageEvent) => void) {
        this.eventSource.addEventListener('message', subscriber);
    }
    unsubscribe(subscriber: (event: MessageEvent) => void) {
        this.eventSource.removeEventListener('message', subscriber);
    }
}

export const ServerSentEventsObserver = new ServerSentEvents(Config.backendUrl + '/debug/api/event-stream');
