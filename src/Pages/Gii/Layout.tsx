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

function FormInput({type, attributeName, attribute}: FormInputProps) {
    const form = useFormContext();
    if (type === 'text') {
        return <Controller
            name={attributeName}
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
            defaultValue={Array.isArray(attribute.defaultValue) ? attribute.defaultValue : []}
            name={attributeName}
            render={({field: {onChange, value},}) => (
                <>
                    <Autocomplete
                        multiple
                        onChange={(event, item) => {
                            console.log(event, item)
                            onChange(item);
                        }}
                        value={value}
                        freeSolo={true}
                        options={[]}
                        renderInput={(params) => (
                            <TextField {...params} name={attributeName} label={attribute.label}/>
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
    const form = useForm();
    const [previewQuery, previewQueryInfo] = usePostPreviewMutation();
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
        console.log(res)
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
