import * as React from 'react';
import {GridColDef, GridValidRowModel} from '@mui/x-data-grid';
import {JsonRenderer} from "../../Helper/JsonRenderer";
import {DataTable} from "../../Component/Grid";

const columns: GridColDef[] = [
    {field: '0', headerName: 'Name', width: 130},
    {
        field: '1', headerName: 'Value', width: 1000,
        renderCell: (params) => {
            return <JsonRenderer key={params.id} value={params.row}/>
        }
    },
];

export const DumpPage = ({data}: any) => {
    const rows = data || [] as any

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataTable
                getRowId={(row) => {
                    return Math.random() * 1000
                }}
                rows={rows as GridValidRowModel[]}
                columns={columns}
            />
        </div>
    );
}
