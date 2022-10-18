import * as React from "react";
import {useContext} from "react";
import {StepProps} from "./Step.types";
import {Context} from "../Stepper/Context/Context";
import {Alert, AlertColor, AlertTitle, Box, Button, ButtonGroup} from "@mui/material";

function matchSeverity(status: string): AlertColor {
    let result: AlertColor = 'error';
    switch (status) {
        case 'created':
            result = 'success';
            break;
        case 'overwrote':
            result = 'info';
            break;
        case 'skipped':
            result = 'warning';
            break;
    }
    return result;
}

export function ResultStep({generator, onComplete}: StepProps) {
    const context = useContext(Context);

    const files = context.files;
    const handleNew = () => {
        onComplete()
    }

    return (
        <Box>
            {context.results.map(result => {
                const file = files.find(file => file.id === result.id)
                if (!file) {
                    return <Alert severity='error'>Unknown file with ID: {result.id}</Alert>
                }
                // TODO: show errors more user-friendly
                return (
                    <Alert severity={matchSeverity(result.status)}>
                        {result.status === 'error' && <AlertTitle>{result.error}</AlertTitle>}
                        {file.relativePath}
                    </Alert>
                )
            })}

            <Box my={2}>
                <ButtonGroup>
                    <Button onClick={handleNew} variant="contained">Start new</Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
}