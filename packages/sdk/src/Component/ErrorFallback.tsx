import {FallbackProps} from 'react-error-boundary';
import Box from '@mui/material/Box';
import {Accordion, AccordionDetails, Alert, AlertTitle, Button} from '@mui/material';
import * as React from 'react';

export const ErrorFallback = ({error, resetErrorBoundary}: FallbackProps) => {
    return (
        <Box mt={2}>
            <Alert severity="error">
                <AlertTitle>Something went wrong:</AlertTitle>
                <pre>{error.message}</pre>
                <Accordion>
                    <AccordionDetails>
                        <pre>{error.stack?.toString()}</pre>
                    </AccordionDetails>
                </Accordion>
                <Button color="error" variant="outlined" onClick={resetErrorBoundary}>
                    Try again
                </Button>
            </Alert>
        </Box>
    );
};
