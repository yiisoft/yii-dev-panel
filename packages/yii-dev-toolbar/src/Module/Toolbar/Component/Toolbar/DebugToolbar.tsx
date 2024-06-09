import ListIcon from '@mui/icons-material/List';
import {ButtonGroup, Paper, Portal} from '@mui/material';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {setIFrameHeight, setToolbarOpen} from '@yiisoft/yii-dev-panel-sdk/API/Application/ApplicationContext';
import {addCurrentPageRequestId, changeEntryAction, useDebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Context';
import {DebugEntry, debugApi, useGetDebugQuery} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {YiiIcon} from '@yiisoft/yii-dev-panel-sdk/Component/SvgIcon/YiiIcon';
import {isDebugEntryAboutConsole, isDebugEntryAboutWeb} from '@yiisoft/yii-dev-panel-sdk/Helper/debugEntry';
import {DebugEntriesListModal} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/DebugEntriesListModal';
import {CommandItem} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/Console/CommandItem';
import {DateItem} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/DateItem';
import {EventsItem} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/EventsItem';
import {LogsItem} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/LogsItem';
import {MemoryItem} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/MemoryItem';
import {RequestTimeItem} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/RequestTimeItem';
import {ValidatorItem} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/ValidatorItem';
import {RequestItem} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/Web/RequestItem';
import {RouterItem} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/Web/RouterItem';
import {useSelector} from '@yiisoft/yii-dev-toolbar/store';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {DevPanelItem} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/DevPanelItem';
import Resizable from 'react-resizable-layout';
import {useResizable} from 'react-resizable-layout';
import {useTheme} from '@mui/material';
import {IFrameWrapper} from '@yiisoft/yii-dev-panel-sdk/Helper/IFrameWrapper';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';
import WebAssetIcon from '@mui/icons-material/WebAsset';

const serviceWorker = navigator?.serviceWorker;

export const DebugToolbar = ({iframe = false}: {iframe: boolean}) => {
    useEffect(() => {
        // console.debug('[START] Listen to message');
        const onMessageHandler = (event) => {
            if (!event.data.payload || !('x-debug-id' in event.data.payload.headers)) {
                return;
            }
            // console.debug('[EVENT] Listen to message', event.data);
            dispatch(debugApi.util.invalidateTags(['debug/list']));
            dispatch(addCurrentPageRequestId(event.data.payload.headers['x-debug-id']));
        };
        serviceWorker?.addEventListener('message', onMessageHandler);

        return () => {
            // console.debug('[STOP] Listen to message');
            serviceWorker?.removeEventListener('message', onMessageHandler);
        };
    }, []);

    const [isToolbarOpened, setIsToolbarOpened] = useState<boolean>(false);
    const getDebugQuery = useGetDebugQuery();
    const debugEntry = useDebugEntry();
    const dispatch = useDispatch();

    const [selectedEntry, setSelectedEntry] = useState(debugEntry);

    useEffect(() => {
        if (!getDebugQuery.isFetching && getDebugQuery.data && getDebugQuery.data.length > 0) {
            setSelectedEntry(getDebugQuery.data[0]);
        }
    }, [getDebugQuery.isFetching]);

    const toolbarOpenState = useSelector((state) => state.application.toolbarOpen);
    const iframeHeight = useSelector((state) => state.application.iframeHeight);

    const baseUrlState = useSelector((state) => state.application.baseUrl);
    useEffect(() => setIsToolbarOpened(toolbarOpenState), [toolbarOpenState]);

    const onToolbarClickHandler = () => {
        setIsToolbarOpened((v) => {
            dispatch(setToolbarOpen(!v));
            if (iframeEnabled) {
                setIframeEnabled(false);
            }
            return !v;
        });
    };

    const onChangeHandler = useCallback((entry: DebugEntry) => {
        setSelectedEntry(entry);
        setIsToolbarOpened(true);
        dispatch(setToolbarOpen(true));
        dispatch(changeEntryAction(entry));
    }, []);

    const [open, setOpen] = useState(false);

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const iframeRef = useRef<HTMLIFrameElement | undefined>(undefined);

    const [iframeWrapper, setIframeWrapper] = useState<IFrameWrapper | null>(null);

    useEffect(() => {
        if (iframeRef.current) {
            setIframeWrapper(new IFrameWrapper(iframeRef.current));
        }
    }, [iframeRef.current]);

    const iframeRouteNavigate = useCallback(
        (url: string) => {
            if (!iframeEnabled) {
                setIframeEnabled(true);
            }
            iframeWrapper?.dispatchWindowEvent('router.navigate', url);
        },
        [iframeWrapper],
    );

    const [iframeEnabled, setIframeEnabled] = useState(false);
    const toggleIframeHandler = useCallback(() => {
        setIframeEnabled((value) => !value);
    }, []);

    const theme = useTheme();
    const iframeContainerRef = useRef<HTMLDivElement | undefined>(undefined);
    const {position, separatorProps, setPosition} = useResizable({
        axis: 'y',
        initial: iframeHeight,
        min: 100,
        max: 1000,
        reverse: true,
        disabled: !isToolbarOpened,
        containerRef: iframeContainerRef,
        onResizeEnd: (e) => {
            dispatch(setIFrameHeight(e.position));
        },
    });
    useEffect(() => {
        console.log('set position');
        setPosition(iframeHeight);
    }, [iframeHeight]);

    return (
        <Portal>
            {!getDebugQuery.isLoading && selectedEntry && (
                <Paper
                    component={Box}
                    elevation={10}
                    sx={{
                        position: !isToolbarOpened ? 'fixed' : 'sticky',
                        bottom: 0,
                        right: 0,
                        transition: 'width 350ms ease-in-out',
                        pt: !isToolbarOpened ? 1 : 0,
                        pb: 1,
                        px: 0.5,
                        backgroundColor: 'primary.main',
                        zIndex: 1,
                        borderRadius: '0',
                    }}
                >
                    <hr
                        {...separatorProps}
                        style={{
                            display: isToolbarOpened ? 'block' : 'none',
                            position: 'absolute',
                            top: '-9px',
                            right: 0,
                            left: 0,
                            height: '10px',
                            width: '100%',
                            background: `linear-gradient(${theme.palette.action.hover}, ${theme.palette.primary.main})`,
                            border: 0,
                            padding: 0,
                            margin: 0,
                            cursor: iframeEnabled ? 'row-resize' : 'initial',
                            borderTopLeftRadius: '5px',
                            borderTopRightRadius: '5px',
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxSizing: 'border-box',
                        }}
                    >
                        <Box
                            sx={{
                                display: isToolbarOpened ? 'inline-block' : 'none',
                            }}
                        >
                            <ButtonGroup disableElevation>
                                {isDebugEntryAboutWeb(selectedEntry) && <RequestItem data={selectedEntry} />}
                                {isDebugEntryAboutConsole(selectedEntry) && <CommandItem data={selectedEntry} />}

                                <RequestTimeItem data={selectedEntry} iframeUrlHandler={iframeRouteNavigate} />
                                <MemoryItem data={selectedEntry} iframeUrlHandler={iframeRouteNavigate} />

                                {isDebugEntryAboutWeb(selectedEntry) && <RouterItem data={selectedEntry} />}

                                <LogsItem data={selectedEntry} iframeUrlHandler={iframeRouteNavigate} />
                                <EventsItem data={selectedEntry} iframeUrlHandler={iframeRouteNavigate} />
                                <ValidatorItem data={selectedEntry} iframeUrlHandler={iframeRouteNavigate} />

                                <DateItem data={selectedEntry} />
                            </ButtonGroup>
                        </Box>

                        <Box>
                            <SpeedDial
                                ariaLabel=""
                                sx={{
                                    bottom: 0,
                                    right: 0,
                                    marginX: 1,
                                    '& .MuiSpeedDial-actions': {
                                        position: 'absolute',
                                        bottom: 32,
                                        marginX: 1,
                                    },
                                }}
                                FabProps={{
                                    onClick: onToolbarClickHandler,
                                    size: 'small',
                                    sx: {
                                        background: 'white',
                                    },
                                }}
                                icon={
                                    <YiiIcon
                                        sx={{
                                            transform: !isToolbarOpened ? 'rotate(360deg)' : 'rotate(0deg)',
                                            transition: 'transform 400ms ease-in-out',
                                        }}
                                    />
                                }
                            >
                                <SpeedDialAction
                                    onClick={handleClickOpen}
                                    icon={<ListIcon />}
                                    tooltipTitle="List all debug entries"
                                />
                                {isToolbarOpened && (
                                    <SpeedDialAction
                                        key={'iframe'}
                                        onClick={toggleIframeHandler}
                                        icon={iframeEnabled ? <WebAssetOffIcon /> : <WebAssetIcon />}
                                        tooltipTitle={iframeEnabled ? 'Close iframe' : 'Open iframe'}
                                    />
                                )}
                            </SpeedDial>
                        </Box>
                    </div>
                </Paper>
            )}
            <DebugEntriesListModal open={open} onClick={onChangeHandler} onClose={handleClose} />
            <div ref={iframeContainerRef} style={{height: position, overflow: 'hidden'}} hidden={!iframeEnabled}>
                <iframe
                    ref={iframeRef}
                    src={'http://localhost:3000/debug?toolbar=0&'}
                    // src={baseUrlState + '/debug?iframe=false&'}
                    style={{height: '100%', width: '100%'}}
                    hidden={!iframeEnabled}
                    onLoad={(e) => {
                        console.log('i loaded', e);
                    }}
                    // sandbox="allow-same-origin allow-scripts"
                    loading="lazy"
                />
            </div>
        </Portal>
    );
};
