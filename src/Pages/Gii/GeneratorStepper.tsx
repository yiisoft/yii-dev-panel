import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {StepContent} from "@mui/material";
import {GiiGenerator} from "../../API/Gii";
import {PreviewStep} from "./GeneratorSteps/PreviewStep";
import {ResultStep} from "./GeneratorSteps/ResultStep";

const steps = [
    {
        component: PreviewStep,
        label: 'Preview',
        buttonLabel: 'preview',
    },
    {
        component: PreviewStep,
        label: 'Generate',
        buttonLabel: 'generate',
    },
    {
        component: ResultStep,
        label: 'Result',
        buttonLabel: 'finish',
    },
];

export function GeneratorStepper({generator}: { generator: GiiGenerator }) {
    const [activeStepIndex, setActiveStepIndex] = React.useState(0);

    const handleNext = () => {
        setActiveStepIndex(prev => prev + 1)
    };

    const handleBack = () => {
        setActiveStepIndex(prev => prev - 1)
    };

    const handleReset = () => {
        setActiveStepIndex(0)
    };

    return (
        <Box sx={{width: '100%'}}>
            <Stepper activeStep={activeStepIndex} orientation="vertical">
                {Object.values(steps).map((step, index) => (
                    <Step key={index}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>
                            <step.component generator={generator}/>
                            <Box sx={{mb: 2}}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{mt: 1, mr: 1}}
                                    >
                                        {step.buttonLabel}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{mt: 1, mr: 1}}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}
