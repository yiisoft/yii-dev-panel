import {ReactJSXElement} from '@emotion/react/types/jsx-namespace';
import {Check, EmojiObjects, Error, HelpOutline, Refresh} from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/Inbox';
import ListIcon from '@mui/icons-material/List';
import MailIcon from '@mui/icons-material/Mail';
import ReplayIcon from '@mui/icons-material/Replay';
import {
    Alert,
    AlertColor,
    AlertTitle,
    Autocomplete,
    Box,
    Breadcrumbs,
    Button,
    Chip,
    CircularProgress,
    LinearProgress,
    Link,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import {changeEntryAction, useDebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Context';
import {
    DebugEntry,
    useLazyGetCollectorInfoQuery,
    useLazyGetDebugQuery,
} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {ErrorFallback} from '@yiisoft/yii-dev-panel-sdk/Component/ErrorFallback';
import {FullScreenCircularProgress} from '@yiisoft/yii-dev-panel-sdk/Component/FullScreenCircularProgress';
import {InfoBox} from '@yiisoft/yii-dev-panel-sdk/Component/InfoBox';
import {LinkProps, MenuPanel} from '@yiisoft/yii-dev-panel-sdk/Component/MenuPanel';
import {Config} from '@yiisoft/yii-dev-panel-sdk/Config';
import {CollectorsMap} from '@yiisoft/yii-dev-panel-sdk/Helper/collectors';
import {getCollectedCountByCollector} from '@yiisoft/yii-dev-panel-sdk/Helper/collectorsTotal';
import {isDebugEntryAboutConsole, isDebugEntryAboutWeb} from '@yiisoft/yii-dev-panel-sdk/Helper/debugEntry';
import {formatDate} from '@yiisoft/yii-dev-panel-sdk/Helper/formatDate';
import ModuleLoader from '@yiisoft/yii-dev-panel/Application/Pages/RemoteComponent';
import {EventPanel} from '@yiisoft/yii-dev-panel/Module/Debug/Component/Panel/EventPanel';
import {ExceptionPanel} from '@yiisoft/yii-dev-panel/Module/Debug/Component/Panel/ExceptionPanel';
import {LogPanel} from '@yiisoft/yii-dev-panel/Module/Debug/Component/Panel/LogPanel';
import {MiddlewarePanel} from '@yiisoft/yii-dev-panel/Module/Debug/Component/Panel/MiddlewarePanel';
import {DumpPage} from '@yiisoft/yii-dev-panel/Module/Debug/Pages/DumpPage';
import {useDoRequestMutation} from '@yiisoft/yii-dev-panel/Module/Inspector/API/Inspector';
import * as React from 'react';
import {HTMLAttributes, useCallback, useEffect, useMemo, useState} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useDispatch} from 'react-redux';
import {Outlet} from 'react-router';
import {useSearchParams} from 'react-router-dom';

function parseCollectorName(text: string) {
    return text
        .replace('Yiisoft\\Yii\\Debug\\Collector\\Web\\', '')
        .replace('Yiisoft\\Yii\\Debug\\Collector\\Console\\', '')
        .replace('Yiisoft\\Yii\\Debug\\Collector\\Database\\', '')
        .replace('Yiisoft\\Yii\\Debug\\Collector\\Queue\\', '')
        .replace('Yiisoft\\Yii\\Debug\\Collector\\Stream\\', '')
        .replace('Yiisoft\\Yii\\Debug\\Collector\\', '');
}

type CollectorDataProps = {
    collectorData: any;
    selectedCollector: string;
};
const backendUrl = Config.backendUrl;

function CollectorData({collectorData, selectedCollector}: CollectorDataProps) {
    const pages: {[name: string]: (data: any) => JSX.Element} = {
        [CollectorsMap.LogCollector]: (data: any) => <LogPanel data={data} />,
        [CollectorsMap.MiddlewareCollector]: (data: any) => <MiddlewarePanel {...data} />,
        [CollectorsMap.EventCollector]: (data: any) => <EventPanel events={data} />,
        [CollectorsMap.ExceptionCollector]: (data: any) => <ExceptionPanel exceptions={data} />,
        default: (data: any) => {
            if (typeof data === 'object' && data.__isPanelRemote__) {
                return (
                    <React.Suspense fallback={`Loading`}>
                        <ModuleLoader
                            url={backendUrl + data.url}
                            module={data.module}
                            scope={data.scope}
                            props={{data: data.data}}
                        />
                    </React.Suspense>
                );
            }
            if (typeof data === 'string') {
                try {
                    JSON.parse(data);
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        return <Box dangerouslySetInnerHTML={{__html: data}} />;
                    }
                    console.error(e);
                }
            }
            return <DumpPage data={data} />;
        },
    };

    if (selectedCollector === '') {
        return <Outlet />;
    }

    const renderPage = selectedCollector in pages ? pages[selectedCollector] : pages.default;

    return renderPage(collectorData);
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
const buttonColor = (status: number): AlertColor => {
    switch (true) {
        case status >= 400:
            return 'error';
        case status >= 300:
            return 'warning';
        case status >= 200:
            return 'success';
    }
    return 'info';
};

type DebugEntryAutocompleteProps = {
    data: DebugEntry[] | undefined;
    onChange: (data: DebugEntry | null) => void;
};
const DebugEntryAutocomplete = ({data, onChange}: DebugEntryAutocompleteProps) => {
    const debugEntry = useDebugEntry();

    const renderLabel = useCallback((entry: DebugEntry): string => {
        if (isDebugEntryAboutConsole(entry)) {
            return [entry.command.exitCode === 0 ? '[OK]' : '[ERROR]', entry.command.input].join(' ');
        }
        if (isDebugEntryAboutWeb(entry)) {
            return ['[' + entry.response.statusCode + ']', entry.request.method, entry.request.path].join(' ');
        }
        return entry.id;
    }, []);
    const renderOptions = useCallback(
        (props: HTMLAttributes<HTMLElement>, entry: DebugEntry): ReactJSXElement => (
            <Stack
                {...props}
                key={entry.id}
                component="li"
                direction="row"
                spacing={2}
                sx={{'& > img': {mr: 2, flexShrink: 0}}}
            >
                {isDebugEntryAboutWeb(entry) && (
                    <>
                        <Typography component="span" sx={{flex: 1}}>
                            <Chip
                                sx={{borderRadius: '5px 5px', margin: '0 2px'}}
                                label={`${entry.response.statusCode} ${entry.request.method}`}
                                color={buttonColor(entry.response.statusCode)}
                            />
                            <span style={{margin: '0 2px'}}>{entry.request.path}</span>
                        </Typography>
                        <Typography component="span" sx={{margin: '0 auto'}}>
                            <span>{formatDate(entry.web.request.startTime)}</span>
                        </Typography>
                    </>
                )}
                {isDebugEntryAboutConsole(entry) && (
                    <>
                        <Typography component="span" sx={{flex: 1}}>
                            {entry.command.exitCode === 0 ? (
                                <Chip label="OK" color={'success'} sx={{borderRadius: '5px 5px', margin: '0 2px'}} />
                            ) : (
                                <Chip
                                    label={`CODE: ${entry.command.exitCode}`}
                                    color={'error'}
                                    sx={{borderRadius: '5px 5px', margin: '0 2px'}}
                                />
                            )}
                            <span style={{margin: '0 2px'}}>{entry.command.input}</span>
                        </Typography>
                        <Typography component="span" sx={{margin: '0 auto'}}>
                            <span>{formatDate(entry.console.request.startTime)}</span>
                        </Typography>
                    </>
                )}
            </Stack>
        ),
        [],
    );

    return (
        <Autocomplete
            value={debugEntry}
            options={(data || []) as DebugEntry[]}
            getOptionLabel={renderLabel}
            renderOption={renderOptions}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Record" />}
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

    const clearCollectorAndData = () => {
        searchParams.delete('collector');
        setSelectedCollector('');
        setCollectorData(null);
    };

    useEffect(() => {
        const collector = searchParams.get('collector') || '';
        if (collector.trim() === '') {
            clearCollectorAndData();
            return;
        }
        if (!debugEntry) {
            return;
        }
        collectorInfo({id: debugEntry.id, collector})
            .then(({data, isError}) => {
                if (isError) {
                    clearCollectorAndData();
                    changeEntry(null);
                    return;
                }
                setSelectedCollector(collector);
                setCollectorData(data);
            })
            .catch(clearCollectorAndData);
    }, [searchParams, debugEntry]);
    const changeEntry = (entry: DebugEntry | null) => {
        if (entry) {
            dispatch(changeEntryAction(entry));
            setSearchParams((prev) => {
                prev.set('debugEntry', entry.id);
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
                      name: collector,
                      text: parseCollectorName(collector),
                      href: `/debug?collector=${collector}&debugEntry=${debugEntry.id}`,
                      icon: index % 2 === 0 ? <InboxIcon /> : <MailIcon />,
                      badge: getCollectedCountByCollector(collector as CollectorsMap, debugEntry),
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
                <Tooltip title="List">
                    <span>
                        <Button href="/debug/list" startIcon={<ListIcon />}>
                            List
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="Refresh the list">
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
                <Tooltip title="Runs the request again">
                    <span>
                        <Button
                            onClick={repeatRequestHandler}
                            disabled={!debugEntry || doRequestInfo.isLoading || getDebugQueryInfo.isFetching}
                            startIcon={<ReplayIcon />}
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
                <MenuPanel links={links} open={!selectedCollector} activeLink={selectedCollector}>
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
