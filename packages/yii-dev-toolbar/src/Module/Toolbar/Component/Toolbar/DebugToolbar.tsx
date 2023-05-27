import {ButtonGroup, IconButton, Paper, Portal} from '@mui/material';
import Box from '@mui/material/Box';
import {setToolbarOpen} from '@yiisoft/yii-dev-panel-sdk/API/Application/ApplicationContext';
import {useDebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Context';
import {useGetDebugQuery} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {YiiIcon} from '@yiisoft/yii-dev-panel-sdk/Component/SvgIcon/YiiIcon';
import {isDebugEntryAboutConsole, isDebugEntryAboutWeb} from '@yiisoft/yii-dev-panel-sdk/Helper/debugEntry';
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
import {useState} from 'react';
import {useDispatch} from 'react-redux';

export const DebugToolbar = () => {
    const initialState = useSelector((state) => state.application.toolbarOpen);
    const [checked, setChecked] = useState<boolean>(initialState);
    const getDebugQuery = useGetDebugQuery();
    const debugEntry = useDebugEntry();
    const dispatch = useDispatch();

    const onToolbarClickHandler = () => {
        setChecked((v) => {
            dispatch(setToolbarOpen(!v));
            return !v;
        });
    };
    const selectedEntry = debugEntry ?? (getDebugQuery.data ? getDebugQuery.data[0] : null);

    return (
        <>
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
                            <IconButton onClick={onToolbarClickHandler} sx={{marginX: 1, background: 'white'}}>
                                <YiiIcon
                                    sx={{
                                        transform: !checked ? 'rotate(360deg)' : 'rotate(0deg)',
                                        transition: 'transform 400ms ease-in-out',
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Paper>
                )}
            </Portal>
        </>
    );
};
