import * as React from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Outlet} from 'react-router';
import {
    Alert,
    AlertTitle,
    Autocomplete,
    Box,
    Breadcrumbs,
    Button,
    CircularProgress,
    LinearProgress,
    Link,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import {DebugEntry, useLazyGetCollectorInfoQuery, useLazyGetDebugQuery} from '../API/Debug';
import format from 'date-fns/format';
import {fromUnixTime} from 'date-fns';
import {useDispatch} from 'react-redux';
import {changeEntryAction, useDebugEntry} from '../Context/Context';
import {ErrorBoundary} from 'react-error-boundary';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {useSearchParams} from 'react-router-dom';
import {DumpPage} from './DumpPage';
import {ErrorFallback} from '../../../Component/ErrorFallback';
import {FullScreenCircularProgress} from '../../../Component/FullScreenCircularProgress';
import {LinkProps, MenuPanel} from '../../../Component/MenuPanel';
import {InfoBox} from '../../../Component/InfoBox';
import {Check, EmojiObjects, Error, HelpOutline, Refresh} from '@mui/icons-material';
import {useDoRequestMutation} from '../../Inspector/API/Inspector';
import {MiddlewarePanel} from '../Component/Panel/MiddlewarePanel';
import {EventPanel} from '../Component/Panel/EventPanel';
import {LogPanel} from '../Component/Panel/LogPanel';

function formatDate(unixTimeStamp: number) {
    return format(fromUnixTime(unixTimeStamp), 'do MMM hh:mm:ss');
}

function isDebugEntryAboutConsole(entry: any) {
    return entry && 'console' in entry;
}

function isDebugEntryAboutWeb(entry: any) {
    return entry && 'web' in entry;
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
        'Yiisoft\\Yii\\Debug\\Collector\\MiddlewareCollector': (data: any) => <MiddlewarePanel {...data} />,
        'Yiisoft\\Yii\\Debug\\Collector\\EventCollector': (data: any) => <EventPanel events={data} />,
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

type DebugEntryAutocompleteProps = {
    data: DebugEntry[] | undefined;
    onChange: (data: DebugEntry | null) => void;
};
const DebugEntryAutocomplete = ({data, onChange}: DebugEntryAutocompleteProps) => {
    const debugEntry = useDebugEntry();

    const getOptions = useCallback(
        (entry: any) => {
            if (isDebugEntryAboutConsole(entry)) {
                return [
                    '[' + getEntryTarget(entry) + ']',
                    formatDate(entry.console.request.startTime),
                    entry.command.input,
                ].join(' ');
            }
            if (isDebugEntryAboutWeb(entry)) {
                return [
                    '[' + getEntryTarget(entry) + ']',
                    formatDate(entry.web.request.startTime),
                    entry.request.method,
                    entry.request.path,
                ].join(' ');
            }
            return entry.id;
        },
        [debugEntry],
    );

    return (
        <Autocomplete
            freeSolo
            value={debugEntry}
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
                    onChange(value);
                } else {
                    onChange(null);
                }
            }}
            sx={{my: 1}}
        />
    );
};

const Layout = () => {
    const dispatch = useDispatch();
    const debugEntry = useDebugEntry();
    const [searchParams, setSearchParams] = useSearchParams();
    const [getDebugQuery, getDebugQueryInfo] = useLazyGetDebugQuery();
    const [selectedCollector, setSelectedCollector] = useState<string>(searchParams.get('collector') || '');
    const [collectorData, setCollectorData] = useState<any>(undefined);
    const [collectorInfo, collectorQueryInfo] = useLazyGetCollectorInfoQuery();

    useEffect(() => {
        getDebugQuery();
    }, []);

    useEffect(() => {
        if (getDebugQueryInfo.isSuccess && getDebugQueryInfo.data && getDebugQueryInfo.data.length) {
            let entry;
            if (searchParams.has('debugEntry')) {
                entry = getDebugQueryInfo.data.find((entry) => entry.id === searchParams.get('debugEntry'));
            }
            changeEntry(entry ?? getDebugQueryInfo.data[0]);
        }
    }, [getDebugQueryInfo.isSuccess, getDebugQueryInfo.data, dispatch]);

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
        collectorInfo({id: debugEntry.id, collector}).then(({data, isError}) => {
            if (isError) {
                changeEntry(null);
                return;
            }
            setSelectedCollector(collector);
            setCollectorData(data);
        });
    }, [searchParams, debugEntry]);
    const changeEntry = (entry: DebugEntry | null) => {
        if (entry) {
            dispatch(changeEntryAction(entry));
            setSearchParams((prev) => {
                prev.append('debugEntry', entry.id);
                return prev;
            });
            return;
        }
        dispatch(changeEntryAction(null));
        setSearchParams((prev) => {
            prev.delete('debugEntry');
            return prev;
        });
    };
    const collectorName = useMemo(() => selectedCollector.split('\\').pop(), [selectedCollector]);

    const links: LinkProps[] = useMemo(
        () =>
            !debugEntry
                ? []
                : debugEntry.collectors.map((collector, index) => ({
                      text: parseCollectorName(collector),
                      href: `/debug/?collector=${collector}&debugEntry=${debugEntry.id}`,
                      icon: index % 2 === 0 ? <InboxIcon /> : <MailIcon />,
                  })),
        [debugEntry],
    );

    const [doRequest, doRequestInfo] = useDoRequestMutation();
    const repeatRequestHandler = useCallback(async () => {
        if (!debugEntry) {
            return;
        }
        try {
            await doRequest({id: debugEntry.id});
        } catch (e) {
            console.error(e);
        }
        getDebugQuery();
    }, [debugEntry]);
    const onEntryChangeHandler = useCallback(changeEntry, []);
    const onRefreshHandler = useCallback(() => {
        getDebugQuery();
    }, []);

    if (getDebugQueryInfo.isLoading) {
        return <FullScreenCircularProgress />;
    }

    if (getDebugQueryInfo.data && getDebugQueryInfo.data.length === 0) {
        return (
            <InfoBox
                title="No debug entries found"
                text={
                    <>
                        <Typography>Make sure you have enabled debugger and run your application.</Typography>
                        <Typography>
                            Check the "yiisoft/yii-debug" in the "params.php" on the backend or with{' '}
                            <Link href="/inspector/parameters?filter=yiisoft/yii-debug">Inspector</Link>.
                        </Typography>
                        <Typography>
                            See more information on the link{' '}
                            <Link target="_blank" href="https://github.com/yiisoft/yii-debug">
                                https://github.com/yiisoft/yii-debug
                            </Link>
                            .
                        </Typography>
                    </>
                }
                severity="info"
                icon={<EmojiObjects />}
            />
        );
    }

    return (
        <>
            <Breadcrumbs sx={{my: 2}}>
                <Link underline="hover" color="inherit" href="/debug">
                    Debug
                </Link>
                {!!collectorName && <Typography color="text.primary">{collectorName}</Typography>}
            </Breadcrumbs>
            <Stack direction="row" spacing={2}>
                <Tooltip title="Refresh the list" sx={{margin: '0 auto'}}>
                    <span>
                        <Button
                            onClick={onRefreshHandler}
                            disabled={getDebugQueryInfo.isFetching}
                            startIcon={<Refresh />}
                            endIcon={getDebugQueryInfo.isFetching ? <CircularProgress size={24} color="info" /> : null}
                        >
                            Refresh
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="Runs the request again" sx={{flex: '1'}}>
                    <span>
                        <Button
                            onClick={repeatRequestHandler}
                            disabled={!debugEntry || doRequestInfo.isLoading || getDebugQueryInfo.isFetching}
                            endIcon={
                                doRequestInfo.isLoading ? (
                                    <CircularProgress size={24} color="info" />
                                ) : doRequestInfo.isUninitialized ? null : doRequestInfo.isSuccess ? (
                                    <Check color="success" />
                                ) : (
                                    <Error color="error" />
                                )
                            }
                        >
                            Repeat Request
                        </Button>
                    </span>
                </Tooltip>
            </Stack>

            <DebugEntryAutocomplete data={getDebugQueryInfo.data} onChange={onEntryChangeHandler} />
            {links.length === 0 ? (
                <InfoBox
                    title="Collectors are empty"
                    text="Looks like debugger was inactive or it did not have any active collectors during the request"
                    severity="info"
                    icon={<HelpOutline />}
                />
            ) : (
                <MenuPanel links={links} open={!selectedCollector} activeLink={collectorName}>
                    {selectedCollector ? (
                        <>
                            {collectorQueryInfo.isFetching && <LinearProgress />}
                            {collectorQueryInfo.isError && (
                                <HttpRequestError
                                    error={
                                        (collectorQueryInfo.error as any)?.error || (collectorQueryInfo.error as any)
                                    }
                                />
                            )}
                            {collectorQueryInfo.isSuccess && (
                                <ErrorBoundary
                                    FallbackComponent={ErrorFallback}
                                    resetKeys={[window.location.pathname, window.location.search, debugEntry]}
                                >
                                    <CollectorData
                                        selectedCollector={selectedCollector}
                                        collectorData={collectorData}
                                    />
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
            )}
        </>
    );
};
export {Layout};
