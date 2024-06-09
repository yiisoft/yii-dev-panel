import {ChatBubble} from '@mui/icons-material';
import {Badge, Button} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {ForwardedRef, forwardRef} from 'react';

type DevPanelItemProps = {
    data: DebugEntry;
    toggleIframeHandler: () => void;
};

const DevPanelItem = forwardRef((props: DevPanelItemProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {data, toggleIframeHandler, ...others} = props;
    return (
        <Button
            ref={ref}
            onClick={() => toggleIframeHandler()}
            color="info"
            variant="contained"
            sx={{
                whiteSpace: 'nowrap',
                textTransform: 'none',
                borderRadius: 0,
            }}
        >
            Iframe
        </Button>
    );
});
DevPanelItem.displayName = Button.name;
export {DevPanelItem};
