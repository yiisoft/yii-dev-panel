import {usePostPreviewMutation} from "../../../API/Gii";
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
        console.error(errorsMap)

        for (let attribute in errorsMap) {
            const errors = errorsMap[attribute];
            form.setError(attribute, {message: errors.join(' ')})
        }
    }
}

export function PreviewStep({generator, onComplete}: StepProps) {
    const attributes = generator.attributes;
    const validationSchema = createYupValidationSchema(attributes);

    const form = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });
    const [previewQuery] = usePostPreviewMutation();

    async function previewHandler(data: FieldValues) {
        console.log('preview', data)
        const response = await previewQuery({
            generator: generator.id,
            body: data,
        })
        handleResponseErrors(response, form);

        onComplete();
    }

    // console.log(form)

    return (
        <>
            <FormProvider {...form}>
                <Box component="form"
                     onReset={form.reset}
                     onSubmit={form.handleSubmit(previewHandler)}
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
                            <Button type="submit" name="preview" color="secondary">Preview</Button>
                            <Button type="reset" color="warning">Reset</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            </FormProvider>
        </>
    );
}