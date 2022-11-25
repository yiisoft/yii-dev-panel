import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import {Outlet, useLocation} from 'react-router';
import {
    Alert,
    AlertTitle,
    Autocomplete,
    Box,
    Breadcrumbs,
    LinearProgress,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import {DebugEntry, useGetDebugQuery, useLazyGetCollectorInfoQuery} from '../API/Debug';
import format from 'date-fns/format';
import {fromUnixTime} from 'date-fns';
import {useDispatch} from 'react-redux';
import {changeEntryAction, useDebugEntry} from '../Context/Context';
import {ErrorBoundary} from 'react-error-boundary';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {useSearchParams} from 'react-router-dom';
import {LogPanel} from './LogPanel';
import {DumpPage} from './DumpPage';
import {ErrorFallback} from '../../../Component/ErrorFallback';
import {MiddlewareTimeline} from '../Component/Timeline/MiddlewareTimeline';
import {FullScreenCircularProgress} from '../../../Component/FullScreenCircularProgress';
import {LinkProps, MenuPanel} from '../../../Component/MenuPanel';
import {InfoBox} from '../../../Component/InfoBox';
import {HelpOutline} from '@mui/icons-material';

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
    return isDebugEntryAboutWeb(entry) ? 'web' : isDebugEntryAboutConsole(entry) ? 'console' : 'unknown';
}

function parseCollectorName(text: string) {
    return text.replace('Yiisoft\\Yii\\Debug\\Collector\\', '');
}

type CollectorDataProps = {
    collectorData: any;
    selectedCollector: string;
};

function CollectorData({collectorData, selectedCollector}: CollectorDataProps) {
    const pages = {
        'Yiisoft\\Yii\\Debug\\Collector\\LogCollector': (data: any) => <LogPanel data={data} />,
        'Yiisoft\\Yii\\Debug\\Collector\\MiddlewareCollector': (data: any) => <MiddlewareTimeline {...data} />,
        default: (data: any) => <DumpPage data={data} />,
    };

    if (selectedCollector === '') {
        return <Outlet />;
    }

    // @ts-ignore
    return (pages[selectedCollector] ?? pages['default'])(collectorData);
}

function HttpRequestError({error}: {error: any}) {
    console.error(error);
    return (
        <Box m={2}>
            <Alert severity="error">
                <AlertTitle>Something went wrong:</AlertTitle>
                <pre>{error?.toString() || 'unknown'}</pre>
            </Alert>
        </Box>
    );
}

export const Layout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const {data, isLoading, isSuccess} = useGetDebugQuery();
    const debugEntry = useDebugEntry();
    const [selectedEntry, setSelectedEntry] = useState<DebugEntry | null>(debugEntry);
    const [selectedCollector, setSelectedCollector] = useState<string>(searchParams.get('collector') || '');
    const [collectorData, setCollectorData] = useState<any>(undefined);

    const [collectorInfo, collectorQueryInfo] = useLazyGetCollectorInfoQuery();

    useEffect(() => {
        if (isSuccess && data && data.length && !selectedEntry) {
            const entry = data[0];
            setSelectedEntry(entry);
            dispatch(changeEntryAction(entry));
        }
    }, [isSuccess, data, dispatch, selectedEntry]);

    useEffect(() => {
        const collector = searchParams.get('collector') || '';
        if (collector.trim() === '') {
            setSelectedCollector('');
            setCollectorData(null);
            return;
        }
        if (!debugEntry) {
            return;
        }
        collectorInfo({
            id: debugEntry!.id,
            collector,
        }).then(({data, isError}) => {
            if (isError) {
                setSelectedEntry(null);
                dispatch(changeEntryAction(null));
            } else {
                setSelectedCollector(collector);
                setCollectorData(data);
            }
        });
    }, [searchParams, debugEntry]);

    function getOptions(entry: any) {
        if (isDebugEntryAboutConsole(entry)) {
            return [
                '[' + getEntryTarget(debugEntry) + ']',
                formatDate(entry.console.request.startTime),
                entry.command.input,
            ].join(' ');
        }
        if (isDebugEntryAboutWeb(entry)) {
            return [
                '[' + getEntryTarget(debugEntry) + ']',
                formatDate(entry.web.request.startTime),
                entry.request.method,
                entry.request.path,
            ].join(' ');
        }
        return entry.id;
    }

    const collectorName = selectedCollector.split('\\').pop();

    const links: LinkProps[] = useMemo(() => {
        if (!debugEntry) {
            return [];
        }
        return debugEntry.collectors.map((collector, index) => ({
            text: parseCollectorName(collector),
            href: '/debug/?collector=' + collector,
            icon: index % 2 === 0 ? <InboxIcon /> : <MailIcon />,
        }));
    }, [debugEntry]);

    if (isLoading) {
        console.log('loading');
        return <FullScreenCircularProgress />;
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{my: 2}}>
                <Link underline="hover" color="inherit" href="/debug">
                    Debug
                </Link>
                {!!collectorName && <Typography color="text.primary">{collectorName}</Typography>}
            </Breadcrumbs>
            <Autocomplete
                freeSolo
                value={selectedEntry}
                options={(data || []) as DebugEntry[]}
                getOptionLabel={getOptions}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {getOptions(option)}
                    </li>
                )}
                renderInput={(params) => <TextField {...params} key={params.id} label="Record" />}
                onChange={(event, value) => {
                    if (typeof value === 'object') {
                        setSelectedEntry(value);
                        dispatch(changeEntryAction(value));
                    }
                }}
                sx={{my: 1}}
            />

            <MenuPanel links={links} open={!selectedCollector} activeLink={collectorName}>
                {selectedCollector ? (
                    <>
                        {collectorQueryInfo.isFetching && <LinearProgress />}
                        {collectorQueryInfo.isError && (
                            <HttpRequestError
                                error={(collectorQueryInfo.error as any)?.error || (collectorQueryInfo.error as any)}
                            />
                        )}
                        {collectorQueryInfo.isSuccess && (
                            <ErrorBoundary
                                FallbackComponent={ErrorFallback}
                                resetKeys={[location.pathname, location.search, selectedEntry]}
                            >
                                <CollectorData selectedCollector={selectedCollector} collectorData={collectorData} />
                            </ErrorBoundary>
                        )}
                    </>
                ) : (
                    <InfoBox
                        title="No one collector is chosen"
                        text="Select a collector from the left side panel to see more options"
                        severity="info"
                        icon={<HelpOutline />}
                    />
                )}
            </MenuPanel>
        </>
    );
};
