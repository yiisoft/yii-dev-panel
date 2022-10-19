import * as React from "react";
import {useContext} from "react";
import {StepProps} from "./Step.types";
import {Context} from "../../Context/Context";
import {Alert, AlertTitle, Box, Button, ButtonGroup} from "@mui/material";
import {matchSeverityByResultStatus} from "../matchSeverity";

export function ResultStep({generator, onComplete}: StepProps) {
    const context = useContext(Context);

    const files = context.files;
    const handleNew = () => {
        onComplete()
    }

    return (
        <Box>
            {context.results.map((result, index) => {
                const file = files.find(file => file.id === result.id)
                if (!file) {
                    return <Alert key={index} severity='error'>Unknown file with ID: {result.id}</Alert>
                }
                // TODO: show errors more user-friendly
                return (
                    <Alert key={index} severity={matchSeverityByResultStatus(result.status)}>
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