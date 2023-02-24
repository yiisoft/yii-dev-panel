import format from 'date-fns/format';
import {fromUnixTime} from 'date-fns';
import {DebugEntry} from '../API/Debug';

export function isDebugEntryAboutConsole(entry: DebugEntry): boolean {
    return entry && 'console' in entry;
}

export function isDebugEntryAboutWeb(entry: DebugEntry): boolean {
    return entry && 'web' in entry;
}
