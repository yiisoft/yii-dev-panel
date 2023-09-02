import {fromUnixTime} from 'date-fns';
import format from 'date-fns/format';

export function formatDate(unixTimeStamp: number) {
    return format(fromUnixTime(unixTimeStamp), 'do MMM HH:mm:ss');
}

export function formatMillisecondsAsDuration(milliseconds: number) {
    return `${(milliseconds * 1000).toFixed(3)} ms`;
}
