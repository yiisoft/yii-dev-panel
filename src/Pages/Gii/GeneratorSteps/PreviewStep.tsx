import {usePostPreviewMutation} from "../../../API/Gii";
import {createYupValidationSchema} from "../../../Adapter/yup/yii.validator";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import {FormInput} from "../FormInput";
import {StepProps} from "./Step.types";
import {mapErrorsToForm} from "./errorMapper";
import {Context} from "../Stepper/Context/Context";

export function PreviewStep({generator, onComplete}: StepProps) {
    const attributes = generator.attributes;
    const validationSchema = createYupValidationSchema(attributes);
    const context = useContext(Context);

    const form = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });
    const [previewQuery] = usePostPreviewMutation();

    async function previewHandler(data: FieldValues) {
        console.log('preview', data)
        const response = await previewQuery({
            generator: generator.id,
            parameters: data,
        })
        console.log(response)
        if ('error' in response) {
            mapErrorsToForm(response, form);
            return;
        }

        // TODO: fix types
        // @ts-ignore
        context.setFiles(response.data.files);
        // @ts-ignore
        context.setParameters(data);
        // @ts-ignore
        context.setOperations(response.data.operations);
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
                                {attribute.label || attributeName}:
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
                            <Button type="submit" name="preview" variant="contained">Preview</Button>
                            <Button type="reset" color="warning">Reset</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            </FormProvider>
        </>
    );
}