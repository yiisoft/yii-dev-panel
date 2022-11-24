import * as React from 'react';
import {useState} from 'react';
import {GridColDef, GridColumns, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useLazyGetCommandQuery} from '../API/Inspector';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {Button, CircularProgress, IconButton, Tooltip} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {DataTable} from '../../../Component/Grid';
import Box from '@mui/material/Box';
import {FilePresent} from '@mui/icons-material';
import {parseFilePath} from '../../../Helper/filePathParser';

const columns: GridColDef[] = [
    {
        field: '0',
        headerName: 'Name',
        width: 200,
        renderCell: (params: GridRenderCellParams) => (
            <span style={{wordBreak: 'break-all'}}>
                {params.value}
                <Tooltip title="Examine as a file in new window">
                    <IconButton
                        size="small"
                        target="_blank"
                        href={'/inspector/files?path=' + parseFilePath(params.value)}
                    >
                        <FilePresent fontSize="small" />
                    </IconButton>
                </Tooltip>
            </span>
        ),
    },
    {
        field: '1',
        headerName: 'Status',
        width: 30,
        renderCell: (params: GridRenderCellParams) => {
            return params.value === 'ok' ? <CheckIcon color="success" /> : <CloseIcon color="error" />;
        },
    },
    {
        field: '2',
        headerName: 'Stacktrace',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return params.value === 'ok' ? null : <JsonRenderer key={params.id} value={params.value} />;
        },
    },
];

export const TestsPage = () => {
    const [commandQuery, commandQueryInfo] = useLazyGetCommandQuery();
    const [rows, setRows] = useState<any[]>([]);

    async function runCodeceptionHandler() {
        const data = await commandQuery('test/codeception');

        const resultRows = [];
        for (const event of data.data as any) {
            const testName = [event.suite]
                .concat(event.test)
                .filter((v) => !!v)
                .join('::');

            resultRows.push([testName, event.status, event.stacktrace]);
        }
        setRows(resultRows);
    }

    return (
        <>
            <h2>{'Tests'}</h2>
            <Box>
                <Button
                    onClick={runCodeceptionHandler}
                    disabled={commandQueryInfo.isFetching}
                    endIcon={commandQueryInfo.isFetching ? <CircularProgress size={24} color="info" /> : null}
                >
                    Run Codeception
                </Button>
            </Box>

            {commandQueryInfo.isSuccess && (
                <DataTable
                    rows={rows as GridValidRowModel[]}
                    getRowId={(row) => row[0]}
                    columns={columns as GridColumns}
                />
            )}
        </>
    );
};
