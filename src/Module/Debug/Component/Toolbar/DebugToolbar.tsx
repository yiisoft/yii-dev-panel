import React, {useState} from 'react';
import {ButtonGroup, IconButton, Paper, Portal} from '@mui/material';
import Box from '@mui/material/Box';
import {useGetDebugQuery} from '../../API/Debug';
import {RequestTimeItem} from './RequestTimeItem';
import {MemoryItem} from './MemoryItem';
import {LogsItem} from './LogsItem';
import {EventsItem} from './EventsItem';
import {ValidatorItem} from './ValidatorItem';
import {YiiIcon} from '../../../../Component/SvgIcon/YiiIcon';
import {useDebugEntry} from '../../Context/Context';
import {useSelector} from '../../../../store';
import {useDispatch} from 'react-redux';
import {setToolbarOpen} from '../../../../Application/Context/ApplicationContext';
import {DateItem} from './DateItem';
import {isDebugEntryAboutConsole, isDebugEntryAboutWeb} from '../../Helper/debugEntry';
import {CommandItem} from './Console/CommandItem';
import {RequestItem} from './Web/RequestItem';
import {RouterItem} from './Web/RouterItem';

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
