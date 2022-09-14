import * as React from 'react';
import {useState} from 'react';
import {DataGrid, GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetClassesQuery, useLazyGetObjectQuery,} from "../../API/Inspector/Inspector";
import {Button, Link} from "@mui/material";
import {JsonRenderer} from "../../Helper/JsonRenderer";

export const ContainerPage = () => {
    const {data, isLoading} = useGetClassesQuery('');
    const [lazyLoadObject] = useLazyGetObjectQuery();
    const [objects, setObject] = useState<Record<string, any>>({})

    if (isLoading) {
        return <>Loading..</>
    }

    const handleLoadObject = async (id: string) => {
        const result = await lazyLoadObject(id)
        setObject(prev => ({...prev, [id]: result.data!.data}))
    }

    const rows = (data!.data as string[]).map((v: string) => [v, objects.hasOwnProperty(v) ? objects[v] : null])


    const getColumns = (): GridColDef[] => [
        {
            field: '0', headerName: 'Name', width: 200,
            renderCell: (params: GridRenderCellParams) => <span style={{wordBreak: 'break-all'}}>{params.value}</span>
        },
        {
            field: '1',
            headerName: 'Value',
            width: 1000,
            renderCell: (params: GridRenderCellParams) => {
                if (params.row[1]) {
                    return <JsonRenderer value={params.row[1]} collapsed={true}/>
                }

                return <>
                    <Button onClick={() => handleLoadObject(params.row[0])}>Load</Button>
                    <Link href={'view?class=' + params.row[0]}>View</Link>
                </>
            }
        },
    ];


    return (
        <>
            <h2>{'Container'}</h2>
            <DataGrid
                rows={rows as GridValidRowModel[]}
                getRowId={(row) => row[0]}
                columns={getColumns()}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                getRowHeight={() => 'auto'}
            />
        </>
    );
}
