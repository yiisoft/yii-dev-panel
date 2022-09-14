import * as React from 'react';
import {useState} from 'react';
import {DataGrid, GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetConfigurationQuery, useLazyGetObjectQuery} from "../../API/Inspector/Inspector";
import {JsonRenderer} from "../../Helper/JsonRenderer";
import {Button} from "@mui/material";


export const ConfigurationPage = () => {
    const {data, isLoading} = useGetConfigurationQuery('');
    const [lazyLoadObject] = useLazyGetObjectQuery();
    const [objects, setObject] = useState<Record<string, any>>({})

    const columns: GridColDef[] = [
        {
            field: '0', headerName: 'Name', width: 200,
            renderCell: (params: GridRenderCellParams) => <span style={{wordBreak: 'break-all'}}>{params.value}</span>
        },
        {
            field: '1',
            headerName: 'Value',
            width: 1000,
            renderCell: (params: GridRenderCellParams) => {
                if (typeof params.value === "string") {
                    if (params.value in objects) {
                        return <JsonRenderer value={objects[params.value]}/>
                    }
                    return <>
                        {params.value}
                        <Button onClick={() => handleLoadObject(params.value)}>Load</Button>

                    </>;
                }
                return <JsonRenderer value={params.value}/>
            }
        },
    ];

    const handleLoadObject = async (id: string) => {
        const result = await lazyLoadObject(id)
        setObject(prev => ({...prev, [id]: result.data}))
    }
    if (isLoading) {
        return <>Loading..</>
    }
    const rows = Object.entries(data as any)

    return (
        <>
            <h2>{'Configuration'}</h2>
            <DataGrid
                rows={rows as GridValidRowModel[]}
                getRowId={(row) => row[0]}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                autoHeight
                getRowHeight={() => 'auto'}
            />
        </>
    );
}
