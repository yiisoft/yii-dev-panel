import {Badge, Button} from '@mui/material';
import React, {ForwardedRef, forwardRef} from 'react';
import {DebugEntry} from '../../API/Debug';
import {ChatBubble} from '@mui/icons-material';
import {CollectorsMap} from '../../Helper/collectors';

type EventsItemProps = {
    data: DebugEntry;
};

const EventsItem = forwardRef((props: EventsItemProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {data, ...others} = props;
    return (
        <Badge color="secondary" badgeContent={String(data.event.total)}>
            <Button
                ref={ref}
                href={`/debug/?collector=${CollectorsMap.EventCollector}&debugEntry=${data.id}`}
                startIcon={<ChatBubble fontSize="small" />}
                color="info"
                variant="contained"
                sx={{
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    borderRadius: 0,
                }}
            >
                Events
            </Button>
        </Badge>
    );
});
EventsItem.displayName = Button.name;
export {EventsItem};