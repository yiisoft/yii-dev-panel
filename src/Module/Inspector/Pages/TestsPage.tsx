import * as React from 'react';
import {useState} from 'react';
import {GridColDef, GridColumns, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useLazyRunCommandQuery} from '../API/Inspector';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {Button, CircularProgress, IconButton, Tooltip} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {DataTable} from '../../../Component/Grid';
import Box from '@mui/material/Box';
import {Check, Error, FilePresent} from '@mui/icons-material';
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

type CommandResponseType = {
    isSuccessful: boolean | undefined;
    errors: string[];
};
export const TestsPage = () => {
    const [commandQuery, commandQueryInfo] = useLazyRunCommandQuery();
    const [rows, setRows] = useState<any[]>([]);
    const [commandResponse, setCommandResponse] = useState<CommandResponseType | null>(null);

    async function runCodeceptionHandler() {
        const data = await commandQuery('test/codeception');
        if (typeof data.data !== 'object') {
            console.error(data);
            return;
        }

        const resultRows = [];
        for (const event of data.data.result) {
            const testName = [event.suite]
                .concat(event.test)
                .filter((v) => !!v)
                .join('::');

            resultRows.push([testName, event.status, event.stacktrace]);
        }
        setCommandResponse({
            isSuccessful: data.data.status === 'ok',
            errors: data.data.errors,
        });
        setRows(resultRows);
    }

    return (
        <>
            <h2>{'Tests'}</h2>
            <Box display="flex" alignItems="center">
                <Button
                    onClick={runCodeceptionHandler}
                    color={commandResponse === null ? 'primary' : commandResponse.isSuccessful ? 'success' : 'error'}
                    disabled={commandQueryInfo.isFetching}
                    endIcon={commandQueryInfo.isFetching ? <CircularProgress size={24} color="info" /> : null}
                >
                    Run Codeception
                </Button>
                {!commandQueryInfo.isFetching && commandResponse && (
                    <>
                        {commandResponse.isSuccessful === true && <Check color="success" />}
                        {commandResponse.isSuccessful === false && <Error color="error" />}
                    </>
                )}
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
