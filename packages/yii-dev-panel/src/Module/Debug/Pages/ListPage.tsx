import {Refresh} from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';
import LoginIcon from '@mui/icons-material/Login';
import {Breadcrumbs, Button, CircularProgress, IconButton, Link, Stack, Tooltip, Typography} from '@mui/material';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {DebugEntry, useGetDebugQuery} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {DebugEntryChip} from '@yiisoft/yii-dev-panel-sdk/Component/DebugEntryChip';
import {DataTable} from '@yiisoft/yii-dev-panel-sdk/Component/Grid';
import {format, fromUnixTime} from 'date-fns';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {CollectorsMap} from "@yiisoft/yii-dev-panel-sdk/Helper/collectors";

const columns: GridColDef<DebugEntry>[] = [
    {
        field: 'status',
        headerName: 'Status',
        renderCell: ({row}: GridRenderCellParams) => <DebugEntryChip entry={row} />,
    },
    {
        field: 'url',
        flex: 1,
        headerName: 'URL / Command',
        valueGetter: ({row}) => row.summary[CollectorsMap.RequestCollector]?.path ?? row.summary[CollectorsMap.CommandCollector]?.input,
    },
    // {
    //     field: 'env',
    //     headerName: 'ENV',
    //     valueGetter: ({row}) => (isDebugEntryAboutConsole(row) ? 'Console' : 'Web'),
    // },
    {
        field: 'time',
        headerName: 'Time',
        renderCell: ({row}) => <>{((row.summary[CollectorsMap.WebAppInfoCollector] || row.summary[CollectorsMap.ConsoleAppInfoCollector]).request.processingTime * 1000).toFixed(1)} ms</>,
    },
    {
        field: 'timeAt',
        headerName: 'Time at',
        renderCell: ({row}) => <>{format(fromUnixTime((row.summary[CollectorsMap.WebAppInfoCollector] || row.summary[CollectorsMap.ConsoleAppInfoCollector]).request.startTime), 'HH:mm:ss')}</>,
    },
    {field: 'logs', headerName: 'Logs', valueGetter: ({row}) => row.summary[CollectorsMap.LogCollector]?.total ?? '–'},
    {field: 'events', headerName: 'Events', valueGetter: ({row}) => row.summary[CollectorsMap.EventCollector]?.total ?? '–'},
    // {field: 'middlewares', headerName: 'Middlewares', valueGetter: ({row}) => row.middleware?.total ?? '–'},
    {field: 'services', headerName: 'Services', valueGetter: ({row}) => row.summary[CollectorsMap.ServiceCollector]?.total ?? '–'},
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({row}) => (
            <>
                <Stack direction="row" spacing={2}>
                    <Tooltip title="Debug the entry">
                        <span>
                            <IconButton href={`/debug?debugEntry=${row.id}`}>
                                <LoginIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Stack>
            </>
        ),
    },
];

export const ListPage = () => {
    const getDebugQuery = useGetDebugQuery();
    const [rows, setRows] = useState<DebugEntry[]>([]);

    useEffect(() => {
        if (!getDebugQuery.isFetching) {
            setRows(getDebugQuery.data || []);
        }
    }, [getDebugQuery.isFetching]);

    const onRefreshHandler = React.useCallback(() => {
        getDebugQuery.refetch();
    }, [getDebugQuery]);

    return (
        <>
            <Breadcrumbs sx={{my: 2}}>
                <Link underline="hover" color="inherit" href="/debug">
                    Debug
                </Link>
                <Typography color="text.primary">List</Typography>
            </Breadcrumbs>
            <Stack direction="row" spacing={2}>
                <Tooltip title="List">
                    <span>
                        <Button href="/debug" startIcon={<ListIcon />}>
                            Index
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title="Refresh the list">
                    <span>
                        <Button
                            onClick={onRefreshHandler}
                            disabled={getDebugQuery.isFetching}
                            startIcon={<Refresh />}
                            endIcon={getDebugQuery.isFetching ? <CircularProgress size={24} color="info" /> : null}
                        >
                            Refresh
                        </Button>
                    </span>
                </Tooltip>
            </Stack>
            <DataTable rows={rows satisfies GridValidRowModel[]} getRowId={(row) => row.id} columns={columns} />
        </>
    );
};
