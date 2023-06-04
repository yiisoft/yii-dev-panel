import ListIcon from '@mui/icons-material/List';
import {ButtonGroup, Paper, Portal} from '@mui/material';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {setToolbarOpen} from '@yiisoft/yii-dev-panel-sdk/API/Application/ApplicationContext';
import {addCurrentPageRequestId, changeEntryAction, useDebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Context';
import {DebugEntry, debugApi, useGetDebugQuery} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {YiiIcon} from '@yiisoft/yii-dev-panel-sdk/Component/SvgIcon/YiiIcon';
import {isDebugEntryAboutConsole, isDebugEntryAboutWeb} from '@yiisoft/yii-dev-panel-sdk/Helper/debugEntry';
import * as serviceWorkerRegistration from '@yiisoft/yii-dev-panel-sdk/serviceWorkerRegistration';
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
import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

let serviceWorker = navigator?.serviceWorker;

export const DebugToolbar = () => {
    useEffect(() => {
        const config = {
            onSuccess: (registration: ServiceWorkerRegistration) => {
                console.log('onSuccess', registration);
            },
            onUpdate: (registration) => {
                console.log('onUpdate', registration);
                // if (registration && registration.waiting) {
                //     registration.waiting.postMessage({type: 'SKIP_WAITING'});
                // }
            },
        };

        serviceWorkerRegistration.register(config);

        console.debug('[START] Listen to message');
        const onMessageHandler = (event) => {
            if (!event.data.payload || !('x-debug-id' in event.data.payload.headers)) {
                return;
            }
            console.debug('[EVENT] Listen to message', event.data);
            dispatch(debugApi.util.invalidateTags(['debug/list']));
            dispatch(addCurrentPageRequestId(event.data.payload.headers['x-debug-id']));
        };
        serviceWorker?.addEventListener('message', onMessageHandler);
        return () => {
            console.debug('[STOP] Listen to message');
            // serviceWorkerRegistration.unregister();
            serviceWorker?.removeEventListener('message', onMessageHandler);
        };
    }, []);

    const [isToolbarOpened, setIsToolbarOpened] = useState<boolean>(
        useSelector((state) => state.application.toolbarOpen),
    );
    const getDebugQuery = useGetDebugQuery();
    const debugEntry = useDebugEntry();
    const dispatch = useDispatch();

    const [selectedEntry, setSelectedEntry] = useState(debugEntry);

    useEffect(() => {
        if (!getDebugQuery.isFetching && getDebugQuery.data && getDebugQuery.data.length > 0) {
            setSelectedEntry(getDebugQuery.data[0]);
        }
    }, [getDebugQuery.isFetching]);

    const onToolbarClickHandler = () => {
        setIsToolbarOpened((v) => {
            dispatch(setToolbarOpen(!v));
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
                        width: !isToolbarOpened ? 'initial' : '100%',
                        transition: 'width 350ms ease-in-out',
                        py: 1,
                        px: 0.5,
                        boxSizing: 'border-box',
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: isToolbarOpened ? 'inline-block' : 'none',
                        }}
                    >
                        <ButtonGroup disableElevation>
                            {isDebugEntryAboutWeb(selectedEntry) && (
                                <>
                                    <RequestItem data={selectedEntry} />
                                    <RequestTimeItem data={selectedEntry} />
                                    <MemoryItem data={selectedEntry} />
                                    <RouterItem data={selectedEntry} />
                                </>
                            )}
                            {isDebugEntryAboutConsole(selectedEntry) && (
                                <>
                                    <CommandItem data={selectedEntry} />
                                    <RequestTimeItem data={selectedEntry} />
                                    <MemoryItem data={selectedEntry} />
                                </>
                            )}
                            <LogsItem data={selectedEntry} />
                            <EventsItem data={selectedEntry} />
                            <ValidatorItem data={selectedEntry} />

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
                        </SpeedDial>
                    </Box>
                </Paper>
            )}
            <DebugEntriesListModal open={open} onClick={onChangeHandler} onClose={handleClose} />
        </Portal>
    );
};
