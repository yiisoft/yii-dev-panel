import {usePostGenerateMutation} from "../../../API/Gii";
import {createYupValidationSchema} from "../../../Adapter/yup/yii.validator";
import {FieldValues, FormProvider, useForm, UseFormReturn} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import * as React from "react";
import {FormInput} from "../FormInput";
import {StepProps} from "./Step.types";

function handleResponseErrors(response: any, form: UseFormReturn) {
    if ('error' in response) {
        const errorsMap = response.error?.data?.errors as Record<string, string[]> || {};
        console.log(errorsMap)

        for (let attribute in errorsMap) {
            const errors = errorsMap[attribute];
            form.setError(attribute, {message: errors.join(' ')})
        }
    }
}

export function GenerateStep({generator, onComplete}: StepProps) {
    const attributes = generator.attributes;
    const validationSchema = createYupValidationSchema(attributes);

    const form = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });
    const [generateQuery] = usePostGenerateMutation();

    async function generateHandler(data: FieldValues) {
        console.log('generate', data)
        const response = await generateQuery({
            generator: generator.id,
            body: data,
        })
        handleResponseErrors(response, form);

        onComplete();
    }

    console.log(form)

    return (
        <>
            <FormProvider {...form}>
                <Box component="form"
                     onReset={form.reset}
                     onSubmit={form.handleSubmit(generateHandler)}
                     my={2}
                >
                    {Object.entries(attributes).map(([attributeName, attribute], index) => {
                        return (<React.Fragment key={index}>
                            <Typography>
                                {attributeName}:
                            </Typography>
                            <Box mb={1}>
                                <FormInput
                                    attributeName={attributeName}
                                    attribute={attribute}
                                />
                            </Box>
                        </React.Fragment>)
                    })}
                    <Box my={2}>
                        <ButtonGroup>
                            <Button type="submit" name="generate">Generate</Button>
                            <Button type="reset" color="warning">Reset</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            </FormProvider>
        </>
    );
}