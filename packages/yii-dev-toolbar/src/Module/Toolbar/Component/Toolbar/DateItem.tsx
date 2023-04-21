import {Badge, Button} from '@mui/material';
import React, {ForwardedRef, forwardRef} from 'react';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import format from 'date-fns/format';
import {fromUnixTime} from 'date-fns';

type DateItemProps = {
    data: DebugEntry;
};

const DateItem = forwardRef((props: DateItemProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {data, ...others} = props;
    return (
        <Badge color="secondary" badgeContent={String(data.event.total)}>
            <Button
                ref={ref}
                color="info"
                variant="contained"
                sx={{
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    borderRadius: 0,
                }}
            >
                {format(fromUnixTime((data.web || data.console).request.startTime), 'do MMM hh:mm:ss')}
            </Button>
        </Badge>
    );
});
DateItem.displayName = Button.name;
export {DateItem};
