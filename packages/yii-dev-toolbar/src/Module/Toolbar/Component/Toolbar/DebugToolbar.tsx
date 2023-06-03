import {
    Badge,
    ButtonGroup,
    Chip,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Portal,
    Tooltip,
} from '@mui/material';
import Box from '@mui/material/Box';
import {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';
import {setToolbarOpen} from '@yiisoft/yii-dev-panel-sdk/API/Application/ApplicationContext';
import {useDebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Context';
import {DebugEntry, useGetDebugQuery} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {YiiIcon} from '@yiisoft/yii-dev-panel-sdk/Component/SvgIcon/YiiIcon';
import {buttonColorConsole, buttonColorHttp} from '@yiisoft/yii-dev-panel-sdk/Helper/buttonColor';
import {isDebugEntryAboutConsole, isDebugEntryAboutWeb} from '@yiisoft/yii-dev-panel-sdk/Helper/debugEntry';
import * as serviceWorkerRegistration from '@yiisoft/yii-dev-panel-sdk/serviceWorkerRegistration';
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

const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}} />
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: '100%',
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

type EntriesListProps = {
    rows: DebugEntry[];
    onClick: (entry: DebugEntry) => void;
};
const EntriesList = ({rows = [], onClick}: EntriesListProps) => {
    if (rows.length === 0) {
        return null;
    }
    return (
        <>
            {rows.map((row) => (
                <MenuItem key={row.id} onClick={() => onClick(row)}>
                    <ListItemIcon>
                        <Chip
                            sx={{borderRadius: '5px 5px', margin: '0 2px'}}
                            label={`${
                                isDebugEntryAboutConsole(row)
                                    ? [row.command?.exitCode].join(' ')
                                    : isDebugEntryAboutWeb(row)
                                    ? [row.response?.statusCode, row.request.method].join(' ')
                                    : 'Unknown entry'
                            }`}
                            color={
                                isDebugEntryAboutConsole(row)
                                    ? buttonColorConsole(Number(row.command?.exitCode))
                                    : isDebugEntryAboutWeb(row)
                                    ? buttonColorHttp(row.response?.statusCode)
                                    : 'info'
                            }
                        />
                    </ListItemIcon>
                    <ListItemText primary={row.request?.path ?? row.command?.input} />
                </MenuItem>
            ))}
        </>
    );
};

let serviceWorker = navigator?.serviceWorker;

export const DebugToolbar = () => {
    useEffect(() => {
        const config = {
            onSuccess: (registration: ServiceWorkerRegistration) => {
                console.log('onSuccess', registration);
            },
            onUpdate: (registration) => {
                console.log('onUpdate', registration);
                if (registration && registration.waiting) {
                    registration.waiting.postMessage({type: 'SKIP_WAITING'});
                }
            },
        };

        serviceWorkerRegistration.register(config);

        console.log('[START] Listen to message');
        const onMessageHandler = (event) => {
            console.log('[EVENT] Listen to message', event.data);
        };
        serviceWorker?.addEventListener('message', onMessageHandler);
        return () => {
            console.log('[STOP] Listen to message');
            // serviceWorkerRegistration.unregister();
            serviceWorker?.removeEventListener('message', onMessageHandler);
        };
    }, []);

    const initialState = useSelector((state) => state.application.toolbarOpen);
    const [checked, setChecked] = useState<boolean>(initialState);
    const getDebugQuery = useGetDebugQuery();
    const debugEntry = useDebugEntry();
    const dispatch = useDispatch();

    const [selectedEntry, setSelectedEntry] = useState(debugEntry);
    const [rows, setRows] = useState<DebugEntry[]>([]);

    useEffect(() => {
        if (!getDebugQuery.isFetching && getDebugQuery.data && getDebugQuery.data.length > 0) {
            setRows(getDebugQuery.data.slice(0, 50));
            setSelectedEntry(getDebugQuery.data[0]);
        }
    }, [getDebugQuery.isFetching]);

    const onToolbarClickHandler = () => {
        setChecked((v) => {
            dispatch(setToolbarOpen(!v));
            return !v;
        });
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const onMouseEnterHandler = useCallback((event) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }, []);

    const onMouseLeaveHandler = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const onChangeHandler = useCallback((entry: DebugEntry) => {
        setSelectedEntry(entry);
    }, []);

    return (
        <Portal>
            {!getDebugQuery.isLoading && selectedEntry && (
                <Paper
                    component={Box}
                    elevation={10}
                    sx={{
                        position: !checked ? 'fixed' : 'sticky',
                        bottom: 0,
                        right: 0,
                        width: !checked ? 'initial' : '100%',
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
                            display: checked ? 'inline-block' : 'none',
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
                        <IconButton
                            onMouseOver={onMouseEnterHandler}
                            onClick={onToolbarClickHandler}
                            sx={{marginX: 1, background: 'white'}}
                        >
                            <Badge badgeContent={rows.length} color="info">
                                <YiiIcon
                                    sx={{
                                        transform: !checked ? 'rotate(360deg)' : 'rotate(0deg)',
                                        transition: 'transform 400ms ease-in-out',
                                    }}
                                />
                            </Badge>
                        </IconButton>
                    </Box>
                </Paper>
            )}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onMouseLeaveHandler}
                MenuListProps={{onMouseLeave: onMouseLeaveHandler}}
                PaperProps={{
                    style: {
                        maxHeight: 120 * 4.5,
                        width: '40%',
                    },
                }}
            >
                <EntriesList rows={rows} onClick={onChangeHandler} />
            </Menu>
        </Portal>
    );
};
