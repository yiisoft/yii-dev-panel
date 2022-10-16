import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router";
import {
    Autocomplete,
    Box,
    Breadcrumbs,
    Button,
    FormControl,
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
import {GiiGenerator, GiiGeneratorAttribute, GiiGeneratorAttributeRule, useGetGeneratorsQuery} from "../../API/Gii";

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

function renderInput(type: string, attributeName: string, attribute: GiiGeneratorAttribute) {
    if (type === 'text') {
        return <TextField
            helperText={attribute.hint}
            label={attribute.label}
            name={attributeName}
            defaultValue={attribute.defaultValue}
            placeholder={String(attribute.defaultValue)}
        />;
    }
    if (type === 'select') {
        return <FormControl sx={{m: 1, minWidth: 120}}>
            <Autocomplete
                multiple
                freeSolo={true}
                defaultValue={Array.isArray(attribute.defaultValue) ? attribute.defaultValue : []}
                options={[]}
                renderInput={(params) => (
                    <TextField {...params} name={attributeName} label={attribute.label}/>
                )}
            />
            <FormHelperText>{attribute.hint}</FormHelperText>
        </FormControl>
    }
    return null
}

function GeneratorForm({generator}: { generator: GiiGenerator }) {
    const attributes = generator.attributes;

    function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(event)
        const form = event.target;
    }

    return (
        <>
            <Box component="form" onSubmit={onSubmitHandler} my={2}>
                {Object.entries(attributes).map(([attributeName, attribute], index) => {
                    return (<React.Fragment key={index}>
                        <Typography>
                            {attributeName}:
                        </Typography>
                        <Box>
                        {
                            renderInput(matchInputType(attribute.rules), attributeName, attribute)
                        }
                        </Box>
                    </React.Fragment>)
                })}
                <Button type="submit">Submit</Button>
            </Box>
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
