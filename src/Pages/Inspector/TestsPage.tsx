import * as React from 'react';
import {useState} from 'react';
import {DataGrid, GridColDef, GridColumns, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useLazyGetCommandQuery} from "../../API/Inspector/Inspector";
import {JsonRenderer} from "../../Helper/JsonRenderer";
import {Button} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns: GridColDef[] = [
    {
        field: '0', headerName: 'Name', width: 200,
        renderCell: (params: GridRenderCellParams) => <span style={{wordBreak: 'break-all'}}>{params.value}</span>
    },
    {
        field: '1',
        headerName: 'Status',
        width: 30,
        renderCell: (params: GridRenderCellParams) => {
            return params.value === 'ok' ? <CheckIcon color="success"/> : <CloseIcon color="error"/>
        }
    },
    {
        field: '2',
        headerName: 'Stacktrace',
        width: 400,
        renderCell: (params: GridRenderCellParams) => {
            return params.value === 'ok' ? null : <JsonRenderer collapsed={true} key={params.id} value={params.value}/>
        }
    },
];

export const TestsPage = () => {
    const [commandQuery, commandQueryInfo] = useLazyGetCommandQuery();
    const [rows, setRows] = useState<any[]>([])

    async function runCodeceptionHandler() {
        const data = await commandQuery('test/codeception');
        console.log(data.data);

        const resultRows = []
        for (let event of (data.data as any)) {
            const testName = [event.suite].concat(event.test).filter(v => !!v).join('::')

            resultRows.push([
                testName,
                event.status,
                event.stacktrace,
            ])
        }
        setRows(resultRows);
    }


    return (
        <>
            <h2>{'Tests'}</h2>
            <Button onClick={runCodeceptionHandler}>Run Codeception</Button>
            {commandQueryInfo.isSuccess && (
                <DataGrid
                    rows={rows as GridValidRowModel[]}
                    getRowId={(row) => row[0]}
                    columns={columns as GridColumns}
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    autoHeight
                    getRowHeight={() => 'auto'}
                />
            )}
        </>
    );
}
