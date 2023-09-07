import {Config} from '@yiisoft/yii-dev-panel-sdk/Config';

// TODO support custom events and decode payload to object
export class ServerSentEvents {
    private eventSource: EventSource = null;
    private listeners: ((event: MessageEvent) => void)[] = [];
    constructor(private url: string) {}

    subscribe(subscriber: (event: MessageEvent) => void) {
        if (this.eventSource === null || this.eventSource.readyState === EventSource.CLOSED) {
            this.eventSource = new EventSource(this.url);
        }
        this.listeners.push(subscriber);
        this.eventSource.addEventListener('message', subscriber);
    }

    unsubscribe(subscriber: (event: MessageEvent) => void) {
        if (this.eventSource === null) {
            return;
        }
        this.eventSource.removeEventListener('message', subscriber);
        this.listeners = this.listeners.filter((listener) => listener !== subscriber);
        if (this.eventSource.readyState === EventSource.OPEN && this.listeners.length === 0) {
            this.close();
        }
    }
    close() {
        this.eventSource.close();
    }
}

export const ServerSentEventsObserver = new ServerSentEvents(Config.backendUrl + '/debug/api/event-stream');
