import {fromUnixTime} from 'date-fns';
import format from 'date-fns/format';

export function formatDate(unixTimeStamp: number) {
    return format(fromUnixTime(unixTimeStamp), 'do MMM hh:mm:ss');
}
