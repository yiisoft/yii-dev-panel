import * as React from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useDebugEntry} from "../../Provider/Debug/DebugEntryContext";
import {JsonRenderer} from "../../Helper/JsonRenderer";
import {DataTable} from "../../Component/Grid";

const columns: GridColDef[] = [
    {field: '0', headerName: 'Name', width: 130},
    {
        field: '1',
        headerName: 'Value',
        width: 1000,
        renderCell: (params: GridRenderCellParams) => <JsonRenderer key={params.id} value={params.value}/>
    },
];

export const InfoPage = () => {
    const data = useDebugEntry()

    const rows = Object.entries(data || [] as any)

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataTable
                rows={rows as GridValidRowModel[]}
                getRowId={(row) => row[0]}
                columns={columns}
            />
        </div>
    );
}
