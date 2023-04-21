import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StepContent } from "@mui/material";
import { GiiGenerator } from "@yiisoft/yii-dev-panel/Module/Gii/API/Gii";
import { PreviewStep } from "@yiisoft/yii-dev-panel/Module/Gii/Component/GeneratorSteps/PreviewStep";
import { ResultStep } from "@yiisoft/yii-dev-panel/Module/Gii/Component/GeneratorSteps/ResultStep";
import { GenerateStep } from "@yiisoft/yii-dev-panel/Module/Gii/Component/GeneratorSteps/GenerateStep";
import { ContextProvider } from "@yiisoft/yii-dev-panel/Module/Gii/Context/Context";

const steps = [
    {
        component: PreviewStep,
        label: 'Preview',
    },
    {
        component: GenerateStep,
        label: 'Generate',
    },
    {
        component: ResultStep,
        label: 'Result',
    },
];

export function GeneratorStepper({generator}: {generator: GiiGenerator}) {
    const [activeStepIndex, setActiveStepIndex] = React.useState(0);

    const handleNext = async () => {
        setActiveStepIndex((prev) => prev + 1);
    };

    const handleReset = () => {
        setActiveStepIndex(0);
    };

    return (
        <>
            <ContextProvider>
                <Stepper activeStep={activeStepIndex} orientation="vertical">
                    {Object.values(steps).map((step, index) => (
                        <Step key={index}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepContent>
                                <step.component
                                    generator={generator}
                                    onComplete={() => {
                                        if (index === steps.length - 1) {
                                            return handleReset();
                                        }
                                        return handleNext();
                                    }}
                                />
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </ContextProvider>
        </>
    );
}
