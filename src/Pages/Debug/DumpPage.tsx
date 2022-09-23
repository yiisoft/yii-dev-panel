import * as React from 'react';
import {GridColDef, GridValidRowModel} from '@mui/x-data-grid';
import {JsonRenderer} from "../../Helper/JsonRenderer";
import {DataTable} from "../../Component/Grid";

const columns: GridColDef[] = [
    {field: '0', headerName: 'Name', width: 130},
    {
        field: '1', headerName: 'Value', width: 1000,
        renderCell: (params) => {
            return <JsonRenderer key={params.id} value={params.value}/>
        }
    },
];

export const DumpPage = ({data}: any) => {
    const isArray = Array.isArray(data)
    let rows = Object.entries(data || []);
    rows = rows.map((el) => ({0:el[0], 1:Object.assign({}, el[1])})) as any;

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataTable
                getRowId={() => Math.random() * 1000}
                rows={rows as GridValidRowModel[]}
                // @ts-ignore
                columns={isArray ? [[...columns].pop()] : columns}
            />
        </div>
    );
}
