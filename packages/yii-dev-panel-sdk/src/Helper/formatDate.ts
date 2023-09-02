import {fromUnixTime} from 'date-fns';
import format from 'date-fns/format';

export function formatDate(unixTimeStamp: number) {
    return format(fromUnixTime(unixTimeStamp), 'do MMM HH:mm:ss');
}

export function formatMicrotime(unixTimeStamp: number) {
    return formatWithMicrotime(unixTimeStamp, 'HH:mm:ss');
}
export function formatWithMicrotime(unixTimeStamp: number, dateFormat: string) {
    console.log(unixTimeStamp);
    const float = String(unixTimeStamp).split('.');
    return format(fromUnixTime(unixTimeStamp), dateFormat) + (float.length === 2 ? '.' + float[1].padEnd(6, '0') : '');
}

export function formatMillisecondsAsDuration(milliseconds: number) {
    return `${(milliseconds * 1000).toFixed(3)} ms`;
}
