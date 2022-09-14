import * as React from 'react';
import {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router";
import {Autocomplete, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material";
import {DebugEntry, useGetDebugQuery, useLazyGetCollectorInfoQuery} from "../../API/Debug";
import format from 'date-fns/format'
import {fromUnixTime} from "date-fns";
import {useDispatch} from "react-redux";
import {changeEntryAction, useDebugEntry} from "../../Provider/Debug/DebugEntryContext";
import {ErrorBoundary} from "react-error-boundary";
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {useSearchParams} from "react-router-dom";
import {LogPage} from "./LogPage";
import {DumpPage} from "./DumpPage";

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

export const DebugLayout = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const {data, isLoading, isSuccess} = useGetDebugQuery();
    const debugEntry = useDebugEntry();
    const [selectedEntry, setSelectedEntry] = useState<DebugEntry | null>(debugEntry);
    const navigate = useNavigate();

    const [collectorInfo, collectorQueryInfo] = useLazyGetCollectorInfoQuery()

    console.log('c', collectorQueryInfo)

    useEffect(() => {
        if (isSuccess && data && data.length && !selectedEntry) {
            const entry = data[0];
            setSelectedEntry(entry);
            dispatch(changeEntryAction(entry))
        }
    }, [isSuccess])

    useEffect(() => {
        collectorInfo({
            id: debugEntry!.id,
            collector: searchParams.get('collector') || ''
        });
    }, [searchParams.get('collector')])

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

    const pages = {
        'Yiisoft\\Yii\\Debug\\Collector\\LogCollector': (data: any) => <LogPage data={data}/>,
        'default': (data: any) => <DumpPage data={data}/>,
    }

    return (
        <>
            <h2>{'Debug'}</h2>
            <Autocomplete
                freeSolo
                value={selectedEntry}
                options={data as DebugEntry[]}
                getOptionLabel={getOptions}
                renderInput={(params) => <TextField {...params} label="Record"/>}
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
                    <ErrorBoundary fallback={<>An error was occurred</>} resetKeys={[location.pathname, selectedEntry]}>
                        {(!searchParams.has('collector') || searchParams.get('collector') === '')
                            ? <Outlet/>
                            : (
                                collectorQueryInfo.isLoading
                                    ? <>Loading..</>
                                    : (
                                        !!collectorQueryInfo.currentData
                                            // @ts-ignore
                                            ? (pages[searchParams.get('collector')] ?? pages['default'])(collectorQueryInfo.currentData)
                                            : <>Unknown error...</>
                                    )
                            )
                        }
                    </ErrorBoundary>
                </Grid>
            </Grid>
        </>
    );
};
