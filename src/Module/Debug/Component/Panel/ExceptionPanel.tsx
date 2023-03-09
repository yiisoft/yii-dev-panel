import {ExceptionPreview} from '../Exception/ExceptionPreview';
import {Alert, AlertTitle, Box, Typography} from '@mui/material';

type ExceptionPanelProps = {
    exceptions: {
        class: string;
        message: string;
        line: string;
        file: string;
        code: string;
        trace: any[];
        traceAsString: string;
    }[];
};
export const ExceptionPanel = (props: ExceptionPanelProps) => {
    return (
        <>
            <Typography>
                Found <b>{props.exceptions?.length}</b> cascade exceptions
            </Typography>
            {(props.exceptions ?? []).map((exception, index) => (
                <Box key={index}>
                    <ExceptionPreview {...exception} />
                </Box>
            ))}
        </>
    );
};
