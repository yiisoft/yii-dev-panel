import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {StepContent} from "@mui/material";
import {GiiGenerator} from "../../API/Gii";
import {PreviewStep} from "./GeneratorSteps/PreviewStep";
import {ResultStep} from "./GeneratorSteps/ResultStep";
import {GenerateStep} from "./GeneratorSteps/GenerateStep";
import {ContextProvider} from "./Stepper/Context/Context";

const steps = [
    {
        component: PreviewStep,
        label: 'Preview',
        buttonLabel: 'preview',
    },
    {
        component: GenerateStep,
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

    const handleNext = async () => {
        setActiveStepIndex(prev => prev + 1)
    };

    const handleReset = () => {
        setActiveStepIndex(0)
    };

    return (
        <Box sx={{width: '100%'}}>
            <ContextProvider>
                <Stepper activeStep={activeStepIndex} orientation="vertical">
                    {Object.values(steps).map((step, index) => (
                        <Step key={index}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepContent>
                                <step.component generator={generator} onComplete={handleNext}/>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </ContextProvider>
        </Box>
    );
}
