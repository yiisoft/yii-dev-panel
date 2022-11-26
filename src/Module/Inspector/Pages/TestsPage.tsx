import * as React from 'react';
import {useState} from 'react';
import {GridColDef, GridColumns, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useLazyRunCommandQuery} from '../API/Inspector';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {Button, CircularProgress, IconButton, styled, Tooltip} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {DataTable} from '../../../Component/Grid';
import Box from '@mui/material/Box';
import {Check, Error, FilePresent} from '@mui/icons-material';
import {parseFilePathWithLineAnchor} from '../../../Helper/filePathParser';

const CenteredBox = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        renderCell: (params: GridRenderCellParams) => (
            <span style={{wordBreak: 'break-all'}}>
                {params.value}
                <Tooltip title="Examine as a file in new window">
                    <IconButton
                        size="small"
                        target="_blank"
                        href={'/inspector/files?path=' + parseFilePathWithLineAnchor(params.row.path)}
                    >
                        <FilePresent fontSize="small" />
                    </IconButton>
                </Tooltip>
            </span>
        ),
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 80,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <CenteredBox>
                    {params.value === 'ok' ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                </CenteredBox>
            );
        },
    },
    {
        field: 'time',
        headerName: 'Time (ms)',
        width: 100,
        renderCell: (params: GridRenderCellParams) => {
            return <CenteredBox>{params.value?.toFixed(2)}</CenteredBox>;
        },
    },
    {
        field: 'stacktrace',
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

            resultRows.push({
                name: testName,
                status: event.status,
                stacktrace: event.stacktrace,
                path: event.file,
                time: event.time,
            });
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
                    getRowId={() => Math.random() * 1000}
                    columns={columns as GridColumns}
                />
            )}
        </>
    );
};
