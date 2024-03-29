import {ChatBubble} from '@mui/icons-material';
import {Badge, Button} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';

type ValidatorItemProps = {
    data: DebugEntry;
};

export const ValidatorItem = ({data}: ValidatorItemProps) => {
    if (!data.validator || data.validator.total === 0) {
        return null;
    }
    return (
        <Badge color="secondary" badgeContent={String(data.validator.total)}>
            <Button
                startIcon={<ChatBubble fontSize="small" />}
                color={data.validator.invalid === 0 ? 'info' : 'warning'}
                variant="contained"
                sx={{
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    borderRadius: 0,
                }}
            >
                Validator
            </Button>
        </Badge>
    );
};
