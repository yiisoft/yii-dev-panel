import {
    Box,
    Button,
    ButtonGroup,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import * as React from "react";
import {useContext, useMemo, useState} from "react";
import {StepProps} from "./Step.types";
import {Context, GiiFile} from "../Stepper/Context/Context";
import {FieldValues, FormProvider, useForm, useFormContext} from "react-hook-form";
import {mapErrorsToForm} from "./errorMapper";
import {usePostGenerateMutation} from "../../../API/Gii";
import {yup} from "../../../Adapter/yup";
import {FilePreviewDialog} from "../FilePreviewDialog";

function createValidationSchema(files: GiiFile[]) {
    const rulesSet: Record<string, any> = {};
    files.map(({id}, index) => {
        rulesSet[id] = yup.number().required().oneOf([5, 6, 7])
    });

    return yup.object(rulesSet)
}

function FileAction({file}: { file: GiiFile }) {
    const context = useContext(Context);
    const form = useFormContext();
    const [value, setValue] = useState(form.getValues(file.id))
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ListItem>
                <ListItemText primary={file.relativePath}/>
                <ListItemSecondaryAction>
                    <Box mr={2} display='inline-block'>
                        <Button size='large' variant="contained" onClick={handleClickOpen}>Preview</Button>
                    </Box>
                    <ToggleButtonGroup
                        value={value}
                        exclusive
                        onChange={(_, value) => {
                            setValue(value)
                            form.setValue(file.id, value)
                        }}
                    >
                        {Object.entries(context.operations).map(([index, operation]) => (
                            <ToggleButton key={index} value={index}>
                                {operation}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </ListItemSecondaryAction>
            </ListItem>
            <FilePreviewDialog
                file={file}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export function GenerateStep({generator, onComplete}: StepProps) {
    const context = useContext(Context);
    // TODO: add validation
    // const validationSchema = createValidationSchema(context.files);

    console.log('context', context)
    const defaultValues = useMemo(() => {
        return Object.fromEntries(context.files.map(file => [file.id, String(file.operation)]));
    }, [context.files])

    const form = useForm({
        // mode: "onBlur",
        // resolver: yupResolver(validationSchema),
        defaultValues: defaultValues
    });
    const [generateQuery] = usePostGenerateMutation();

    async function generateHandler(data: FieldValues) {
        console.log('generate', data, context.parameters)
        const response = await generateQuery({
            generator: generator.id,
            parameters: context.parameters,
            answers: data,
        })
        if ('error' in response) {
            console.log(response)
            mapErrorsToForm(response, form);
        } else {
            onComplete();
        }
    }

    console.log(form)

    return (
        <>
            {/*{context.files.map((file, index) => <FilePreview key={index} file={file}/>)}*/}
            <FormProvider {...form}>
                <Box component="form"
                     onReset={form.reset as any}
                     onSubmit={form.handleSubmit(generateHandler)}
                     my={2}
                >
                    <List subheader={<ListSubheader>Operations</ListSubheader>}>
                        {context.files.map((file, index) => <FileAction key={index} file={file}/>)}
                    </List>

                    <Box my={2}>
                        <ButtonGroup>
                            <Button type="submit" name="generate" variant="contained">Generate</Button>
                            <Button type="reset" color="warning">Reset</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            </FormProvider>
        </>
    );
}