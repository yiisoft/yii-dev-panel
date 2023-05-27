import * as React from 'react';
import {useEffect, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {DataTable} from '@yiisoft/yii-dev-panel-sdk/Component/Grid';
import {DebugEntry, useGetDebugQuery} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {AlertColor, Chip} from '@mui/material';
import format from 'date-fns/format';
import {fromUnixTime} from 'date-fns';

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
    {field: 'url', headerName: 'URL / Command', valueGetter: ({row}) => row.request.path},
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
];

export const ListPage = () => {
    const getDebugQuery = useGetDebugQuery();
    const [rows, setRows] = useState<DebugEntry[]>([]);

    useEffect(() => {
        console.log('eff', getDebugQuery.data);
        if (getDebugQuery.data) {
            setRows(getDebugQuery.data);
        }
    }, [getDebugQuery.data]);

    return (
        <>
            <DataTable rows={rows satisfies GridValidRowModel[]} getRowId={(row) => row.id} columns={columns} />
        </>
    );
};
