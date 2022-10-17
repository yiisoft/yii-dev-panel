import * as React from 'react';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router";
import {
    Autocomplete,
    Box,
    Breadcrumbs,
    Button,
    ButtonGroup,
    FormHelperText,
    Grid,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {ErrorBoundary} from "react-error-boundary";
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {useSearchParams} from "react-router-dom";
import {ErrorFallback} from "../../Component/ErrorFallback";
import {
    GiiGenerator,
    GiiGeneratorAttribute,
    GiiGeneratorAttributeRule,
    useGetGeneratorsQuery,
    usePostGenerateMutation,
    usePostPreviewMutation
} from "../../API/Gii";
import {Controller, FieldValues, FormProvider, useForm, useFormContext} from "react-hook-form";
import {RegisterOptions} from "react-hook-form/dist/types/validator";

function matchInputType(rules: GiiGeneratorAttributeRule[]) {
    let possibleType = 'text';
    for (let rule of rules) {
        if (rule[0] === 'each') {
            possibleType = 'select';
            break;
        }
        if (rule[0] === 'number') {
            possibleType = 'number';
            break;
        }
    }
    return possibleType;
}

type FormInputProps = {
    type: string,
    attributeName: string,
    attribute: GiiGeneratorAttribute
};

function createValidationRules(rules: GiiGeneratorAttributeRule[]) {
    let result: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> = {};
    for (let rule of rules) {
        switch (rule[0]) {
            case 'required':
                result.required = {
                    value: true,
                    message: rule.message,
                }
                break;
            case 'each':
                // result = {...result, ...createValidationRules(rule.rules)}
                result.validate = function (value) {
                    console.log('validating', 'value', value)

                    return true
                }
                break;
            case 'regex':
                const originalPattern = rule.pattern as string;
                const lastSlashPosition = originalPattern.lastIndexOf('/');

                const flags = originalPattern.slice(lastSlashPosition + 1);
                const regex = originalPattern
                    .slice(0, lastSlashPosition - originalPattern.length)
                    .slice(1)
                // console.log(
                //     'orig', originalPattern,
                //     'new', regex,
                //     'flags', flags
                // )
                result.pattern = {
                    value: new RegExp(regex, flags),
                    message: rule.message.message,
                }
                break;
        }
    }
    return result;
}

function FormInput({type, attributeName, attribute}: FormInputProps) {
    const form = useFormContext();
    const rules = createValidationRules(attribute.rules);
    console.log(
        'attribute name', attributeName,
        'rules', rules,
        'attribute', attribute.defaultValue,
    )
    if (type === 'text') {
        return <Controller
            name={attributeName}
            rules={rules}
            defaultValue={String(attribute.defaultValue ?? '')}
            control={form.control}
            render={({field, fieldState: {error}}) => (
                <>
                    <TextField
                        {...field}
                        placeholder={String(attribute.defaultValue ?? '')}
                        label={attribute.label}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                    {!!attribute.hint && <FormHelperText>{attribute.hint}</FormHelperText>}
                </>
            )}
        />
    }

    if (type === 'select') {
        return <Controller
            control={form.control}
            rules={rules}
            defaultValue={Array.isArray(attribute.defaultValue) ? attribute.defaultValue : []}
            name={attributeName}
            render={({field: {value, onChange, onBlur, ref}, fieldState: {error}}) => (
                <>
                    <Autocomplete
                        value={value}
                        onChange={(_, items) => onChange(items)}
                        multiple
                        filterSelectedOptions
                        filterOptions={(v) => v}
                        freeSolo={true}
                        options={[]}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                ref={ref}
                                onBlur={() => {
                                    onBlur()
                                }}
                                name={attributeName}
                                helperText={error ? error.message : null}
                                error={!!error}
                                label={attribute.label}
                            />
                        )}
                    />
                    <FormHelperText>{attribute.hint}</FormHelperText>
                </>
            )}
        />
    }
    return null
}

function GeneratorForm({generator}: { generator: GiiGenerator }) {
    const attributes = generator.attributes;
    const form = useForm({
        mode: "onBlur",
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
                                    type={matchInputType(attribute.rules)}
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

export const Layout = () => {
    const [selectedGenerator, setSelectedGenerator] = useState<GiiGenerator | null>(null)
    const [searchParams] = useSearchParams()
    const location = useLocation();
    const navigate = useNavigate();

    const selectedGeneratorId = searchParams.get('generator') || '';
    const {data, isLoading} = useGetGeneratorsQuery();
    const generators = data || [];

    useEffect(() => {
        const selectedGenerator = generators.find(v => v.id === selectedGeneratorId) || null;
        setSelectedGenerator(selectedGenerator);
    }, [selectedGeneratorId, data])

    if (isLoading) {
        return <>Loading..</>
    }

    console.log(selectedGenerator)

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{my: 2}}>
                <Link underline="hover" color="inherit" href="/gii">
                    Gii
                </Link>
                {!!selectedGenerator && <Typography color="text.primary">{selectedGenerator.name}</Typography>}
            </Breadcrumbs>
            <Grid container>
                <Grid item xs={3}>
                    <List>
                        {generators.map((generator, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => navigate('?generator=' + generator.id)}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                    </ListItemIcon>
                                    <ListItemText>
                                        {generator.name}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.pathname]}>
                        {!!selectedGenerator && <GeneratorForm generator={selectedGenerator}/>}
                        {/*{!!selectedGenerator &&*/}
                        {/*    <JsonRenderer key={selectedGenerator?.id} value={selectedGenerator}/>}*/}
                        {!selectedGenerator && (
                            <>
                                Select a generator to see more options
                            </>
                        )}
                    </ErrorBoundary>
                </Grid>
            </Grid>
        </>
    );
};
