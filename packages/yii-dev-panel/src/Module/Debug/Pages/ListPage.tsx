import * as React from 'react';
import {useEffect, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {DataTable} from '@yiisoft/yii-dev-panel-sdk/Component/Grid';
import {DebugEntry, useGetDebugQuery} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {AlertColor, Breadcrumbs, Button, Chip, CircularProgress, Link, Stack, Tooltip, Typography} from '@mui/material';
import format from 'date-fns/format';
import {fromUnixTime} from 'date-fns';
import {Refresh} from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';

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
const columns: GridColDef<DebugEntry>[] = [
    {
        field: 'status',
        headerName: 'Status',
        renderCell: ({row}: GridRenderCellParams) => (
            <Chip
                sx={{borderRadius: '5px 5px', margin: '0 2px'}}
                label={`${row.response.statusCode} ${row.request.method}`}
                color={buttonColor(row.response.statusCode)}
            />
        ),
    },
    {field: 'url', flex: 1, headerName: 'URL / Command', valueGetter: ({row}) => row.request.path},
    // {
    //     field: 'env',
    //     headerName: 'ENV',
    //     valueGetter: ({row}) => (isDebugEntryAboutConsole(row) ? 'Console' : 'Web'),
    // },
    {
        field: 'time',
        headerName: 'Time',
        renderCell: ({row}) => <>{((row.web || row.console).request.processingTime * 1000).toFixed(1)} ms</>,
    },
    {
        field: 'timeAt',
        headerName: 'Time at',
        renderCell: ({row}) => <>{format(fromUnixTime((row.web || row.console).request.startTime), 'HH:mm:ss')}</>,
    },
    {field: 'logs', headerName: 'Logs', valueGetter: ({row}) => row.logger.total},
    {field: 'events', headerName: 'Events', valueGetter: ({row}) => row.event.total},
    // {field: 'middlewares', headerName: 'Middlewares', valueGetter: ({row}) => row.middleware.total},
    {field: 'services', headerName: 'Services', valueGetter: ({row}) => row.service.total},
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({row}) => (
            <>
                <Stack direction="row" spacing={2}>
                    <Button href={`/debug?debugEntry=${row.id}`}>Debug</Button>
                </Stack>
            </>
        ),
    },
];

export const ListPage = () => {
    const getDebugQuery = useGetDebugQuery();
    const [rows, setRows] = useState<DebugEntry[]>([]);

    useEffect(() => {
        console.log('eff', getDebugQuery.data);

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
