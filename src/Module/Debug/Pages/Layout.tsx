import * as React from 'react';
import {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router";
import {
    Alert,
    AlertTitle,
    Autocomplete,
    Box,
    Breadcrumbs,
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
import {DebugEntry, useGetDebugQuery, useLazyGetCollectorInfoQuery} from "../../../API/Debug";
import format from 'date-fns/format'
import {fromUnixTime} from "date-fns";
import {useDispatch} from "react-redux";
import {changeEntryAction, useDebugEntry} from "../../../Provider/Debug/DebugEntryContext";
import {ErrorBoundary} from "react-error-boundary";
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {useSearchParams} from "react-router-dom";
import {LogPage} from "./LogPage";
import {DumpPage} from "./DumpPage";
import {ErrorFallback} from "../../../Component/ErrorFallback";

function formatDate(unixTimeStamp: number) {
    return format(fromUnixTime(unixTimeStamp), 'do MMM hh:mm:ss');
}

function isDebugEntryAboutConsole(entry: any) {
    return 'console' in entry;
}

function isDebugEntryAboutWeb(entry: any) {
    return 'web' in entry;
}

function getEntryTarget(entry: any) {
    return isDebugEntryAboutWeb(entry)
        ? 'web'
        : (isDebugEntryAboutConsole(entry)
            ? 'console'
            : 'unknown');
}

function parseCollectorName(text: string) {
    return text.replace('Yiisoft\\Yii\\Debug\\Collector\\', '');
}

interface CollectorDataProps {
    collectorData: any
    selectedCollector: string
}

function CollectorData({collectorData, selectedCollector}: CollectorDataProps) {
    const pages = {
        'Yiisoft\\Yii\\Debug\\Collector\\LogCollector': (data: any) => <LogPage data={data}/>,
        'default': (data: any) => <DumpPage data={data}/>,
    }

    if (selectedCollector === '') {
        return <Outlet/>;
    }

    // @ts-ignore
    return (pages[selectedCollector] ?? pages['default'])(collectorData)
}

function HttpRequestError({error}: {error: any}) {
    return <Box m={2}>
        <Alert severity="error">
            <AlertTitle>Something went wrong:</AlertTitle>
            <pre>{error}</pre>
        </Alert>
    </Box>;
}

export const Layout = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const {data, isLoading, isSuccess} = useGetDebugQuery();
    const debugEntry = useDebugEntry();
    const [selectedEntry, setSelectedEntry] = useState<DebugEntry | null>(debugEntry);
    const navigate = useNavigate();

    const selectedCollector = searchParams.get('collector') || '';
    const collectorName = selectedCollector.split('\\').pop();
    const [collectorInfo, collectorQueryInfo] = useLazyGetCollectorInfoQuery()

    useEffect(() => {
        if (isSuccess && data && data.length && !selectedEntry) {
            const entry = data[0];
            setSelectedEntry(entry);
            dispatch(changeEntryAction(entry))
        }
    }, [isSuccess, data, dispatch, selectedEntry])

    useEffect(() => {
        if (selectedCollector !== '') {
            collectorInfo({
                id: debugEntry!.id,
                collector: selectedCollector
            });
        }
    }, [selectedCollector, collectorInfo, debugEntry])

    if (isLoading) {
        return <>Loading..</>
    }

    function getOptions(entry: any) {
        if (isDebugEntryAboutConsole(entry)) {
            return ['[' + getEntryTarget(debugEntry) + ']', formatDate(entry.console.request.startTime), entry.command.input].join(' ')
        }
        if (isDebugEntryAboutWeb(entry)) {
            return ['[' + getEntryTarget(debugEntry) + ']', formatDate(entry.web.request.startTime), entry.request.method, entry.request.path].join(' ')
        }
        return entry.id
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{my: 2}}>
                <Link underline="hover" color="inherit" href="/src/Module/Debug/Pages/Pages">
                    Debug
                </Link>
                {!!collectorName && <Typography color="text.primary">{collectorName}</Typography>}
            </Breadcrumbs>
            <Autocomplete
                freeSolo
                value={selectedEntry}
                options={(data || []) as DebugEntry[]}
                getOptionLabel={getOptions}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}>
                            {getOptions(option)}
                        </li>
                    );
                }}
                renderInput={(params) => <TextField {...params} key={params.id} label="Record"/>}
                onChange={(event, value) => {
                    if (typeof value === 'object') {
                        setSelectedEntry(value);
                        dispatch(changeEntryAction(value));
                    }
                }}
                sx={{my: 1}}
            />
            <Grid container>
                <Grid item xs={3}>
                    <List>
                        {debugEntry && debugEntry.collectors.map((text, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => navigate('?collector=' + text)}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                    </ListItemIcon>
                                    <ListItemText>
                                        {parseCollectorName(text)}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.pathname, selectedEntry]}>
                        {collectorQueryInfo.isLoading && <>Loading...</>}
                        {collectorQueryInfo.isError && <HttpRequestError error={(collectorQueryInfo.error as any)?.error}/> }
                        {collectorQueryInfo.isSuccess && <CollectorData selectedCollector={selectedCollector} collectorData={collectorQueryInfo.currentData} />}
                    </ErrorBoundary>
                </Grid>
            </Grid>
        </>
    );
};
