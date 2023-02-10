import React from 'react';
import {ButtonGroup, IconButton, Portal} from '@mui/material';
import Box from '@mui/material/Box';
import {useGetDebugQuery} from '../../API/Debug';
import {ArrowRightSharp} from '@mui/icons-material';
import {RequestItem} from './RequestItem';
import {RequestTimeItem} from './RequestTimeItem';
import {MemoryItem} from './MemoryItem';
import {LogsItem} from './LogsItem';
import {EventsItem} from './EventsItem';
import {RouterItem} from './RouterItem';

export const Toolbar = () => {
    const getDebugQuery = useGetDebugQuery();
    console.log(getDebugQuery.data && getDebugQuery.data[0]);
    return (
        <>
            <Portal>
                {!getDebugQuery.isLoading && getDebugQuery.data && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            boxShadow: '0px -2px 4px 1px rgba(0,0,0,0.31);',
                            position: 'fixed',
                            bottom: 0,
                            width: '100%',
                            py: 1,
                            px: 0.5,
                            backgroundColor: 'primary.main',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                            }}
                        >
                            <ButtonGroup disableElevation>
                                <RequestItem data={getDebugQuery.data[0]} />
                                <RequestTimeItem data={getDebugQuery.data[0]} />
                                <MemoryItem data={getDebugQuery.data[0]} />
                                <RouterItem data={getDebugQuery.data[0]} />
                                <LogsItem data={getDebugQuery.data[0]} />
                                <EventsItem data={getDebugQuery.data[0]} />
                            </ButtonGroup>
                        </Box>
                        <Box sx={{margin: '0 auto'}}>
                            <IconButton sx={{marginX: 1, background: 'white'}}>
                                <ArrowRightSharp fontSize="medium" />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </Portal>
        </>
    );
};
