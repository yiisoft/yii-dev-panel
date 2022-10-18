import {GiiGenerator, usePostGenerateMutation, usePostPreviewMutation} from "../../API/Gii";
import {createYupValidationSchema} from "../../Adapter/yup/yii.validator";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import * as React from "react";
import {FormInput} from "./FormInput";

export function GeneratorForm({generator}: { generator: GiiGenerator }) {
    const attributes = generator.attributes;
    const validationSchema = createYupValidationSchema(attributes);

    const form = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });
    const [previewQuery] = usePostPreviewMutation();
    const [generateQuery] = usePostGenerateMutation();

    async function previewHandler(data: FieldValues) {
        console.log('preview', data)
        const res = await previewQuery({
            generator: generator.id,
            body: data,
        })
        // @ts-ignore
        const errorsMap = res.error.data.errors as Record<string, string[]>;
        console.log(errorsMap)

        for (let attribute in errorsMap) {
            const errors = errorsMap[attribute];
            form.setError(attribute, {message: errors.join(' ')})
        }
    }

    async function generateHandler(data: FieldValues) {
        console.log('generate', data)
        const res = await generateQuery({
            generator: generator.id,
            body: data,
        })
        // @ts-ignore
        const errorsMap = res.error.data.errors as Record<string, string[]>;
        console.log(errorsMap)

        for (let attribute in errorsMap) {
            const errors = errorsMap[attribute];
            form.setError(attribute, {message: errors.join(' ')})
        }
    }

    console.log(form)

    return (
        <>
            <FormProvider {...form}>
                <Box component="form"
                     onReset={form.reset}
                     onSubmit={(e) => {
                         // @ts-ignore
                         const buttonName = e.nativeEvent.submitter.name;
                         if (buttonName === 'preview') {
                             form.handleSubmit(previewHandler)(e)
                         } else {
                             form.handleSubmit(generateHandler)(e)
                         }
                     }}
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
                            <Button type="submit" name="generate">Generate</Button>
                            <Button type="reset" color="warning">Reset</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            </FormProvider>
        </>
    );
}