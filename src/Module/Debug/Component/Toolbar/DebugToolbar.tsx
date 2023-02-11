import React, {useState} from 'react';
import {ButtonGroup, IconButton, Paper, Portal} from '@mui/material';
import Box from '@mui/material/Box';
import {useGetDebugQuery} from '../../API/Debug';
import {RequestItem} from './RequestItem';
import {RequestTimeItem} from './RequestTimeItem';
import {MemoryItem} from './MemoryItem';
import {LogsItem} from './LogsItem';
import {EventsItem} from './EventsItem';
import {RouterItem} from './RouterItem';
import {ValidatorItem} from './ValidatorItem';
import {YiiIcon} from '../../../../Component/SvgIcon/YiiIcon';
import {useDebugEntry} from '../../Context/Context';

export const DebugToolbar = () => {
    const [checked, setChecked] = useState(true);
    const getDebugQuery = useGetDebugQuery();
    const debugEntry = useDebugEntry();

    return (
        <>
            <Portal>
                {!getDebugQuery.isLoading && getDebugQuery.data && (
                    <Paper
                        component={Box}
                        elevation={10}
                        sx={{
                            position: 'sticky',
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
                                <RequestItem data={debugEntry ?? getDebugQuery.data[0]} />
                                <RequestTimeItem data={debugEntry ?? getDebugQuery.data[0]} />
                                <MemoryItem data={debugEntry ?? getDebugQuery.data[0]} />
                                <RouterItem data={debugEntry ?? getDebugQuery.data[0]} />
                                <LogsItem data={debugEntry ?? getDebugQuery.data[0]} />
                                <EventsItem data={debugEntry ?? getDebugQuery.data[0]} />
                                <ValidatorItem data={debugEntry ?? getDebugQuery.data[0]} />
                            </ButtonGroup>
                        </Box>
                        <Box>
                            <IconButton
                                onClick={() => {
                                    setChecked((v) => !v);
                                }}
                                sx={{marginX: 1, background: 'white'}}
                            >
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
