import format from 'date-fns/format';
import {fromUnixTime} from 'date-fns';

export function formatDate(unixTimeStamp: number) {
    return format(fromUnixTime(unixTimeStamp), 'do MMM hh:mm:ss');
}
